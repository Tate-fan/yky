# knife-json

[![Greenkeeper badge](https://badges.greenkeeper.io/cheerfyt/knife-json.svg)](https://greenkeeper.io/)
Get value of object easily use path

![building](https://travis-ci.org/Tate-fan/yky.svg?branch=master)

*NOTE*: **not supprt the array current**

API
===
1. knife(object, path) => Get the value of the path
2. knife.paths(object) => get the paths of the object
2. knife.contain(object, path) => check the paths of the object


```javascript
var knife = require('knife-json');

var testdata = {
  root: 'root',
  name: 'yt',
  nested: {
    nested1: {
      nested2: "nested3"
    }
  }
};

console.log(knife(testdata, 'nested.nested1.nested2')) // nested3
console.log(knife.paths(testdata)) // [ 'root', 'name', 'nested.nested1.nested2' ]
console.log(knife.contain(testdata, 'nested.nested1.nested2')) //true
```
