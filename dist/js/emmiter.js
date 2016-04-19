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