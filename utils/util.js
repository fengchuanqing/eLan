const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const phoneVerify=str=>{
  const myreg= /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if(!myreg.test(str)){
    wx.showToast({
      icon:'error',
      title: '手机号格式错误',
    })
    return false
  }
  return true
}
const telephoneReg=str=>{
  const reg=/\d{3}\d{8}|\d{4}\d{7}/;
  if(!reg.test(str)){
    wx.showToast({
      icon:'error',
      title: '电话号格式错误',
    })
    return false
  }
  return true
}
let convertHtmlToText= (inputText) =>{
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '\r\n');
  returnText = returnText.replace(/<\/li>/ig, '\r\n');
  returnText = returnText.replace(/<li>/ig, ' * ');
  returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");
 
  //-- remove P and A tags but preserve what's inside of them
  returnText=returnText.replace(/<p.*?>/gi, "\r\n");
  returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
 
  //-- remove all inside SCRIPT and STYLE tags
  returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText=returnText.replace(/<(?:.|\s)*?>/g, "");
 
  //-- get rid of more than 2 multiple line breaks:
  returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
 
  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g,'');
 
  //-- get rid of html-encoded characters:
  returnText=returnText.replace(/&nbsp;/gi," ");
  returnText=returnText.replace(/&amp;/gi,"&");
  returnText=returnText.replace(/&quot;/gi,'"');
  returnText=returnText.replace(/&lt;/gi,'<');
  returnText=returnText.replace(/&gt;/gi,'>');
 
  return returnText;
}

  // 计算 两经纬度 距离 km
 let  distance=function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  }

let throttle = function(fn, wait) {
  var last = 0;
  return function () {
    var args = arguments;
    var now = Date.now();
    if (now - last > wait) {
      fn.apply(this, args);
      last = now;
    }
  };
}
module.exports = {
  formatTime,
  phoneVerify,
  telephoneReg,
  convertHtmlToText,
  distance,
  throttle
}
