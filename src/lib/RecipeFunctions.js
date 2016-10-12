
function calculateGravity(recipe) {
	let gravity = 1;
	console.log(recipe);
	if(recipe.volume > 0) {
		const efficency = 0.85;
		const percentWater = 0.03;	// allow 3% water in grain weight
		const dryWeight = 0.994837;
		let plato = 0;

		// Bloody reduce doesn't seem to get called. I think I might be having some computer problems
		recipe.grains.forEach((elem) => {
			plato += (elem.weight * dryWeight * (elem.potential - 1) * efficency * 100);
		});
		gravity = 1 + ((plato / recipe.volume) / 10);
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
