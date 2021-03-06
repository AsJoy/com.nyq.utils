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
    key: "bind",
    value: function bind(fun, context) {

      var prevArgs = Array.proyotype.slice.call(arguments, 1);

      return function () {
        var nextArgs = Array.proyotype.slice.call(arguments, 0);
        var args = prevArgs.contact(nextArgs);
        fun.apply(context, args);
      };
    }
  }, {
    key: "extends",
    value: function _extends(sub, sup) {
      var obj = function obj() {
        this.constructor = sub;
      };
      obj.prototype = sup.prototype;
      return sub.prototype = new obj();
    }
  }, {
    key: "throttle",
    value: function throttle(fn, time, option) {
      var timer = 0;
      var context = option && option.context || this;
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (timer) return;
        timer = setTimeout(function () {
          fn.apply(context, args);
          timer = 0;
        }, time);
      };
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
  }, {
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
  }]);

  return Util;
}();

exports.default = new Util();