"use strict";

var _jsonp = require("../jsonp.js");

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsonp2.default.jsonp("./test.js", { "hello": "world" }, function () {
  console.log(arguments);
});