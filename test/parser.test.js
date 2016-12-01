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

describe('CSVtoArray', function(){
	//app._csvtoarray(fs.readFileSync('./test/test.hol', 'utf8'));
	//TODO more tests
	describe('#empty values', function(){
		it('should empty lines');
		it('should skip lines with spaces or tabs');
		it('should skip lines with commas but empty vals');
		it('should skip lines with commas but spaces/tab vals');
	});
});

describe('Parse function', function(){
	describe('#whitespace', function(){
		it('should strip whitespace by default');
		it('should allow whitespace to be kept');
	});
	describe('#output format', function(){
		it('should return an object');
		it('should pull out the locations');
		it('should handle locations with special characters');
		it('should group the holidays under the correct location');
		it('should not convert the dates to date objects');
	});	
});
