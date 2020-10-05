window.mvc['m'] = {

    data: {

        volumes: (data) => {
            return new Promise((resolve, reject) => {
                  ajax('/json/volumes.json').then((j,json=JSON.parse(j)) => {
                    var limit = data && data.limit ? data.limit : null;
                    var vols = [];
                    limit && limit < json.length ? json = json.slice(json.length-limit) : null;
                    j = 0; do {
                      ajax('/json/volume/'+json[j]+'.json').then((v,volume=JSON.parse(v)) => { 
                        vols.push(volume);
                        if(vols.length === json.length) { resolve(vols); }
                      });
                    j++; } while(j < json.length);
                  });
            });
        }
        
    }

}