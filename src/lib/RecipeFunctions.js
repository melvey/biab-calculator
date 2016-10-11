
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

export {calculateGravity};

export default {calculateGravity};
