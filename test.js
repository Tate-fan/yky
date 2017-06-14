'use strict';

var test = require('ava').test;
var yky = require('./index');

var testdata = {
  one: {
    two: {
      three: {
        fouth: 4
      },
      tt: {
        dd: "dd"
      }
    }
  },
  root: "root",
  tar: "tar",
  email: 'yt_fan@163.com',
};

test('# Get keys of object', function(t) {
  var keys = yky(testdata);
  console.log('keys =>', keys);
  t.pass(Array.isArray(keys));
  t.pass(yky.valueOfPath(testdata, 'root') === 'root');
  t.pass(yky.valueOfPath(testdata, 'one.two') !== 'root');
  t.pass(yky.valueOfPath(testdata, 'one.two.three.fouth') === 4);
  t.pass(yky.valueOfPath(testdata, 'name') === undefined);
});