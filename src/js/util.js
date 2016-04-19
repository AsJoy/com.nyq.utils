"use strict";

class Util  {

  extend(src,dest){
    
    if (typeof dest!== "object") 
      return dest;
    
    for (let i in dest){
      src[i] = dest[i];
    }
  }

  serializeObject(obj, origin) {
      if ( !(obj instanceof Object)) return;
      var result="";
      for (var i in obj) {
          if (obj[i] instanceof Object) {
              result += this.serializeObject(obj[i], i);
          } else {
              if (origin !== undefined) {
                  result += origin +"."+encodeURIComponent(i) + "=" + encodeURIComponent(obj[i])+"&";
              } else {
                  result += encodeURIComponent(i) + "=" +encodeURIComponent(obj[i])+"&";
              }

          }
      }
      return result.length? result.substring(0, result.length-1) : "";
  }
  serialize(form){
      var parts = new Array();
      var field = null;
      for (var i=0, len=form.elements.length; i < len; i++){
          field = form.elements[i];
          switch(field.type){
              case "select-one":
              case "select-multiple":
                  for (var j=0, optLen = field.options.length; j < optLen; j++){
                      var option = field.options[j];
                      if (option.selected){
                          var optValue = "";
                          if (option.hasAttribute){
                              optValue = (option.hasAttribute("value") ?
                                  option.value : option.text);
                          } else {
                              optValue = (option.attributes["value"].specified ?
                                  option.value : option.text);
                          }
                          parts.push(encodeURIComponent(field.name) + "=" +
                              encodeURIComponent(optValue));
                      }
                  }
                  break;

              case undefined:     //fieldset
              case "file":        //file input
              case "submit":      //submit button
              case "reset":       //reset button
              case "button":      //custom button
                  break;

              case "radio":       //radio button
              case "checkbox":    //checkbox
                  if (!field.checked){
                      break;
                  }
              /* falls through */

              default:
                  parts.push(encodeURIComponent(field.name) + "=" +
                      encodeURIComponent(field.value));
          }
      }
      return parts.join("&");
  }
   
  isFunction(fn){
      return  Object.prototype.toString.call(fn) === "[object Function]";
  }
  isArray(array){
      return  Object.prototype.toString.call(array) === "[object Array]";
  }

  getURl(url,name,value){
      url += url.indexOf("?")>-1? "?":"&";
      url += encodeURIComponent(name)+"="+encodeURIComponent(value);
      return url;
  }

}    

export default new Util(); 