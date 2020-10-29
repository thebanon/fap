window.api = {
    endpoint: () => { return 'https://api.'+window.app+'.'+tld(); },
    v1: {
        create: {
            video: (stars, id) => {
                ajax(`https://api.fapbux.localhost/v1/create/xvideos/video/`+stars+`/https://xvideos.com/video`+id+`/`);
            }
        },
        read: {
            video: (stars, id) => {
                ajax(`https://api.fapbux.localhost/v1/read/xvideos/video/`+stars+`/https://xvideos.com/video`+id+`/`);
            }
        },
        update: {
            freaks: () => {
                ajax(`https://api.fapbux.localhost/v1/update/cache/freaks`);                
            },
            videos: () => {
                ajax(`https://api.fapbux.localhost/v1/update/cache/videos`);                
            }
        },
        delete: {

        }    
    }
}