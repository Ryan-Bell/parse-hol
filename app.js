'use strict';

const fs = require('fs');
rawToHOL(fs.readFileSync('./test.hol'));

function rawToHOL(raw, strip=true){
	if(!raw) return {};
	raw = CSVToArray(raw);
	let obj = {};
	let location;
	raw.map((row) => {
		if(row.length === 1){
			location = row[0].match(/\[(.*?)\]/)[0];	
			return obj[location] = {};
		}
		if(strip) row = row.map((v) => { return v.trim(); });
		obj[location][row[0]] = row[1];
		
	});
	console.log(JSON.stringify(obj,2,2));
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


module.exports = {
	rawToHOL: rawToHOL
}; 
