window.mvc['v'] = {

    page: {

        index: () => {

            ajax('/html/www.index.html').then(html => { //func.home(html,document.body.find('[data-port="/"]'))

              var page = byId('page-index');
              page.innerHTML = html;              

              ajax('/json/stars.json').then((j,json=JSON.parse(j)) => {
              });

              ajax('/json/www.index.json').then((j,json=JSON.parse(j)) => {  


                var freaks = query.shuffle.arr(json.freaks);
                var html = ``; f = 0; 
                do { html += `<picture><img src='/jpg/avatar/`+freaks[f]+`.jpg'></picture>`; f++; }
                while(f < 10 && f < freaks.length);
                page.find('.stars').innerHTML = html;
              
                var videos = query.shuffle.obj(json.videos);
                if(videos.length > 0) { 
                  var i = 0, html = ``; do {
                    var row = videos[i];
                    html += `<div class="media-video">`;
                      html += `<header class="header-video">`;
                        html += `<section class="section-video" data-href="/video/`+row.id+`/"><picture><img src="`+row.thumbnail+`"></picture></section>`;
                      html += `</header>`;
                      html += `<footer class="footer-video">`;
                        var s = 0; do {
                          html += `<div class="freak"><a></a><a>`+row.stars[s].replace('_',' ').replace('-',' ')+`</a></div>`;
                        s++; } while(s < row.stars.length)
                        html += `<div>`+row.title+`</div>`;
                      html += `</footer>`;
                    html += `</div>`;
                   i++; } while(i < 60 && i < videos.length);
                   page.find('.section-video').innerHTML = html;
                }
                tion.ialize(tion.ia);
              });    
              //ajax(api.endpoint()+'/v1/read/blocks',{data:mvc.m.block(page.find('feed')),dataType:"POST"}).then((j,json=JSON.parse(j)) => {
                //mvc.v.page.home(html,json).then(() => tion.ialize(ion.ia));
              //}).catch(() => tion.ialize(ion.ia));
            });

        },

        volume: {

            video: data => {

                var page = video => ajax('/html/www.volume.number.video.html').then(html => {
                    if(section.innerHTML === "" || (section.innerHTML !== "" && section.dataset.port === state)) {
                        section.innerHTML = html;
                        section.find('.video-header').style.backgroundImage = "url("+video.thumbnail+")";
                        section.find('#video-iframe').src = "https://www.xvideos.com/embedframe/"+video.id;
                    }
                });
                
                var paths = data.paths;
                var get = paths.GOT;
                var section = paths.section;
                var state = paths.state;
                var index = parseInt(get[1])-1;
                var id = parseInt(get[2])-1;
                var volume = volumes[parseInt(get[1])-1];
                var video;
                if(volume) { 
                    video = volume.videos[parseInt(get[2])-1];                    
                    page(video);
                }
                else {
                    ajax('/json/volume/'+parseInt(get[1])+'.json').then((v,volume=JSON.parse(v)) => {
                        console.log({volume});
                        volumes[index] = volume;
                        video = volume.videos[id];
                        page(video);
                    });
                }
                console.log({paths,volume,video});

            }

        }

    }

}