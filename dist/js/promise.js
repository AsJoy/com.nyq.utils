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