/* eslint no-magic-numbers: 0 */
import {expect} from 'chai';
import {getOriginalGravity, getFinalGravity, getPlato, platoToSG} from '../src/lib/GravityCalculator';

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

function expectWithinMargin(value, target, margin) {
	expect(value).to.be.within(value - margin, value + margin);
}

describe('Calculate gravity', () => {
	it('Calculate degrees plato', () => {
		// Calculation from http://www.homebrewtalk.com/showthread.php?t=540961
		const recipe = {
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
		const settings = {
			efficiency: 0.8,
			dryWeight: 1,
			addGrainVolume: true
		};

		const plato = roundToDecimal(getPlato(recipe, settings), 2);
		expect(plato).to.be.equal(8.75);
	});

	it('Convert plato to SG', () => {
		expect(roundToDecimal(platoToSG(0.5))).to.be.equal(1.002);
			expect(roundToDecimal(platoToSG(1))).to.be.equal(1.004);
			expect(roundToDecimal(platoToSG(1.5))).to.be.equal(1.006);
			expect(roundToDecimal(platoToSG(2))).to.be.equal(1.008);
			expect(roundToDecimal(platoToSG(2.5))).to.be.equal(1.010);
			expect(roundToDecimal(platoToSG(3))).to.be.equal(1.012);
			expect(roundToDecimal(platoToSG(3.5))).to.be.equal(1.014);
			expect(roundToDecimal(platoToSG(4))).to.be.equal(1.016);
			expect(roundToDecimal(platoToSG(4.5))).to.be.equal(1.018);
			expect(roundToDecimal(platoToSG(5))).to.be.equal(1.020);
			expect(roundToDecimal(platoToSG(5.5))).to.be.equal(1.022);
			expect(roundToDecimal(platoToSG(6))).to.be.equal(1.024);
			expect(roundToDecimal(platoToSG(6.5))).to.be.equal(1.026);
			expect(roundToDecimal(platoToSG(7))).to.be.equal(1.028);
			expect(roundToDecimal(platoToSG(7.5))).to.be.equal(1.030);
			expect(roundToDecimal(platoToSG(8))).to.be.equal(1.032);
			expect(roundToDecimal(platoToSG(8.5))).to.be.equal(1.034);
			expect(roundToDecimal(platoToSG(9))).to.be.equal(1.036);
			expect(roundToDecimal(platoToSG(9.5))).to.be.equal(1.038);
			expect(roundToDecimal(platoToSG(10))).to.be.equal(1.040);
			expect(roundToDecimal(platoToSG(10.5))).to.be.equal(1.042);
			expect(roundToDecimal(platoToSG(11))).to.be.equal(1.044);
			expect(roundToDecimal(platoToSG(11.5))).to.be.equal(1.046);
			expect(roundToDecimal(platoToSG(12))).to.be.equal(1.048);
			expect(roundToDecimal(platoToSG(12.5))).to.be.equal(1.050);
			expect(roundToDecimal(platoToSG(13))).to.be.equal(1.053);
			expect(roundToDecimal(platoToSG(13.5))).to.be.equal(1.055);
			expect(roundToDecimal(platoToSG(14))).to.be.equal(1.057);
			expect(roundToDecimal(platoToSG(14.5))).to.be.equal(1.059);
			expect(roundToDecimal(platoToSG(15))).to.be.equal(1.061);
			expect(roundToDecimal(platoToSG(15.5))).to.be.equal(1.063);
			expect(roundToDecimal(platoToSG(16))).to.be.equal(1.065);
			expect(roundToDecimal(platoToSG(16.5))).to.be.equal(1.068);
			expect(roundToDecimal(platoToSG(17))).to.be.equal(1.070);
			expect(roundToDecimal(platoToSG(17.5))).to.be.equal(1.072);
			expect(roundToDecimal(platoToSG(18))).to.be.equal(1.074);
			expect(roundToDecimal(platoToSG(18.5))).to.be.equal(1.076);
			expect(roundToDecimal(platoToSG(19))).to.be.equal(1.079);
			expect(roundToDecimal(platoToSG(19.5))).to.be.equal(1.081);
			expect(roundToDecimal(platoToSG(20))).to.be.equal(1.083);
			expect(roundToDecimal(platoToSG(20.5))).to.be.equal(1.085);
			expect(roundToDecimal(platoToSG(21))).to.be.equal(1.087);
			expect(roundToDecimal(platoToSG(21.5))).to.be.equal(1.090);
			expect(roundToDecimal(platoToSG(22))).to.be.equal(1.092);
			expect(roundToDecimal(platoToSG(22.5))).to.be.equal(1.094);
			expect(roundToDecimal(platoToSG(23))).to.be.equal(1.096);
			expect(roundToDecimal(platoToSG(23.5))).to.be.equal(1.099);
			expect(roundToDecimal(platoToSG(24))).to.be.equal(1.101);
			expect(roundToDecimal(platoToSG(24.5))).to.be.equal(1.103);
			expect(roundToDecimal(platoToSG(25))).to.be.equal(1.106);
			expect(roundToDecimal(platoToSG(25.5))).to.be.equal(1.108);
			expect(roundToDecimal(platoToSG(26))).to.be.equal(1.110);
			expect(roundToDecimal(platoToSG(26.5))).to.be.equal(1.113);
			expect(roundToDecimal(platoToSG(27))).to.be.equal(1.115);
			expect(roundToDecimal(platoToSG(27.5))).to.be.equal(1.117);
			expect(roundToDecimal(platoToSG(28))).to.be.equal(1.120);
			expect(roundToDecimal(platoToSG(28.5))).to.be.equal(1.122);
			expect(roundToDecimal(platoToSG(29))).to.be.equal(1.124);
			expect(roundToDecimal(platoToSG(29.5))).to.be.equal(1.127);
			expect(roundToDecimal(platoToSG(30))).to.be.equal(1.129);
			expect(roundToDecimal(platoToSG(30.5))).to.be.equal(1.132);
			expect(roundToDecimal(platoToSG(31))).to.be.equal(1.134);
			expect(roundToDecimal(platoToSG(31.5))).to.be.equal(1.136);
			expect(roundToDecimal(platoToSG(32))).to.be.equal(1.139);
			expect(roundToDecimal(platoToSG(32.5))).to.be.equal(1.141);
			expect(roundToDecimal(platoToSG(33))).to.be.equal(1.144);
			expect(roundToDecimal(platoToSG(33.5))).to.be.equal(1.146);
			expect(roundToDecimal(platoToSG(34))).to.be.equal(1.149);
			expect(roundToDecimal(platoToSG(34.5))).to.be.equal(1.151);
			expect(roundToDecimal(platoToSG(35))).to.be.equal(1.154);
			expect(roundToDecimal(platoToSG(35.5))).to.be.equal(1.156);
			expect(roundToDecimal(platoToSG(36))).to.be.equal(1.159);
			expect(roundToDecimal(platoToSG(36.5))).to.be.equal(1.161);
			expect(roundToDecimal(platoToSG(37))).to.be.equal(1.164);
			expect(roundToDecimal(platoToSG(37.5))).to.be.equal(1.166);
			expect(roundToDecimal(platoToSG(38))).to.be.equal(1.169);
			expect(roundToDecimal(platoToSG(38.5))).to.be.equal(1.171);
			expect(roundToDecimal(platoToSG(39))).to.be.equal(1.174);
			expect(roundToDecimal(platoToSG(39.5))).to.be.equal(1.176);
			expect(roundToDecimal(platoToSG(40))).to.be.equal(1.179);
	});

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
			efficiency: 0.80,
			dryWeight: 1
		};

		console.log(getOriginalGravity(recipe, settings));
		gravity = Math.round(getOriginalGravity(recipe, settings) * 1000) / 1000;
		console.log(gravity);
		expectWithinMargin(gravity, 1.037, 0.001);
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
