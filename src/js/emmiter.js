"use strict";

class EventEmitter {

    constructor(args) {
        this.handler = {};
        this.once = [];
    }

    on(type, handler) {
        if (this.handler[type] === undefined) {
            this.handler[type] = [];
        }
        this.handler[type].push(handler)

    }

    emitter (type) {
        let args = arguments.length > 1? Array.prototype.slice.call(arguments,1) : undefined;
        let handlers = this.handler[type];
        if (handlers === undefined || handlers.length < 1 ) {
            return
        }
        for (let hd in handlers) {
            handlers[hd].apply(this, args);
            if(handlers[hd].once === true) this.remove(type,handlers[hd]);
        }
        for(let inner in this.once) {
            if(this.once[i] == type ) {
                this.handler[type].length = 0;
            }
        }
    }

    remove(type,handler) {
        if (this.handler[type] === undefined) {
            return;
        } else {
            var handlers = this.handler;
            for ( let i = 0, len = handlers.length; i < len; i++ ) {
               if (handlers[i] == handler) {
                   break;
               }
            }
            handlers.splice(i,1);
        }
    }

    once(type,handler){
        if (this.handler[type] === undefined) {
            this.handler[type] = [];
        }
        this.once.push(type);
        this.handler[type].push(handler)
    }


}

export default EventEmitter;
