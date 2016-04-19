"use strict";

var _ajax = require("../ajax.js");

var _ajax2 = _interopRequireDefault(_ajax);

var _deferred = require("../deferred.js");

var _deferred2 = _interopRequireDefault(_deferred);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 3;
var aj = new _ajax2.default({
  "url": "./test.json",
  "data": { username: "niuyuanqinag" },
  success: function success() {
    count--;
    result(count);
  }
}).do();

var aj = new _ajax2.default({
  "url": "./test.json",
  "data": { username: "niuyuanqinag" },
  success: function success() {
    count--;
    result(count);
  }
}).do();

var aj = new _ajax2.default({
  "url": "./test.json",
  "data": { username: "niuyuanqinag" },
  success: function success() {
    count--;
    result(count);
  }
}).do();

function result(count) {
  if (count === 0) {
    console.log(1000);
  }
}

/*
let def = new Deferred();
def.all(Arr).then(function(){
  console.log(arguments[0])
}, function() {
   console.log("error",arguments)
})
*/