window.mvc["c"] = {

    crud: {

        read: {

            video: (row, id) => {
                ajax(`https://api.fapbux.localhost/v1/read/xvideos/video/`+row.stars.join('+').replace('%20','_').replace(' ','_')+`/https://xvideos.com/video`+id+`/`);
            }

        }
    }

}