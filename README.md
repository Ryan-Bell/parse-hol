# parse-hol  
Microsoft .hol parser  

[![Build Status](https://travis-ci.org/Ryan-Bell/parse-hol.svg?branch=master)](https://travis-ci.org/Ryan-Bell/parse-hol)
[![Coverage Status](https://coveralls.io/repos/github/Ryan-Bell/parse-hol/badge.svg?branch=master)](https://coveralls.io/github/Ryan-Bell/parse-hol?branch=master)

Install
-------

```sh
$ npm install parse-hol
```

Usage
-----

```js
var parseHOL = require('parse-hol');
var fs = require('fs');

var data = fs.readFileSync('outlook.hol', 'utf8');
var result = parseHOL(data);

console.log(result);
/*
{
  'location 1': {
    'holiday 1': ['1/24/2016'],
    'holiday 2': ['2/06/2017', '2/07/2017']
  },
  'location 2': {
    'other holiday 1': ['12/16/2015'],
    'other holiday 2': ['2/06/2017', '2/07/2017']
  }
}
*/
```


Development
-----
| Command | Action |
| ------- | ------ |
| npm test --expose | Run the unit tests on public and private functions |
| npm run cover --expose | Run unit tests and show coverage summary in cli |
