String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) {
    path ? view(route(path)).then(data => {

        var paths = data.paths ? data.paths : path, packet = null;
        console.log(1,{data,paths});
        if(Object.keys(data).includes('paths')) {
          var packet = data.packet;
          paths = data.paths;
        } 
        else { paths = data; }
        console.log(2,{data,paths});
        
        return new Promise(function(resolve, reject) { console.log({paths});

          var root = paths.GOT[0];
          var port = document.body.find('[data-page="'+paths.page+'"]');

          if(root) { document.body.dataset.root = root; } 
          else { document.body.removeAttribute('data-root'); }

          //console.log(global.ppp, paths.page);
          if(global.ppp.includes(paths.page)) {
            document.body.dataset.ppp = paths.page;
            document.body.dataset.url = paths.path;
          } 
          else {
            document.body.dataset.page = paths.page;
            document.body.dataset.path = paths.path;
            document.body.removeAttribute('data-ppp');
            document.body.removeAttribute('data-url');
          }
    
          var view = paths.port.closest('.view');
          if(port) {
              view.dataset.root = root;
              view.dataset.page = paths.page;
              view.dataset.path = paths.path;
          }


            /*JS*/
            var medias = view.querySelectorAll('[data-style="CascadingGrid"]');
            if(medias.length > 0) { var ff = 0; do { 
                    var media = medias[ff];
                    var style = media.dataset.style;
                    if(style === 'CascadingGrid') {
                            var formats = media.querySelectorAll('format');
                            if(formats.length > 0 && formats.length>=media.dataset.limit) {
                                    var last = formats[formats.length - 1];
                                    var height = last.offsetTop + last.offsetHeight;
                                    media.style.height = height+'px';
                                    media.style.paddingTop = 0;
                            }
                            else { media.remove(); }
                    }
                    if(media.dataset.x) {
                            if(media.dataset.x === "end") { media.scrollLeft = media.clientWidth + media.scrollWidth; }
                    }
            ff++; } while(ff < medias.length); }
            /*JS*/
          

          var path = packet && packet.state ? packet.state : paths.path; //console.log({path});
          window.GET = paths.GOT;
          document.body.classList.contains('loading') ? document.body.classList.remove('loading') : null;
          auth.user() ?
            document.body.dataset.uid = auth.user().uid : 
            (document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
          history.pushState(path,'Spriii',path);
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
    var x2 = true;

    document.body.removeAttribute('data-menu');

    var port = document.body.find('[data-port="'+paths.path+'"]');
    if(root) {
      port ? document.body.dataset.root = (port.closest('.view') ? port.closest('.view').dataset.root = root : null) : port = document.body.find('[data-port="'+paths.page+'"]');
      //console.log('CHECK',{paths}); //console.log({port},paths.page);
    } 
    else { 
        port = document.body.find('[data-port="/"]');
        document.body.removeAttribute('data-root');
    }
    paths.port = port;
    
    if(root) {
        
      if(root === 'video') { }
      
    }
    else { 
      body.removeAttribute('data-profile');
      window.mediaStream ? mediaStream.getTracks().forEach(track => track.stop()) : null;
      resolve(paths);
    }
    x2 = true;  
    dom.spriii.classList[x2 ? 'add' : 'remove']('x2');
  });
}
window.route = state => { //console.log({state});
    var GOT = state===window.location.origin ? [] : routes.dir(state);
    var data, n = 0, arr1 = [], arr2 = [], section, view = GOT && GOT[0] ? GOT[0] : '/';  
    var root = GOT[0];
    if(GOT.length > 0) { do { var m = GOT[n];

      if(m.includes('#') || (
        (root === 'video' && n === 2)
      )) { arr1[n] = '*';  arr2[n] = m; }
      else { arr1[n] = arr2[n] = m; }

      console.log({arr1,arr2});

    n++; } while( n < GOT.length); }
    var data = {GOT:arr2, arr: {arr1, arr2}, page:routes.url(arr1), path:routes.url(routes.dir(state.replace('#',''))), port:routes.url(arr2), state, section};
    data.section = document.querySelector('[data-port="'+data.path+'"]') ? document.querySelector('[data-port="'+data.path+'"]').closest('.section') : null;
    //console.log({data}); 
    return data;
}
window.routes = {
  dir: (url,g=[]) => {
    url.split('/').forEach((a,i) => { g[i] = a; }); 
    g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
  },
  url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
} 