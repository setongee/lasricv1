import React, {useEffect, useState} from 'react';
import { getCouncilData } from '../api/firebase/auth';
import './council.scss'

const Council = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function fetchData() {

            const response = await getCouncilData();
            //console.log(response);
            setData(response);

        }

        fetchData();

    }, []);

    console.log(data);

    return (

        <div className="councilFrame">

            <div className="headerTags">
                <h1>Our People</h1>
                <p>The Council is made up of seasoned Tech Entrepreneurs, Academia and senior government officials in Lagos State.</p>
            </div>

            <div className="images">

                {
                    data.length ? data.map(img => {
                        return <div className="councilImageHolder">

                        <div className="imageContainer" style={{ backgroundImage : `url(${img.img})`}} >
                        </div>
    
                        <div className="councilMemberName">
                            {img.firstname} {img.lastname}
                        </div>
    
                        <div className="councilJob">
                            {img.job || "No Job Added Yet"}
                        </div>
    
                    </div>

                    }) : null
                }

            </div>

        </div>
    );
}

export default Council;
