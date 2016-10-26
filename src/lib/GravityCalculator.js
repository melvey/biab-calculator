const defaultEfficiency = 0.85;
const defaultDryWeight = 0.97; // Apparently most grains are 3% water which is not factored into their potantial

/**
 * Get plato for a given grain profile
 * @param {Object} recipe The recipe to calculate plato for
 * @param {array} recipe.grains Array of grain data to calculate plato from
 * @param {number} recipe.volume The total volume of the wort (or the amount of water added if options.addGrainVolume is true)
 * @param {Object} options Configuration options for this calculation
 * @param {boolean} options.addGrainVolume Should the volume of grain be added to the wort volume (set to true if this isn't already factored in)
 * @param {number} options.dryWeight The dry weight percent of the grain
 * @param {number} options.efficiency The extraction efficiency of the boil
 * @return {number} plato value of the recipe
 **/
function getPlato(recipe, options = {}) {
	const platoFactor = 100;

	const dryWeight = options.dryWeight || defaultDryWeight;
	const efficiency = options.efficiency || defaultEfficiency;

	const extractMass = recipe.grains.reduce((last, grain) => {
		const grainMass = grain.weight * dryWeight * efficiency;
		return last + grainMass;
	}, 0);

	const finalWeight = options.addGrainVolume ? recipe.volume + extractMass : recipe.volume;

	return platoFactor * (extractMass / finalWeight);
}

/**
* Convert plato values to specific gravity
* Formula from http://www.brewersfriend.com/plato-to-sg-conversion-chart/
* It would be nice to identify and label what these magic numbers are
* @param {number} plato The plato value for the wort
* @return {number} The specific gravity value equilivent to the provided plato value
**/
function platoToSG(plato) {
	return 1 + (plato / (258.6 - ((plato / 258.2) * 227.1))); // eslint-disable-line no-magic-numbers
}

/**
 * Gravity calculation from ianh's spreadsheet at http://aussiehomebrewer.com/topic/55955-biab-beer-designer-spreadsheet/
 * Looks to be a plato calculation although there is a division at the end I'm not sure about.
 * @param {Object} recipe The recipe to calculate plato for
 * @param {array} recipe.grains Array of grain data to calculate plato from
 * @param {number} recipe.volume The total volume of the wort (or the amount of water added if options.addGrainVolume is true)
 * @param {Object} options Configuration options for this calculation
 * @param {boolean} options.addGrainVolume Should the volume of grain be added to the wort volume (set to true if this isn't already factored in)
 * @param {number} options.dryWeight The dry weight percent of the grain
 * @param {number} options.efficiency The extraction efficiency of the boil
 * @return {number} original gravity of the recipe
 **/
function ianhGravity(recipe, options) {
	let gravity = 1;
	if(recipe.volume > 0) {
		const efficiency = options.efficiency || defaultEfficiency;
		const dryWeight = options.dryWeight || defaultDryWeight;
		const platoFactor = 100;	// Platos are the grain potential in weight * 100
		const gravityFactor = 10; // No idea where this comes from.
		let plato = 0;

		// Bloody reduce doesn't seem to get called. I think I might be having some computer problems
		recipe.grains.forEach((elem) => {
			const potential = elem.potential * dryWeight;
			const grainPlato = (potential - 1) * elem.weight * platoFactor;
			plato += grainPlato;
		});
		gravity = 1 + ((efficiency * (plato / recipe.volume)) / gravityFactor);
	}
	return gravity;
}

const abvFactor = 131;

/**
* Get the alcohol content based on gravity difference
* @param {number} og The starting gravity for the beer
* @param {number} fg The finishing gravity for the beer
* @return {number} The alcohol percentage (between 0 and 1)
**/
function getAlcohol(og, fg) {
	return (og - fg) * abvFactor;
}


function getFinalGravity(og, yeast) {
	let attenuation = yeast.attenuation.base;
	if(attenuation > 1) {
		attenuation /= 100;
	}

	let fg = 1 + ((og - 1) * (1 - attenuation));

	if(
		yeast.maxAlcohol !== null
		&& yeast.maxAlcohol > 0
		&& getAlcohol(og, fg) > yeast.maxAlcohol
	) {
		console.log('TOO STRONG');
		const diff = (yeast.maxAlcohol / abvFactor);
		fg = og - diff;
	}
	return fg;
}

/**
 * get points per kilogram per litre
 * @param {Object} recipe The recipe to calculate ppKgPl for
 * @param {Object} options Configuration/environmental options
 * @return {number} points per kilogram per litre for this recipe
 **/
function getPpKgPl(recipe, options = {}) {
	const defaultEfficiency = 0.85;
	const ppgToMetricConversion = 8.316;
	const potentialToPoints = 1000;

	const efficiency = options.efficiency || defaultEfficiency;

	const points = recipe.grains.reduce((last, elem) =>
		last + ((elem.potential - 1) * potentialToPoints * ppgToMetricConversion * elem.weight)
	, 0);

	const availablePoints = points * efficiency;
	return (availablePoints / recipe.volume) * ppgToMetricConversion; // Can't work out for the life of my why this conversion has to be done twice
}

function getPpg(recipe, options = {}) {
	const defaultEfficiency = 0.85;
	const kgToLb = 2.20462;
	const litreToGallon = 0.264172;
	const potentialToPoints = 1000;

	const efficiency = options.efficiency || defaultEfficiency;

	const points = recipe.grains.reduce((last, elem) => {
		const lbs = elem.weight * kgToLb;
		return last + ((elem.potential - 1) * potentialToPoints * lbs);
	}, 0);

	const availablePoints = points * efficiency;
	return availablePoints / (recipe.volume * litreToGallon);
}

function getOriginalGravity(recipe, options = {}) {
	//return platoToSG(getPlato(recipe, options));
	return ianhGravity(recipe, options);
}


export {getOriginalGravity};
export {getFinalGravity};
export {getAlcohol}
export {getPlato};
export {platoToSG};
export {getPpKgPl};
export {getPpg};


export default getOriginalGravity;
