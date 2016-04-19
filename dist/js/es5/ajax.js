"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* ajax 部分 */
var Ajax = function () {
    "use strict";

    var aj = function f() {
        this.deferred = new Deferred();
        this.xhr = null;
        this.Default = {
            "url": "",
            "data": {},
            "dataType": "json",
            "async": false
        };

        this.result = {
            "data": null,
            "xhr": null,
            "status": 0
        };

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
    };
    aj.prototype._init = function (option, fn) {
        if (typeof option == "string") {
            this.Default.url = option;
        } else {
            Util.extend(this.Default, option);
        }
        var that = this;
        this.xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status <= 300) {
                    var rt = this.responseText;
                    if (that.Default.dataType.toLowerCase() == "json") {
                        that.result.data = JSON.parse(rt);
                    } else {
                        that.result.data = rt;
                    }
                    that.result.xhr = this;
                    that.result.status = this.status;
                    fn.call(this, that.result.data, that.result.status, that.result.xhr);
                    that.deferred.resolve(that.result.data, that.result.status, that.result.xhr);
                } else {
                    that.deferred.reject(this.state);
                }
            }
        };
    };
    aj.prototype.get = function (option, fn) {
        this._init(option, fn);
        this.xhr.open("get", this.Default.url, !this.Default.async);
        this.xhr.send(null);
        return this.deferred.promise;
    };

    aj.prototype.post = function (option, fn) {
        this._init(option, fn);
        var data = "";
        if (typeof this.Default.data === "string") {
            data = this.Default.data;
        }
        this.xhr.open("post", this.Default.url, !this.Default.async);
        data = Util.serializeObject(this.Default.data);
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xhr.send(data);
        return this.deferred.promise;
    };

    function getURl(url, name, value) {
        url += url.indexOf("?") > -1 ? "?" : "&";
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }
    return {
        "post": function post(option, fn) {
            var postMd = new aj();
            return postMd.post(option, fn);
        },
        "get": function get(url, fn) {
            var postMd = new aj();
            return postMd.get(url, fn);
        },
        "xhr": function xhr() {
            return new aj();
        }
    };
}();

var Util = {
    "extend": function extend(src, desc, deep) {
        "use strict";

        var self = this;
        if (arguments.length == 1) {
            for (var i in src) {
                self[i] = src[i];
            }
            return;
        }
        if (!(desc instanceof Object)) return;

        if (deep === true) {
            if ((typeof src === "undefined" ? "undefined" : _typeof(src)) !== "object") {
                src = {};
            }
            for (var i in desc) {
                if (_typeof(desc[i]) === "object") {

                    if (!src[i] && !(src[i] instanceof Object)) {
                        src[i] = {};
                    }
                    self.extend(src[i], desc[i], true);
                } else {
                    src[i] = desc[i];
                }
            }
        } else {
            if ((typeof src === "undefined" ? "undefined" : _typeof(src)) !== "object") {
                src = desc;
            } else {
                for (var i in desc) {
                    src[i] = desc[i];
                }
            }
        }
    },
    "serializeObject": function serializeObject(obj, origin) {
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
    },
    /* 序列化form数据  */
    "serialize": function serialize(form) {
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
    },
    "isFunction": function isFunction(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    },
    "isArray": function isArray(array) {
        return Object.prototype.toString.call(array) === "[object Array]";
    }
};

/*
* 自定义事件
* */
function EventEmitter() {
    this.handler = {};
}

EventEmitter.prototype.on = function (type, handler) {
    if (this.handler[type] === undefined) {
        this.handler[type] = [];
    }
    this.handler[type].push(handler);
    console.log(this.handler);
};

EventEmitter.prototype.emitter = function (type) {
    var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;
    var handlers = this.handler[type];
    if (handlers === undefined || handlers.length < 1) {
        return;
    }
    for (var hd in handlers) {
        handlers[hd].apply(this, args);
        if (handlers[hd].once === true) this.remove(type, handlers[hd]);
    }
};

EventEmitter.prototype.remove = function (type, handler) {
    if (this.handler[type] === undefined) {
        return;
    } else {
        var handlers = this.handler;
        for (var i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i] == handler) {
                break;
            }
        }
        handlers.splice(i, 1);
    }
};

EventEmitter.prototype.once = function (type, handler) {
    if (this.handler[type] === undefined) {
        this.handler[type] = [];
    }
    handler["once"] = true;
    this.handler[type].push(handler);
};

/*
* Ddefered/promiss模式
* */
function Promise() {
    EventEmitter.call(this);
}

Promise.prototype = new EventEmitter();

Promise.prototype.constructor = Promise;

Promise.prototype.then = function (success, error, progress) {

    if (Util.isFunction(success)) {
        this.on("success", success);
    }
    if (Util.isFunction(error)) {
        this.on("error", error);
    }
    if (Util.isFunction(progress)) {
        this.on("progress", progress);
    }
    return this;
};

function Deferred() {
    this.promise = new Promise();
}

Deferred.prototype.resolve = function () {
    this.promise.emitter.apply(this.promise, ["success"].concat(arguments));
};

Deferred.prototype.reject = function () {
    this.promise.emitter.apply(this.promise, ["error"].concat(arguments));
};

Deferred.prototype.progress = function () {
    this.promise.emitter.apply(this.promise, ["progress"].concat(arguments));
};