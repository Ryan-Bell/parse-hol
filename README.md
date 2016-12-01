#parse-hol  
Microsoft .hol parser

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
```

Development
-----
| Command | Action |
| ------- | ------ |
| npm test --expose | Run the unit tests on public and private functions |
| npm run test-cov --expose | Run unit tests and show coverage summary in cli |
| npm run view-cov | Opens coverage report in firefox for viewing covered source |
