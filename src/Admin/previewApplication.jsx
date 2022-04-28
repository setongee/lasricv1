import React,{useEffect, useState} from 'react';
import { getAUser } from '../api/firebase/auth';
import { useNavigate } from 'react-router-dom';

const Previewapplication = ({data, closeModal, appid}) => {
    
    const [user, setUser] = useState({
        data : {

            email : "",
            phone : ""
        }
    })

    const INIT_1 = data.firstname.split('')[0].toUpperCase();
    const INIT_2 = data.lastname.split('')[0].toUpperCase();
    const FULLINIT = `${INIT_1}${INIT_2}`;

    var dateSubmitted = data.dateSubmitted.toDate().toDateString()

    const getTheUser = async () => {

        const user = {
            data : {}
        }

        await getAUser(data.uid).then( e => user.data = e )

        return await user

    }

    useEffect(() => {
       
        getTheUser().then(e => setUser(e))
        
    }, []);

    //console.log(user.data.applications.cohort4[0].appUID);

    const Navigate = useNavigate()

    return (

        <div className="previewAppInfo">

            <div className="closePreview" onClick={() => closeModal()}>
                <i className="fi fi-rr-cross"></i>
            </div>

            <div className="photoName">

               <div className="init">{FULLINIT}</div>
               <div className="fullname">{data.firstname} {data.lastname} </div>

            </div>

            <div className="lineTop"></div>

            <div className="userDetails">

                <div className="coreDetail">
                    
                    <div className="icon"> <i className="fi fi-rr-layers"></i> Track</div>
                    {data.track}

                </div>

                <div className="coreDetail">
                    
                    <div className="icon"> <i className="fi fi-rr-calendar"></i> Date Submitted</div>
                    {dateSubmitted}

                </div>

                <div className="coreDetail">
                    
                    <div className="icon"> <i className="fi fi-rr-envelope-download"></i> Email</div>
                    {user.data.email}

                </div>

                <div className="coreDetail">
                    
                    <div className="icon"> <i className="fi fi-rr-call-outgoing"></i> Phone </div>
                    {user.data.phone}

                </div>

                <div className="coreDetail">
                    
                    <div className="icon"> <i className="fi fi-rr-assept-document"></i> Grading </div>
                    {data.avgGrade}%

                </div>

            </div>

            <div className="councilgraded">



            </div>


            <div className="viewApp" onClick={() => Navigate(`/admin/applications/${data.track}/${appid}/view`) } >View Application</div>

        </div>

    );
}

export default Previewapplication;
