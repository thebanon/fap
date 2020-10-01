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

window.func = {
  home: (html,page) => {        
    ajax('/html/www.index.html').then(html => { 
      //func.home(html,document.body.find('[data-port="/"]'))
      var page = byId('article-index');
      page.innerHTML = html;
      //ajax(api.endpoint()+'/v1/read/blocks',{data:mvc.m.block(page.find('feed')),dataType:"POST"}).then((j,json=JSON.parse(j)) => {
        //mvc.v.page.home(html,json).then(() => tion.ialize(ion.ia));
      //}).catch(() => tion.ialize(ion.ia));
    });
  }
};
window.tion = {
  ia: 0,
  ialize: pg => {
      ion.ia++;
      if(ion.ia === Object.keys(func).length) { firebase.auth().onAuthStateChanged(user => {
        auth.change(user).then(goto => { console.log({goto});
          goto = (user && document.body.dataset.ppp === '/my/account/') ? '/' : window.location.pathname;
          goto.router();
        });
      }); }
  }
};
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
    
    var keys = Object.keys(func);
    var p = 0; do { func[keys[p]](); p++; } while(p < keys.length);


  });
    
}