window.is = {
  external: link => { return link.includes("https://"); },
  local: () => { return ['www.spriii.localhost','127.0.0.1'].includes(window.location.hostname) ? true : false; },
  mobile: () => { 
    var ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ua ? document.body.dataset.mobi=true : document.body.dataset.mobi ? document.body.removeAttribute('data-mobi') : null; 
    return ua;
  },
  overflow: (node,dir) => { 
    if(node == null) { return null; }
    return node['scroll'+dir] > node['client'+dir] ? node : is.overflow(node.parentNode,dir);
  },
  theme: (sunrise, sunset, now) => { document.body.dataset.mode = now < sunrise || now > sunset ? 'dark' : 'lite'; },
};

window.tld = () => { return is.local() ? 'localhost' : 'com'; }

function init(url) {
    
  return new Promise((resolve, reject) => {

    //firebase.initializeApp(auth.config);
    document.body.removeAttribute('data-nojs');

    window.app = window.location.hostname.split('.')[window.location.hostname.split('.').length-2];
     
    window.cdn = 'https://cdn.'+app+'.'+tld()+'/file/frkcdn';
    window.dom = {
      "body": document.body,
      "header": byId("body-header"),
      "main": byId("main")
    };
                              
    //dom.popup.addEventListener("touchstart", on.touch, {passive: true});
    //dom.popup.addEventListener("touchmove", on.touch, {passive: true});

    //dom.main.addEventListener("touchstart", on.touch, {passive: true});
    //dom.main.addEventListener("touchmove", on.touch, {passive: true});
    
    //dom.header.addEventListener("touchstart", on.touch, {passive: true});
    //dom.header.addEventListener("touchmove", on.touch, {passive: true});
                                   
    //dom.footer.addEventListener("touchstart", on.touch, {passive: true});
    //dom.footer.addEventListener("touchmove", on.touch, {passive: true});

  });
    
}