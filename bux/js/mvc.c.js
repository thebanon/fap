window.mvc["c"] = {

    crud: {

        read: {

            video: (stars, id) => {
                ajax(`https://api.fapbux.localhost/v1/read/xvideos/video/`+stars+`/https://xvideos.com/video`+id+`/`);
            }

        }
    }

}