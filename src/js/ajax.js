"use strict";
import Util from "./util.js";
import Deferred from "./deferred.js";
import Promise from "./promise.js";


class Ajax  {
  constructor(opt) {
    this.xhr = null;
    this.DEFAULT = {
      "data":null,
      "dataType":"json",
      "type":"get",
      "url": "",
      "async": true,
      "success": function(){

      },
      "error": function(){
        
      }
     };
     this.result={
        "data":null,
        "xhr":null,
        "status":0
    };
    Util.extend(this.DEFAULT,opt);
    this._init();
    this.deferred = new Deferred();
  }

  _init() {
    if(typeof  XMLHttpRequest != "undefined"){
            this.xhr = new XMLHttpRequest();
      }else if(typeof f.activeXString != "string" ){
          var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                  "MSXML2.XMLHttp"],
              i, len;
          for (i=0,len=versions.length; i < len; i++){
              try {
                  new ActiveXObject(versions[i]);
                  f.activeXString = versions[i];
                  break;
              } catch (ex){
                  //skip
              }
          }

          this.xhr = new ActiveXObject(f.activeXString);
      }else{
          throw new Error("XHR 不是可获取的值");
      }
  }

  get() {
    return this.do("get");
  }

  post() {
    return this.do("post");
  }

  do(type) {
    let that = this;
    let data = ""
    
    if(type !== undefined) {
       this.DEFAULT.type = type;
    }

    if (typeof this.DEFAULT.data === "string") {
      data = this.DEFAULT.data;
    } else if(this.DEFAULT.data !== null && typeof this.DEFAULT.data === "object") {
      data = Util.serializeObject(this.DEFAULT.data);
    }

    if(this.DEFAULT.type === "post") {
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    this.xhr.open(this.DEFAULT.type,this.DEFAULT.url,this.DEFAULT.async);
    
    this.xhr.send(data);

    this.xhr.onreadystatechange = function() {
      if (this.readyState==4) {
          if (this.status >= 200 && this.status <= 300) {
              var rt = this.responseText;
              if (that.DEFAULT.dataType.toLowerCase() == "json") {
                  that.result.data = JSON.parse(rt);
              } else {
                  that.result.data = rt;
              }
              that.result.xhr = this;
              that.result.status = this.status;
              that.DEFAULT.success.call(this,
                  that.result.data,
                  that.result.status,
                  that.result.xhr);
              that.deferred.resolve(that.result.data,
                  that.result.status,
                  that.result.xhr);
          } else {
              that.deferred.reject(this.state);
          }
      }
    }

    return this.deferred.promise;
  }

}

export default Ajax;