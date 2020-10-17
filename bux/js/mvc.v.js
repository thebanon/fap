function toWords(num) {
  var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
              'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
              'seventeen', 'eighteen', 'nineteen'];
  var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
              'ninety'];

  var numString = num.toString();

  if (num < 0) throw new Error('Negative numbers are not supported.');

  if (num === 0) return 'zero';

  //the case of 1 - 20
  if (num < 20) {
    return ones[num];
  }

  if (numString.length === 2) {
    return tens[numString[0]] + ' ' + ones[numString[1]];
  }

  //100 and more
  if (numString.length == 3) {
    if (numString[1] === '0' && numString[2] === '0')
      return ones[numString[0]] + ' hundred';
    else
      return ones[numString[0]] + ' hundred and ' + convert(+(numString[1] + numString[2]));
  }

  if (numString.length === 4) {
    var end = +(numString[1] + numString[2] + numString[3]);
    if (end === 0) return ones[numString[0]] + ' thousand';
    if (end < 100) return ones[numString[0]] + ' thousand and ' + convert(end);
    return ones[numString[0]] + ' thousand ' + convert(end);
  }
}
window.mvc['v'] = {

    page: {

        index: () => {

            ajax('/html/www.index.html').then(html => { //func.home(html,document.body.find('[data-port="/"]'))

              var page = byId('page-index');
              page.innerHTML = html;

              ajax('/json/videos.json').then((j) => {
                var videos = query.shuffle.arr(Object.values(JSON.parse(j)));  console.log({videos});
                if(videos.length > 0) { 
                  var i = 0, html = ``; do {
                    var row = videos[i];
                    var id = row.id; //console.log({row});
                    html += `<div class="media-video">`;
                      html += `<header class="header-video">`;
                        html += `<section class="section-video" data-href="/video/`+row.id+`/"><picture><img src="`+row.thumbnail+`"></picture></section>`;
                      html += `</header>`;
                      html += `<footer class="footer-video" onclick="mvc.c.crud.read.video('`+row.freaks.join('+').replace('%20','_').replace(' ','_')+`',`+row.id+`)">`;
                        var s = 0; do {
                          html += `<div class="freak"><a></a><a>`+row.freaks[s].replace('_',' ').replace('-',' ')+`</a></div>`;
                        s++; } while(s < row.freaks.length)
                        html += `<div>`+row.title+`</div>`;
                      html += `</footer>`;
                    html += `</div>`;
                   i++; } while(i < 60 && i < videos.length);
                   byId('page-index').find('.section-video').innerHTML = html;
                }
              });

              ajax('/json/www.index.json').then((j,json=JSON.parse(j)) => {                
                var index = window.pages["index"] = json;

                var freaks = query.shuffle.arr(json.freaks);
                var html = ``; f = 0; 
                do { html += `<picture><img src='/jpg/avatar/`+freaks[f]+`.jpg'></picture>`; f++; }
                while(f < 10 && f < freaks.length);
                page.find('.stars').innerHTML = html;

                var html = ``, volumes = json.volumes; f = 0;
                do { html += `<div data-href="/volume/`+Object.keys(volumes)[f]+`/"><a data-before="volume `+toWords(parseInt(Object.keys(volumes)[f])+1)+`" data-after="`+volumes[f]+`"></a></div>`; f++; }
                while(f < page.find('.volumes').children.length);
                page.find('.volumes').innerHTML = html;
                tion.ialize(tion.ia);
              });    
              //ajax(api.endpoint()+'/v1/read/blocks',{data:mvc.m.block(page.find('feed')),dataType:"POST"}).then((j,json=JSON.parse(j)) => {
                //mvc.v.page.home(html,json).then(() => tion.ialize(ion.ia));
              //}).catch(() => tion.ialize(ion.ia));
            });

        },

        video: {        
            
            id: data => {

                var id = data.paths.GOT[1];
                var section = data.paths.section;
                var state = data.paths.state;
                var page = video => ajax('/html/www.video.id.html').then(html => {
                    if(section.innerHTML === "" || (section.innerHTML !== "" && section.dataset.port === state)) {
                        section.innerHTML = html;
                        section.find('.video-header').style.backgroundImage = "url("+video.thumbnail+")";
                        section.find('#video-iframe').src = "https://www.xvideos.com/embedframe/"+id;
                    }
                }); 
                ajax('/json/video/'+id+'.json').then((v,video=JSON.parse(v)) => page(video));
                    
            }
                
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

            },

            number: data => {

                var page = video => ajax('/html/www.volume.number.html').then(html => {
                    if(section.innerHTML === "" || (section.innerHTML !== "" && section.dataset.port === state)) {
                        section.innerHTML = html;
                    }
                });
                
                var paths = data.paths;
                var get = paths.GOT;
                var section = paths.section;
                var state = paths.state;
                var index = parseInt(get[1])-1;
                var id = parseInt(get[2])-1;
                var volume = volumes[parseInt(get[1])-1];
                var video = '';
                
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