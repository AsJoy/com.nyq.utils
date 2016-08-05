(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util.js");

var _util2 = _interopRequireDefault(_util);

var _deferred = require("./deferred.js");

var _deferred2 = _interopRequireDefault(_deferred);

var _promise = require("./promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
    function Ajax(opt) {
        _classCallCheck(this, Ajax);

        this.xhr = null;
        this.DEFAULT = {
            "data": null,
            "dataType": "json",
            "type": "get",
            "url": "",
            "async": true,
            "success": function success() {},
            "error": function error() {}
        };
        this.result = {
            "data": null,
            "xhr": null,
            "status": 0
        };
        _util2.default.extend(this.DEFAULT, opt);
        this._init();
        this.deferred = new _deferred2.default();
    }

    _createClass(Ajax, [{
        key: "_init",
        value: function _init() {
            if (typeof XMLHttpRequest != "undefined") {
                this.xhr = new XMLHttpRequest();
            } else if (typeof f.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i,
                    len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        f.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }

                this.xhr = new ActiveXObject(f.activeXString);
            } else {
                throw new Error("XHR 不是可获取的值");
            }
        }
    }, {
        key: "get",
        value: function get() {
            return this.do("get");
        }
    }, {
        key: "post",
        value: function post() {
            return this.do("post");
        }
    }, {
        key: "do",
        value: function _do(type) {
            var that = this;
            var data = "";

            if (type !== undefined) {
                this.DEFAULT.type = type;
            }

            if (typeof this.DEFAULT.data === "string") {
                data = this.DEFAULT.data;
            } else if (this.DEFAULT.data !== null && _typeof(this.DEFAULT.data) === "object") {
                data = _util2.default.serializeObject(this.DEFAULT.data);
            }

            if (this.DEFAULT.type === "post") {
                this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            this.xhr.open(this.DEFAULT.type, this.DEFAULT.url, this.DEFAULT.async);

            this.xhr.send(data);

            this.xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status >= 200 && this.status <= 300) {
                        var rt = this.responseText;
                        if (that.DEFAULT.dataType.toLowerCase() == "json") {
                            that.result.data = JSON.parse(rt);
                        } else {
                            that.result.data = rt;
                        }
                        that.result.xhr = this;
                        that.result.status = this.status;
                        that.DEFAULT.success.call(this, that.result.data, that.result.status, that.result.xhr);
                        that.deferred.resolve(that.result.data, that.result.status, that.result.xhr);
                    } else {
                        that.deferred.reject(this.state);
                    }
                }
            };

            return this.deferred.promise;
        }
    }]);

    return Ajax;
}();

exports.default = Ajax;
},{"./deferred.js":2,"./promise.js":4,"./util.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require("./promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = function () {
    function Deferred() {
        _classCallCheck(this, Deferred);

        this.promise = new _promise2.default();
    }

    _createClass(Deferred, [{
        key: "resolve",
        value: function resolve() {
            var args = Array.prototype.slice.call(arguments, 0);

            this.promise.emitter.apply(this.promise, ["success"].concat(args));
        }
    }, {
        key: "reject",
        value: function reject() {
            var args = Array.prototype.slice.call(arguments, 0);
            this.promise.emitter.apply(this.promise, ["error"].concat(args));
        }
    }, {
        key: "progress",
        value: function progress() {
            var args = Array.prototype.slice.call(arguments, 0);
            this.promise.emitter.apply(this.promise, ["progress"].concat(args));
        }
    }, {
        key: "all",
        value: function all(promises) {
            var that = this;
            var count = promises.length;
            var result = [];
            promises.forEach(function (item, index) {
                item.then(function () {
                    count--;
                    result.push(arguments[0]);
                    if (count === 0) {
                        that.resolve(result);
                    }
                }, function () {
                    that.reject(arguments);
                });
            });
            return this.promise;
        }
    }]);

    return Deferred;
}();

exports.default = Deferred;
},{"./promise.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter(args) {
        _classCallCheck(this, EventEmitter);

        this.handler = {};
        this.once = [];
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(type, handler) {
            if (this.handler[type] === undefined) {
                this.handler[type] = [];
            }
            this.handler[type].push(handler);
        }
    }, {
        key: "emitter",
        value: function emitter(type) {
            var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;
            var handlers = this.handler[type];
            if (handlers === undefined || handlers.length < 1) {
                return;
            }
            for (var hd in handlers) {
                handlers[hd].apply(this, args);
                if (handlers[hd].once === true) this.remove(type, handlers[hd]);
            }
            for (var inner in this.once) {
                if (this.once[i] == type) {
                    this.handler[type].length = 0;
                }
            }
        }
    }, {
        key: "remove",
        value: function remove(type, handler) {
            if (this.handler[type] === undefined) {
                return;
            } else {
                var handlers = this.handler;
                for (var _i = 0, len = handlers.length; _i < len; _i++) {
                    if (handlers[_i] == handler) {
                        break;
                    }
                }
                handlers.splice(i, 1);
            }
        }
    }, {
        key: "once",
        value: function once(type, handler) {
            if (this.handler[type] === undefined) {
                this.handler[type] = [];
            }
            this.once.push(type);
            this.handler[type].push(handler);
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emmiter = require("./emmiter.js");

var _emmiter2 = _interopRequireDefault(_emmiter);

var _util = require("./util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* Ddefered/promiss模式
* */

var Promise = function (_EventEmitter) {
    _inherits(Promise, _EventEmitter);

    function Promise() {
        _classCallCheck(this, Promise);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Promise).apply(this, arguments));
    }

    _createClass(Promise, [{
        key: "then",
        value: function then(success, error, progress) {
            if (_util2.default.isFunction(success)) {
                this.on("success", success);
            }
            if (_util2.default.isFunction(error)) {
                this.on("error", error);
            }
            if (_util2.default.isFunction(progress)) {
                this.on("progress", progress);
            }
            return this;
        }
    }]);

    return Promise;
}(_emmiter2.default);

exports.default = Promise;
},{"./emmiter.js":3,"./util.js":6}],5:[function(require,module,exports){
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

var def = new _deferred2.default();

def.all(Arr).then(function () {
  console.log(arguments[0]);
}, function () {
  console.log("error", arguments);
});
},{"../ajax.js":1,"../deferred.js":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: "serializeObject",
        value: function serializeObject(obj, origin) {
            if (!(obj instanceof Object)) return;
            var result = "";
            for (var i in obj) {
                if (obj[i] instanceof Object) {
                    result += this.serializeObject(obj[i], i);
                } else {
                    if (origin !== undefined) {
                        result += origin + "." + encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]) + "&";
                    } else {
                        result += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]) + "&";
                    }
                }
            }
            return result.length ? result.substring(0, result.length - 1) : "";
        }
    }, {
        key: "serialize",
        value: function serialize(form) {
            var parts = new Array();
            var field = null;
            for (var i = 0, len = form.elements.length; i < len; i++) {
                field = form.elements[i];
                switch (field.type) {
                    case "select-one":
                    case "select-multiple":
                        for (var j = 0, optLen = field.options.length; j < optLen; j++) {
                            var option = field.options[j];
                            if (option.selected) {
                                var optValue = "";
                                if (option.hasAttribute) {
                                    optValue = option.hasAttribute("value") ? option.value : option.text;
                                } else {
                                    optValue = option.attributes["value"].specified ? option.value : option.text;
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                            }
                        }
                        break;

                    case undefined: //fieldset
                    case "file": //file input
                    case "submit": //submit button
                    case "reset": //reset button
                    case "button":
                        //custom button
                        break;

                    case "radio": //radio button
                    case "checkbox":
                        //checkbox
                        if (!field.checked) {
                            break;
                        }
                    /* falls through */

                    default:
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
            }
            return parts.join("&");
        }
    }, {
        key: "isFunction",
        value: function isFunction(fn) {
            return Object.prototype.toString.call(fn) === "[object Function]";
        }
    }, {
        key: "isArray",
        value: function isArray(array) {
            return Object.prototype.toString.call(array) === "[object Array]";
        }
    }, {
        key: "getURl",
        value: function getURl(url, name, value) {
            url += url.indexOf("?") > -1 ? "?" : "&";
            url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
            return url;
        }
    }, {
        key: "extend",
        value: function extend(src, dest) {
            if ((typeof dest === "undefined" ? "undefined" : _typeof(dest)) !== "object") return dest;

            for (var i in dest) {
                src[i] = dest[i];
            }
        }
    }, {
        key: "getQueryList",
        value: function getQueryList() {
            var obj = null;
            if (location.href.indexOf("?") > -1) {
                var sSearch = decodeURIComponent(location.search.substring(1));
                var i = 0,
                    item,
                    aAim;
                obj = {};
                var aArr = sSearch.length ? sSearch.split("&") : [];
                for (; aArr.length && i < aArr.length; i++) {
                    item = aArr[i];
                    aAim = item.split("=");
                    if (aAim.length === 2) {
                        obj[aAim[0]] = aAim[1];
                    }
                }
            }
            return obj;
        }
    }]);

    return Util;
}();

exports.default = new Util();
},{}]},{},[5]);
