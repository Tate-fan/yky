'use strict';
var test = require('ava').test;
var yky = require('./index');
var testdata = {
  root: 'root',
  name: 'yt',
  nested: {
    nested1: {
      nested2: "nested3"
    }
  }
};

test('#Test get value method', function(t) {
  t.pass(yky(testdata, 'root'), 'root');
  t.pass(yky(testdata, 'name'), 'yt');
  t.pass(yky(testdata, 'nested.nested1.nested2'), 'nested3');
});

test('#Test contain method', function(t) {
  t.pass(yky.contain(testdata, 'nested.nested1'));
});

test('# Get keys of object', function(t) {
  var keys = yky.paths(testdata);
  console.log(keys);
  t.pass(Array.isArray(keys));
});
