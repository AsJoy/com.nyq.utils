"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
    },
    /*
    * 获取相对于html的offsetLeft
    * */
    getoffset: function getoffset(node) {
        var offset = {
            "offsetTop": node.offsetTop,
            "offsetLeft": node.offsetLeft
        };
        if (node.offsetParent !== null) {
            var current = arguments.callee(node.offsetParent);

            offset.offsetTop += current.offsetTop;
            offset.offsetLeft += current.offsetLeft;
        }
        return offset;
    },


    /*
    *获取 文档的实际大小
    * */

    getDocSize: function getDocSize() {
        return {
            "width": Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
            "height": Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        };
    }
};

exports.default = EventUtil;