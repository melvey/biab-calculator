import {expect} from 'chai';
import {calculateGravity} from '../src/lib/RecipeFunctions';

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
});
