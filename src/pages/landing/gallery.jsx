import React, {useState, useEffect} from 'react';
import './gallery.scss'

const gallery_data = {

    opening_ceremony : {

        title : 'Lasric Benefits to the Awardees',
        description : 'This is an album that showcases the launching ceremony of the LASRIC initiative in Lagos State on 3rd November 2020.',
        uid : '485-2494835739-5385',

        content : [
            'http', 'http://', 'http://', 'http://', 'http://', 'http'
        ]

    },

    awardee_hangout : {

        title : 'Lasric Benefits to the Awardees',
        description : 'This is an album that showcases the launching ceremony of the LASRIC initiative in Lagos State on 3rd November 2020.',
        uid : '485-2494835739-7839',

        content : [
            'http', 'http://', 'http://', 'http://', 'http://', 'http'
        ]

    }
}

const Gallery = () => {


    const [gallery, setGallery] = useState([]);

    useEffect(() => {

       setGallery(gallery_data);

    }, []);


    return (

        <div className="gallery-body">

            <div style={{position:'relative', height : 0, paddingBottom : '56.25%'}}><iframe class='sproutvideo-player' src='https://videos.sproutvideo.com/embed/449edcbd1a15e1cfcd/f057d56c9ed38b86' style={{position : 'absolute', width : '100%', height : '100%', left : 0, top : 0}} frameborder='0' allowfullscreen referrerpolicy='no-referrer-when-downgrade'></iframe></div>

        </div>

    );
}

export default Gallery;
