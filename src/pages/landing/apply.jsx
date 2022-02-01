import React,{useState} from 'react';
import innov from '../../assets/svg/innov.jpeg'
import PreviewCallup from '../../components/modals/preview-callup';
import { getStorage, ref, listAll } from "firebase/storage";

const Apply = ({data}) => {

    const [modal, setModalState] = useState(false)

    return (
        
        <div className='call'>

            <div className="callups">

                <div className="callup-card">

                    <div className="image_area"> <img src={data.image} alt="callup cards" /> 

                        <div className="track">{data.track}</div>

                    </div>

                    <div className="content">

                        <div className="title">{data.title}</div>

                        <p>{data.shorts}</p>

                        <div className="foot-area">

                            <div className="close">Closes : 18/02/2022</div>
                            <div className="applyBTN" onClick={ () => setModalState(true) } >Apply</div>
                            
                        </div>

                    </div>

                </div>

            </div>

            {
            modal ? <PreviewCallup img = {data.image} modalChange = {setModalState} description = {data.description} title = {data.title} callupid = {data.id} dataTrack = {data.track}/> : null
            }
            
        </div>
    );
}

export default Apply;
