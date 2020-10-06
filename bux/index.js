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

window.mvc = {m:{},v:{},c:{}};

window.tld = () => { return is.local() ? 'localhost' : 'com'; }

window.volumes = [];

window.func = {
  volumes: () => mvc.m.data.volumes({limit:4}).then(data => {
    window.volumes = data;
    tion.ialize(tion.ia);
  }),
  home: () => mvc.v.page.index(),
};
window.tion = {
  ia: 0,
  ialize: pg => { tion.ia++;
      if(tion.ia === Object.keys(func).length) { 
        firebase.auth().onAuthStateChanged(user => auth.change(user).then(goto => { goto.router(); }));
      }
  }
};
function init(url) {
    
  return new Promise((resolve, reject) => {

    firebase.initializeApp(auth.config);
    document.body.removeAttribute('data-nojs');

    window.app = window.location.hostname.split('.')[window.location.hostname.split('.').length-2];
     
    window.cdn = 'https://cdn.'+app+'.'+tld()+'/file/frkcdn';
    window.dom = {
      "body": document.body,
      "header": byId("body-header"),
      "main": byId("main")
    };
    
    window.pages = {};
    
    var keys = Object.keys(func);
    var p = 0; do { func[keys[p]](tion.ia); p++; } while(p < keys.length);

  });
    
}