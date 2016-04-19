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