/*!
 * yky
 * Copyright(c) 2017 yt_fan
 * MIT Licensed
 */
'use strict';
var toStr = Object.prototype.toString;

/**
 * @private
 * @param {Obj} obj 
 * @returns {Boolen}
 */
function isObject(obj) {
  return toStr.call(obj) === '[object Object]';
}

/**
 * @private
 * @param {Obj} obj 
 * @returns {Boolen}
 */
function isString(obj) {
  return toStr.call(obj) === '[object String]';
}

/**
 * @private
 * @param {Object} obj 
 * @param {String} arr 
 * @param {String} parent 
 * @return {Array} keys
 */
function listKeys(obj, arr, parent){
  parent = parent || '';
  if(!Array.isArray(arr)) arr = [];
  var i;
  for(i in obj) {
    if(i) {
      if(isObject(obj[i])) {
        parent += '.' + i;
        var arrs = listKeys(obj[i], arr, parent);
        arr.concat(arrs);
      } else {
        arr.push(parent + '.' + i);
      }
    }
  }
  return arr;
}

/**
 * @private
 * @param {any} obj 
 * @param {any} path 
 * @returns 
 */
function getValue(obj, path) {
  var paths = path.split('.');
  for(var i=0; i< paths.length; i++) {
    if(isObject(obj[paths[i]]) && paths[i+1]) {
      path = paths.slice(1).join('.');
      return getValue(obj[paths[i]], path);
    } else {
      return obj[paths[i]];
    }
  }
}

/**
 * @private contain
 * @param {Object} object
 * @param {String} path
 * @return {Boolen}
 */
function contain(object, path) {
  if(!isObject(object) || !isString(path)) return false;
  return listKeys(object).indexOf(path) > 0;
}

/**
 * @public
 * @param {Object} object
 * @param {Array} arr
 * @param {Prefix} prefix
 */
module.exports = function(object, arr, prefix) {
  if(arguments.length < 1) throw new Error('Need a object, please!!!');
  if(typeof arr === 'string') {
    arr = [];
    prefix = arr;
  }
  if(!isObject(object)) return arr;
  let keys = listKeys(object, arr, prefix);
  if(keys.length > 0) keys = keys.map(function(item) {
    return item.split('.').slice(1).join('.');
  });
  return keys;
};

/**!
 * @public
 * @param {Object} object
 * @param {Array} arr
 * @param {Prefix} prefix
 */
module.exports.valueOfPath = function(obj, path) {
  if(!isString(path) || !isObject(obj)) 
    throw new Error('Need a object and a path, please!!!')
  if(!contain(obj, path)) return undefined;
  return getValue(obj, path);
};
