Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0].classList.add(name); } return that; };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0].classList.remove(name); } return that; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };

Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.hasClass = function(n) { return new RegExp(' ' + n + ' ').test(' ' + this.className + ' '); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, function(a, b, c) { if(a === whl) { whl = b; } }); return whl; };
Element.qs = s => { return document.querySelector(s); }

window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.s = (ar,a,b) => { return ar === 1 ? a : b; }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }

function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => {
      try {
        if(response.status === 404) { reject({code:404,message:'Not Found'}); }
        else { response.text().then(res => resolve(res)); }
      } 
      catch(e) { reject(e); } 
    });
  });
}
function pad(str, len) { len = len || 2; var zeros = new Array(len).join('0'); return (zeros + str).slice(-len); }
function unixTime(format,time) {  
  if(format === '24hr') {
    var date = new Date(time * 1000);
    var formattedTime = parseInt(pad(date.getHours(),2) + pad(date.getMinutes(),2).substr(-2));
  }
  return formattedTime;
}
function componentToHex(c) { var hex = c.toString(16); return hex.length == 1 ? "0" + hex : hex; }
function rgb2hex(rgb) { return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]); }
function hex2rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.length===3 ? hex+hex : hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function fg(rgb) { return (Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000) > 125) ? '#000' : '#fff'; }
function gRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? [match[1], match[2], match[3]] : {};
}
function colors(data) {
   var n = 0, matches, cols = {};
   if (matches = data.match(/\#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?/g)) {
      for (var i=0; i<matches.length; i++) {
          if (!cols[matches[i]]) {
             cols[matches[i]] = 1;
             n++;
          }
      }
   }
   return n;
}
function getPct(oldNumber, newNumber) { return ((oldNumber-newNumber)/oldNumber)*100; }
function randomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
function zeroCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
