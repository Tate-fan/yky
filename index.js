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

/**!
 * @private
 * @param {Object} object
 * @param {String} parent 
 * @returns {Array}
 */
function formatPath(obj, parent) {
  parent = parent || '';
  var array = [];
  for(var key in obj) {
    if(isObject(obj[key])) {
      parent = parent + '.' + key;
      var tmp = formatPath(obj[key], parent)
      array = array.concat(tmp);
    } else {
      array.push(parent + '.' + key);
    }
  }
  return array;
}

/*
 * @param {any} object 
 * @param {any} array 
 * @returns 
 */
function _paths(object, array) {
  array = Array.isArray(array) ? array : [];
  for(var key in object) {
    if(isObject(object[key])) {
      var tmp = formatPath(object[key], key);
      array = array.concat(tmp);
    } else {
      array.push(key);
    }
  }
  return array;
}

/**
 * @private
 * @param {any} obj 
 * @param {any} path 
 * @returns 
 */
function _get(obj, path) {
  var paths = path.split('.');
  for(var i=0; i< paths.length; i++) {
    if(isObject(obj[paths[i]]) && paths[i+1]) {
      path = paths.slice(1).join('.');
      return _get(obj[paths[i]], path);
    } else {
      return obj[paths[i]];
    }
  }
}

/**
 * @private
 * @param {Object} obj 
 * @param {String} path 
 * @returns {Boolen}
 */
function _contain(obj, path) {
  var paths = path.split('.');
  for(var i=0; i< paths.length; i++) {
    if(isObject(obj[paths[i]]) && paths[i+1]) {
      path = paths.slice(1).join('.');
      return _get(obj[paths[i]], path);
    } else {
      return !!obj[paths[i]];
    }
  }
}

/**!
 * @public
 * @param {Object} object
 * @param {String} path
 * @return {Any}
 */
module.exports = function(obj, path) {
  if(!isString(path) || !isObject(obj)) 
    throw new Error('Need a object and a path, please!!!')
  path = path || path.trim();
  return _get(obj, path);
};

/**
 * @public
 * @param {Object} object
 * @return {Array}
 */
module.exports.paths = function(object) {
  if(arguments.length < 1) throw new Error('Need a object, please!!!');
  var array = [];
  if(!isObject(object)) return array;
  return _paths(object, array);
};

/**
 * 
 * @public contain
 * @param {Object} object
 * @param {String} path
 * @return {Boolen}
 */
module.exports.contain = function(object, path) {
  if(!isObject(object) || !isString(path)) return false;
  return _contain(object, path);
};
