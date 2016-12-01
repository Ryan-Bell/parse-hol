'use strict';
const fs = require('fs');

function parse(raw, strip=true){
	if(!raw) return {};
	raw = CSVToArray(raw);
	let obj = {};
	let location;
	raw.map((row) => {
		if(row.length === 1){
			location = row[0].match(/\[(.*?)\]/)[1];	
			return obj[location] = {};
		}
		if(strip) row = row.map((v) => { return v.trim(); });
		obj[location][row[0]] = row[1];
		
	});
	return obj;
}

function CSVToArray(strData, delim = ',') {
	let objPattern = new RegExp((
	// Delimiters.
	'(\\' + delim + '|\\r?\\n|\\r|^)' +
	// Quoted fields.
	'(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|' +
	// Standard fields.
	'([^\"\\' + delim + '\\r\\n]*))'), 'gi');
	
	let arrData = [[]];
	let match = null;
	while (match = objPattern.exec(strData)) {
		let matchDelim = match[1];
		if(matchDelim === '\n' && !match[3]) continue;
		if (matchDelim.length && (matchDelim !== delim)) {
			arrData.push([]);
		}
		let strMatchedValue = match[2] ? 
			match[2].replace(/\"\"/, '\"') : match[3];
		arrData[arrData.length - 1].push(strMatchedValue);
	}
	return arrData;
}


module.exports = parse;
