import React, {useEffect, useState} from 'react';
import { getCouncilMember, getCouncilGraders } from '../api/firebase/getApplication';



const Councilmemberprint = ({data, scr}) => {

    const [dataMember, setDataMember] = useState({

        firstname : "",
        lastname : "",
        img: ""

    })

    useEffect(() => {

        getCouncilMember(data).then( e => setDataMember(e) );
        console.log(scr)

    }, []);

    return (

        <div className="coreDetail">
                    
            <div className="icon"> 
                
                <div className="councilImage">
                    <img src={dataMember?.img} alt="lasric" />
                </div>  

                {dataMember?.firstname} {dataMember?.lastname}  
            
            </div>

            <div className="graded"> {scr.grade || 0}% </div>

        </div>

    );
}

export default Councilmemberprint;
