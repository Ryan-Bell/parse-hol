'use strict';

function rawToHOL(raw){
	if(!raw) return [];
	raw = CSVToArray(raw).slice(1);
	raw.unshift(['name', 'date']);
	raw = arrayToJSON(raw);
	let dates = [];
	raw.forEach(function(row){
		dates.push(new Date(row.date));
	});
	return dates;
}

function arrayToJSON(array){
	let raw = {
		metaData : array[0].map(v=>{return {name:v};}),
		rows : array.slice(1)
	};
	return normalize(raw);
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
