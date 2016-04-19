"use strict";

import Promise from "./promise.js";


class Deferred   {
  constructor() {
     this.promise = new Promise();
  }

  resolve(){
      var args = Array.prototype.slice.call(arguments,0);
      
      this.promise.emitter.apply(this.promise, ["success"].concat(args));
  }

  reject(){
      var args = Array.prototype.slice.call(arguments,0);
      this.promise.emitter.apply(this.promise,["error"].concat(args));
  }

  progress(){
      var args = Array.prototype.slice.call(arguments,0);
      this.promise.emitter.apply(this.promise,["progress"].concat(args));
  }


  all(promises){
      let that = this;
      let count = promises.length;
      let result = [];
      promises.forEach((item, index) => {
          item.then(function(){
              count--;
              result.push(arguments[0]);
              if( count === 0) {
                that.resolve(result);
              }
          }, function(){
              that.reject(arguments);
          })
      })
      return this.promise;
  }
}

export default Deferred;

