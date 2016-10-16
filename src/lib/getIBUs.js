import calculateGravity from './GravityCalculator';

function getTinsethUtilisation(time, gravity) {
	const utilisationCurve = 0.04;
	const maxUtilisationFactor = 4.15;
	const bignessFactor = 1.65;
	const gravityFactor = 0.000125;

	const bigness = bignessFactor * Math.pow(gravityFactor, (gravity - 1));

	const btf = (1 - Math.pow(Math.E, (-utilisationCurve * time))) / maxUtilisationFactor;
	const utilisation = btf * bigness;
	return utilisation;
}

function calculateTinseth(recipe, options = {}) {
	const mLToL = 1000;
	const gravity = options.og || calculateGravity(recipe, options);

	const ibus = recipe.hops.reduce((last, hop) => {
		const utilisation = getTinsethUtilisation(hop.time, gravity);
		const ibu = (hop.weight * hop.aa * utilisation * 10) / recipe.volume;
		return last + ibu;

	}, 0);

	return ibus;
}

export {calculateTinseth};
export {getTinsethUtilisation};

export default calculateTinseth;
