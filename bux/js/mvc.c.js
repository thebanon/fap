window.mvc["c"] = {

    crud: {

        create: {

            video: (stars, id) => {
                ajax(`https://api.fapbux.localhost/v1/create/xvideos/video/`+stars+`/https://xvideos.com/video`+id+`/`);
            }

        },

        read: {

            video: (stars, id) => {
                ajax(`https://api.fapbux.localhost/v1/read/xvideos/video/`+stars+`/https://xvideos.com/video`+id+`/`);
            }

        }
    }

}