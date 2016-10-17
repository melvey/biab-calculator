/* eslint no-magic-numbers: 0 */
import {expect} from 'chai';
import getIBUs, {getTinsethUtilisation} from '../src/lib/getIBUs';

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


describe('Calculate bitterness', () => {
	it('Calculate Tinseth’s hop utilisation factor', () => {
		const utilisationTable = {
			0: {
				'1.030': 0.000,
				'1.040': 0.000,
				'1.050': 0.000,
				'1.060': 0.000,
				'1.070': 0.000,
				'1.080': 0.000,
				'1.090': 0.000,
				'1.100': 0.000,
				'1.110': 0.000,
				'1.120': 0.000,
				'1.130': 0.000
			},
			6: {
				'1.030': 0.065,
				'1.040': 0.059,
				'1.050': 0.054,
				'1.060': 0.049,
				'1.070': 0.045,
				'1.080': 0.041,
				'1.090': 0.038,
				'1.100': 0.035,
				'1.110': 0.032,
				'1.120': 0.029,
				'1.130': 0.026
			},
			15: {
				'1.030': 0.137,
				'1.040': 0.125,
				'1.050': 0.114,
				'1.060': 0.105,
				'1.070': 0.096,
				'1.080': 0.087,
				'1.090': 0.080,
				'1.100': 0.073,
				'1.110': 0.067,
				'1.120': 0.061,
				'1.130': 0.056
			},
			30: {
				'1.030': 0.212,
				'1.040': 0.194,
				'1.050': 0.177,
				'1.060': 0.162,
				'1.070': 0.148,
				'1.080': 0.135,
				'1.090': 0.124,
				'1.100': 0.113,
				'1.110': 0.103,
				'1.120': 0.094,
				'1.130': 0.086
			},
			51: {
				'1.030': 0.264,
				'1.040': 0.241,
				'1.050': 0.221,
				'1.060': 0.202,
				'1.070': 0.184,
				'1.080': 0.169,
				'1.090': 0.154,
				'1.100': 0.141,
				'1.110': 0.129,
				'1.120': 0.118,
				'1.130': 0.108
			},
			60: {
				'1.030': 0.276,
				'1.040': 0.252,
				'1.050': 0.231,
				'1.060': 0.211,
				'1.070': 0.193,
				'1.080': 0.176,
				'1.090': 0.161,
				'1.100': 0.147,
				'1.110': 0.135,
				'1.120': 0.123,
				'1.130': 0.112
			},
			120: {
				'1.030': 0.301,
				'1.040': 0.275,
				'1.050': 0.252,
				'1.060': 0.230,
				'1.070': 0.210,
				'1.080': 0.192,
				'1.090': 0.176,
				'1.100': 0.161,
				'1.110': 0.147,
				'1.120': 0.134,
				'1.130': 0.123
			}
		};
		Object.getOwnPropertyNames(utilisationTable).forEach((time) => {
			Object.getOwnPropertyNames(utilisationTable[time]).forEach((gravity) => {
				const utilisation = roundToDecimal(getTinsethUtilisation(parseInt(time, 10), parseFloat(gravity)));
				expect(utilisation).to.be.equal(utilisationTable[time][gravity]);
			});
		})

	});

	it('Calculate IBUs', () => {
		const recipe = {
			volume: 18.9271,
			grains: [],
			adjuncts: [],
			hops: [
				{
					name: "Goldings",
					aa: 5.0,
					time: 60,
					weight: 56.699
				}
			]
		};
		expect(roundToDecimal(getIBUs(recipe, {og: 1.050}), 0)).to.be.equal(35);

		recipe.volume = 5;
		recipe.hops = [
			{
				name: "Goldings",
				aa: 5.0,
				time: 10,
				weight: 20 
			}
		];
		expect(roundToDecimal(getIBUs(recipe, {og: 1.050}), 0)).to.be.equal(17);

		recipe.volume = 19;
		recipe.hops = [
			{
				name: "Pride of ringwood",
				aa: 9.0,
				time: 5,
				weight: 100 
			},
			{
				name: "Galaxy",
				aa: 13.5,
				time: 5,
				weight: 60 
			}
		];
		expect(roundToDecimal(getIBUs(recipe, {og: 1.041}), 0)).to.be.equal(45);
	});
});
