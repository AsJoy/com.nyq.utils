"use strict";

import Ajax from "../ajax.js";
import Deferred  from "../deferred.js";

var count = 3
var aj = new Ajax({
  "url":"./test.json",
  "data": {username:"niuyuanqinag"},
  success:function() {
    count--;
    result(count);
  }
})
.do();

var aj = new Ajax({
  "url":"./test.json",
  "data": {username:"niuyuanqinag"},
    success:function() {
    count--;
    result(count);
  }
})
.do();


var aj = new Ajax({
  "url":"./test.json",
  "data": {username:"niuyuanqinag"},
  success:function() {
    count--;
    result(count);
  }
})
.do();

function result(count) {
  if(count === 0) {
    console.log(1000);
  }
}

/*
let def = new Deferred();
def.all(Arr).then(function(){
  console.log(arguments[0])
}, function() {
   console.log("error",arguments)
})
*/
