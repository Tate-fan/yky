'use strict';
var test = require('ava').test;
var knife = require('./index');
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
  t.pass(knife(testdata, 'root'), 'root');
  t.pass(knife(testdata, 'name'), 'yt');
  t.pass(knife(testdata, 'nested.nested1.nested2'), 'nested3');
});

test('#Test contain method', function(t) {
  t.pass(knife.contain(testdata, 'nested.nested1'));
});

test('# Get keys of object', function(t) {
  var keys = knife.paths(testdata);
  console.log(keys);
  t.pass(Array.isArray(keys));
});
