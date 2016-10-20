
function getOriginalGravity(recipe, options = {}) {
	const defaultEfficency = 0.85;
	const defaultDryWeight = 0.97; // Apparently most grains are 3% water which is not factored into their potantial

	let gravity = 1;
	if(recipe.volume > 0) {
		const efficency = options.efficency || defaultEfficency;
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
		gravity = 1 + ((efficency * (plato / recipe.volume)) / gravityFactor);
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
	const defaultEfficency = 0.85;
	const ppgToMetricConversion = 8.316;
	const potentialToPoints = 1000;

	const efficiency = options.efficiency || defaultEfficency;

	const points = recipe.grains.reduce((last, elem) =>
		last + ((elem.potential - 1) * potentialToPoints * ppgToMetricConversion * elem.weight)
	, 0);

	const availablePoints = points * efficiency;
	return (availablePoints / recipe.volume) * ppgToMetricConversion; // Can't work out for the life of my why this conversion has to be done twice
}

function getPpg(recipe, options = {}) {
	const defaultEfficency = 0.85;
	const kgToLb = 2.20462;
	const litreToGallon = 0.264172;
	const potentialToPoints = 1000;

	const efficiency = options.efficiency || defaultEfficency;

	const points = recipe.grains.reduce((last, elem) => {
		const lbs = elem.weight * kgToLb;
		return last + ((elem.potential - 1) * potentialToPoints * lbs);
	}, 0);

	const availablePoints = points * efficiency;
	return availablePoints / (recipe.volume * litreToGallon);
}


export {getOriginalGravity};
export {getFinalGravity};
export {getAlcohol};
export {getPpKgPl};
export {getPpg};


export default getOriginalGravity;
