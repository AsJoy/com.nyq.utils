"use strict";

import Jsonp from "../jsonp.js";

Jsonp.jsonp("./test.js",{"hello":"world"}, function(){
  console.log(arguments)
})