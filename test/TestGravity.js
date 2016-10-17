/* eslint no-magic-numbers: 0 */
import {expect} from 'chai';
import {getOriginalGravity, getFinalGravity} from '../src/lib/GravityCalculator';

/**
* Rount a float to the given number of decimal places
* @param {number} number The number to round
* @param {number} places The number of decimal places to round to. Defaults to 3
* @returns {number} The rounded float
**/
function roundToDecimal(number, places = 3) {
	const multiplier = Math.pow(10, places);
	return Math.round(number * multiplier) / multiplier;
}

describe('Calculate gravity', () => {
	it('Calculate gravity for single malt', () => {
		let recipe = {
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
		let settings = {
			efficiency: 0.85,
			dryWeight: 0.994837
		};

		let gravity = roundToDecimal(getOriginalGravity(recipe, settings), 3);

		expect(gravity).to.be.equal(1.055);

		/*
		// Calculation from http://www.homebrewtalk.com/showthread.php?t=540961
		recipe = {
			volume: 3.785,
			grains: [
				{
					name: 'Pale Malt',
					ebc: 4,
					potential: 1.36288,
					weight: 0.4536
				}
			],
			adjuncts: [],
			hops: []
		};
		settings = {
			efficiency: 0.85,
			dryWeight: 0.994837
		};

		gravity = Math.round(getOriginalGravity(recipe, settings) * 1000) / 1000;

		expect(gravity).to.be.equal(1.037);
		*/
	});

});

describe('Calculate final gravity', () => {
	it('Can calculate final gravity', () => {
		const yeast = {
			"yeast": "Safale US05",
			"name": "Safale US05",
			"code": "US05",
			"type": "D",
			"floculation": "Low",
			"attenuation": {
				"base": 77,
				"min": 0.75,
				"max": 0.75
			},
			"temp": {
				"min": 15,
				"max": 24
			},
			"maxAlcohol": ""
		};
		expect(roundToDecimal(getFinalGravity(1.041, yeast))).to.be.equal(1.009);
			
				
	});
});
