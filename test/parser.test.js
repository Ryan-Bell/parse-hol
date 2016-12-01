'use strict';
let expect = require('chai').expect;
const fs = require('fs');
const app = require('../src/app.js');

describe('api', function(){
	it('should export the parse function', function(){
		expect(app.parse).to.be.a('function');
	});

	it('should export the CSVtoArray function for tests', function(){
		expect(app._csvtoarray).to.be.a('function');
	});
});


describe('Parse function', function(){
	describe('#whitespace', function(){
		let input;
		beforeEach(function(){
			input = '[location]\n\ hol1\ ,\ date1\ \n\thol2\t,\tdate2\t';
		});

		it('should strip whitespace by default', function(){
			let expected = {'location' : {
												'hol1' : 'date1',
												'hol2' : 'date2'
											}};	
			expect(app.parse(input)).to.deep.equal(expected);
		})

		it('should allow whitespace to be kept', function(){
			let expected = {'location' : {
												'\ hol1\ '  : '\ date1\ ',
												'\	hol2\	' : '\	date2\	'
											}};	
			expect(app.parse(input, false)).to.deep.equal(expected);
		});
	});
	describe('#output format', function(){
		let output;
		let expectedKeys = [
			'ABC Bangalore Office 2010',
			'ABC Chennai Office 2010',
			'ABC US Office 2010'
		];

		beforeEach(function(){
			output = app.parse(fs.readFileSync('./test/test.hol', 'utf8'));
		});

		it('should return an object', function(){
			expect(output).to.be.an('object');
		});

		it('should pull out the locations', function(){
			expect(output).to.have.all.keys(expectedKeys);
		});

		it('should handle locations with special characters', function(){
			//output will come from special file
			output = app.parse(fs.readFileSync('./test/special.hol', 'utf8'));
			let expectedLocations = [
				'**lo*cat*ion**',
				'lo(cat)ion',
				'lo/cat/ion',
				'lo.cat.ion',
				'lo@cat@ion',
				'lo#c%a^t$i&on',
				'lo[cat]ion',
				'lo-cat-ion',
				'lo_cat_ion',
				'lo cat\tion',
			];
			expect(output).to.have.all.keys(expectedLocations);	
		});

		it('should group the holidays under the correct location', function(){
			//use the count of keys for a quick test
			let k0 = expectedKeys[0];
			let k1 = expectedKeys[1];
			let k2 = expectedKeys[2];
			let expectedKeyCount = {
				k0: 15,
				k1: 13,
				k2: 11,
			};
			let actualKeyCount = {
				k0: Object.keys(output[k0]).length,
				k1: Object.keys(output[k1]).length,
				k2: Object.keys(output[k2]).length,
			};
			expect(actualKeyCount).to.deep.equal(expectedKeyCount);
		});

		it('should not convert the dates to date objects', function(){
			expect(output[expectedKeys[0]]['Christmas']).to.be.a('string');
		});
	});	
});
