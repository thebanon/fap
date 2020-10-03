String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) { 
    path ? view(route(path)).then(data => {

        var paths = data.paths ? data.paths : path, packet = null;
        if(Object.keys(data).includes('paths')) {
          var packet = data.packet;
          paths = data.paths;
        } 
        else { paths = data; }
        
        return new Promise(function(resolve, reject) {

          var root = paths.GOT[0];
          var port = document.body.find('[data-page="'+paths.page+'"]');

          if(root) { document.body.dataset.root = root; } 
          else { document.body.removeAttribute('data-root'); }

          //console.log(global.ppp, paths.page);
          if(global.ppp.includes(paths.page)) {
            document.body.dataset.ppp = paths.page;
            document.body.dataset.url = paths.port;
          } 
          else {
            document.body.dataset.page = paths.page;
            document.body.dataset.port = paths.port;
            document.body.removeAttribute('data-ppp');
            document.body.removeAttribute('data-url');
          }
          
          var view = paths.section.closest('.page');
          if(port) {
              view.dataset.root = root;
              view.dataset.page = paths.page;
              view.dataset.port = paths.port;
          }          

          var path = packet && packet.state ? packet.state : paths.port; //console.log({path});
          window.GET = paths.GOT;
          document.body.classList.contains('loading') ? document.body.classList.remove('loading') : null;
          auth.user() ?
            document.body.dataset.uid = auth.user().uid : 
            (document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
          history.pushState(path,'FapBux',path);
          window.scrollTo(0,0);
          resolve(paths);

        });

    }) : reject({error:error["404"]});
  });
};
function view(paths) {
  return new Promise(function(resolve, reject) {

    var get = paths.GOT;
    var root = paths.GOT[0];
    var port = document.body.find('[data-port="'+paths.path+'"]');

    document.body.removeAttribute('data-menu');

    if(root) {
      if(port && port.closest('.view')) { document.body.dataset.root = port.closest('.view').dataset.root = root; }      
      if(!port) { port = document.body.find('[data-port="'+paths.page+'"]'); }
    } 
    else { 
        port = document.body.find('[data-port="/"]');
        document.body.removeAttribute('data-root');
    }
    
    if(root) {
        
      if(root === 'video') { resolve({paths}); }
      else if(root === 'volume') { 
        if(get.length > 1) {
          if(get.length > 2) { mvc.v.page.volume.video({paths}); }
          else { }
        }
        resolve({paths});
      }
      else { resolve({paths}); }
      
    }
    else { resolve({paths});  }
  });
}
window.route = state => { //console.log({state});
    var GOT = state===window.location.origin ? [] : routes.dir(state);
    var data, n = 0, arr1 = [], arr2 = [], section, view = GOT && GOT[0] ? GOT[0] : '/';  
    var root = GOT[0];
    if(GOT.length > 0) { do { var m = GOT[n];

      if(m.includes('#') || (
        (root === 'volume' && GOT.length === 2 && n === 1) ||
        (root === 'volume' && GOT.length === 3 && n > 0 && n < 3)
      )) { arr1[n] = '*';  arr2[n] = m; }
      else { arr1[n] = arr2[n] = m; }

      //console.log({arr1,arr2});

    n++; } while( n < GOT.length); }
    var data = {GOT:arr2, arr: {arr1, arr2}, page:routes.url(arr1), port:routes.url(arr2), state, section};
    data.section = document.querySelector('[data-page="'+data.page+'"]') ? document.querySelector('[data-page="'+data.page+'"]').closest('.article') : null;
    return data;
}
window.routes = {
  dir: (url,g=[]) => {
    url.split('/').forEach((a,i) => { g[i] = a; }); 
    g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
  },
  url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
} 