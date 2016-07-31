"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* 实现jsonp
* */
var Jsonp = function () {
    function Jsonp(args) {
        // code

        _classCallCheck(this, Jsonp);
    }

    _createClass(Jsonp, [{
        key: "date",
        value: function date() {
            return new Date().getTime();
        }
    }, {
        key: "jsonp",
        value: function jsonp(url, data, fnc) {
            var script = document.createElement("script");
            var name = "jsonp" + this.date();
            if (!_util2.default.serializeObject(data)) {
                url = url + "?" + _util2.default.serializeObject(data);
            }
            if (!/callback=([^&]+)/.test(url)) {
                if (url.indexOf("?") > -1) {
                    url += "&callback=" + name;
                } else {
                    url += "?callback=" + name;
                }
            } else {
                name = RegExp["$1"];
            }
            script.src = url;
            script.type = "text/javascript";
            script.id = name;

            window[name] = function (json) {
                var oAim = document.getElementById(name);
                oAim.parentNode.removeChild(oAim);
                window[name] = undefined;
                fnc(json);
            };
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(script);
        }
    }]);

    return Jsonp;
}();

exports.default = new Jsonp();