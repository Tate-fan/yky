
# yky
Get value of object easily use path

![building](https://travis-ci.org/Tate-fan/yky.svg?branch=master)

*NOTE*: **not supprt the array current**

API
===
1. yky(object, path) => Get the value of the path
2. yky.paths(object) => get the paths of the object
2. yky.contain(object, path) => check the paths of the object


```javascript
var yky = require('yky');

var testdata = {
  root: 'root',
  name: 'yt',
  nested: {
    nested1: {
      nested2: "nested3"
    }
  }
};

console.log(yky(testdata, 'nested.nested1.nested2')) // nested3
console.log(yky.paths(testdata)) // [ 'root', 'name', 'nested.nested1.nested2' ]
console.log(yky.contain(testdata, 'nested.nested1.nested2')) //true
```
