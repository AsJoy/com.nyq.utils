"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/3/24.
 */
var EventUtil = {
    "addHandler": function addHandler(element, handlerChild, handlerName, handler) {
        if (arguments.length === 3) {
            handler = handlerName;
            handlerName = handlerChild;
            if (element.addEventListener) {
                element.addEventListener(handlerName, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + handlerName, handler);
            } else {
                element["on" + handlerName] = handler;
            }
        } else if (arguments.length === 4) {
            EventUtil.addHandler(element, handlerName, function (event) {
                var ev = EventUtil.getEvent(event);
                var tar = EventUtil.getTarget(event);
                do {

                    if (typeof handlerChild.length === "number") {

                        for (var i = 0, len = handlerChild.length; i < len; i++) {
                            hc = handlerChild[i];
                            if (tar === hc) {
                                handler.call(hc);
                                break;
                            }
                        }
                    } else {
                        if (tar === handlerChild) {
                            handler.call(handlerChild);
                            break;
                        }
                    }
                    tar = tar.parentNode;
                } while (tar !== null && tar !== element);
            });
        }
    },
    "removeHandler": function removeHandler(element, handlerName, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(handlerName, handler, false);
        } else if (element.removeHandler) {
            element.removeHandler("on" + handlerName, handler);
        } else {
            element["on" + handlerName] = null;
        }
    },
    "getEvent": function getEvent(event) {
        return event || window.event;
    },
    "preventDefault": function preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    "stopPropagation": function stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    "getTarget": function getTarget(event) {
        return event.target || event.srcElement;
    },
    "getType": function getType(event) {
        return event.type;
    },
    //获取到鼠标点击的时候相对于文档位置 pageX ，PageY
    "getPageXY": function getPageXY(event) {
        if (event.pageX === undefined) {
            return {
                "pageX": event.pageX,
                "pageY": event.pageY
            };
        } else {
            //IE8 及以下不支持pageX , pageY
            return {
                "pageX": event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                "pageY": event.pageY + (document.documentElement.scrollTop || document.body.scrollTop)
            };
        }
    },
    //得到鼠标滑动事件 时 的相关元素
    "getRelatedTarget": function getRelatedTarget(event) {
        return event.relatedTarget || event.toElement || event.fromElement || null;
    },
    //得到见键盘按下的键盘对应的字符编码ASCII  得到的字符编码可以通过String.fromCharCode()得到对应的键盘字符;
    "getKeyCode": function getKeyCode(evevt) {
        if (typeof event.charCode === "number") {
            return event.charCode;
        } else {
            return evevt.keyCode;
        }
    },
    //监听文本框oncopy onpaste oncut 对象时 对剪切板的操作 IE 支持text 和url
    "getClipborderText": function getClipborderText(event) {
        var clipData = event.clipboardData || window.clipboardData;
        // getData IE
        return clipData.getText("text");
    },
    //将取得的值放入剪切板
    "setClipDataText": function setClipDataText(event, value) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            window.clipboardData.setData("text", value);
        }
    }
};
/*
* 实现jsonp
* */
var Jsonp = {
    "date": function date() {
        return new Date().getTime();
    },
    "parse": function parse(url, data) {
        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) == "object" && data !== null) {
            for (var i in data) {
                if (!url.indexOf("?") > -1) {
                    url += "?" + i + "=" + encodeURIComponent(data[i]);
                } else {
                    url += "&" + i + "=" + encodeURIComponent(data[i]);
                }
            }
        } else if (data !== null) {
            if (!url.indexOf("?") > -1) {
                url += "?" + data;
            } else {
                url += "&" + data;
            }
        }

        return url;
    },
    "jsonp": function jsonp(url, data, fnc) {
        var script = document.createElement("script");
        var name = "jsonp" + this.date();
        url = this.parse(url, data);
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
};
/*
 * 将dom节点转换成数组
 * */
function nodeConvertToArray(nodes) {
    var array = [];
    try {
        array = Array.prototype.slice.call(nodes, 0);
    } catch (ex) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            array.push(nodes.item(i));
        }
    }
    return array;
}