window.mvc['m'] = {

    data: {

        volumes: (data) => {
            return new Promise((resolve, reject) => {
                  ajax('/json/volumes.json').then((j,json=JSON.parse(j)) => {
                    var limit = data && data.limit ? data.limit : null;
                    var vols = [];
                    limit && limit <= json.length ? json = json.slice(json.length-limit) : null;
                    console.log({json,limit}); 
                    j = 0; do {
                      ajax('/json/volume/'+(j+1)+'.json')
                        .then((v,volume=JSON.parse(v)) => {   
                            console.log(volume);                     
                            vols.push(volume);                
                            if(vols.length === limit) { resolve(vols); }
                        });
                    j++; } while(j < limit );
                  });
            });
        }
        
    }

}