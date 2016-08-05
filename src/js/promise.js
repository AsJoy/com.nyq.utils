"use strict";

import EventEmitter from "./emmiter.js"
import Util from "./util.js";
/*
* Ddefered/promiss模式
* */

class Promise extends EventEmitter{
 

  then(success, error, progress){
      if (Util.isFunction(success)) {
          this.on("success",success);
      }
      if (Util.isFunction(error)) {
          this.on("error",error);
      }
      if (Util.isFunction(progress)) {
          this.on("progress", progress);
      }
      return this;
  }
 
}

export default Promise;




