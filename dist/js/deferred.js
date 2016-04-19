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