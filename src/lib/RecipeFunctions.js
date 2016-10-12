
function calculateGravity(recipe, options = {}) {
	const defaultEfficency = 0.85;
	const defaultdryWeight = 0.97; // Apparently most grains are 3% water which is not factored into their potantial

	let gravity = 1;
	console.log(recipe);
	if(recipe.volume > 0) {
		const efficency = options.efficency || defaultEfficency;
		const dryWeight = options.dryWeight || defaultDryWeight;
		let plato = 0;

		// Bloody reduce doesn't seem to get called. I think I might be having some computer problems
		recipe.grains.forEach((elem) => {
			let potential = elem.potential * dryWeight;
			let grainPlato = (potential - 1) * elem.weight * 100;
			plato += grainPlato;
		});
		gravity = 1 + ((efficency * (plato / recipe.volume)) / 10);
	}
	return gravity;
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

	const points = recipe.grains.reduce((last, elem) => {
		return last + ((elem.potential - 1) * potentialToPoints * ppgToMetricConversion * elem.weight);
	}, 0);

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
	console.log(points);

	const availablePoints = points * efficiency;
	return availablePoints / (recipe.volume * litreToGallon);
}

export {calculateGravity};
export {getPpKgPl};
export {getPpg};

export default {calculateGravity};
