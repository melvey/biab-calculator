import {expect} from 'chai';
import {calculateGravity, getPpKgPl, getPpg} from '../src/lib/RecipeFunctions';

describe('Calculate gravity', () => {
	it('Calculate gravity for single malt', () => {
		const recipe = {
			volume: 5,
			grains: [
				{
					name: 'Pilsner Malt',
					ebc: 4,
					potential: 1.038,
					weight: 1
				}
			],
			adjuncts: [],
			hops: []
		};

		const gravity = calculateGravity(recipe);
		expect(gravity).to.be.equal(1.055);
	});

	it('Calculate gravity points', () => {
		// Using recipe from http://brewgr.com/calculations/original-gravity
		const recipe = {
			volume: 18.9271,
			grains: [
				{
					name: 'Pale Malt',
					ebc: 4,
					potential: 1.036,
					weight: 3.62874 // 8lbs
				},
				{
					name: 'Roast Barley',
					potential: 1.025,
					weight: 0.453592 // 1lb
				}
			],
			adjuncts: [],
			hops: []
		};
		const options = {
			efficiency: 0.72
		};

		const gravityPoints = getPpKgPl(recipe, options);
		// 44.8 ppg === 372.5568 ppKgPl
		const ppg = 44.8;
		const ppKgPl = 372.5568;
		expect(getPpKgPl(recipe, options)).to.be.within(ppKgPl * 0.99, ppKgPl * 1.01);
		expect(getPpg(recipe, options)).to.be.within(ppg * 0.99, ppg * 1.01);
	});
});
