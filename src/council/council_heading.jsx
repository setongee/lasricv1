import React, {useState, useEffect} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

import LasricLogo from '.././assets/svg/lasric_logo.svg'

const CouncilHeading = ({data, uid}) => {

    const authState = getAuth()

    const baseurl = '/council/dashboard/applications'

    const [applicationStats, setApplicationStats] = useState({})
    const [showTrack, setShowTrack] = useState(false);

    useEffect(() => {

        const appData = {

            all : data.length,
            pending : '0',
            graded : '0',
            interviewbucket : '0'
    
        }

        const re = data.filter((e) => {
            return e.grades.hasOwnProperty(uid)
        })

        const int = re.filter(data => data.grades[uid].grade >= 80 )

        appData.pending = Number(appData.all) - Number(re.length);
        appData.graded = Number(re.length);
        appData.interviewbucket = Number(int.length);
        
        setApplicationStats(appData)
        
    }, [data]);

    //console.log(applicationStats);

    return (

        <div className="council_heading">

            <div className="logo-lasric">

                <img src={LasricLogo} alt="lasric logo" />
                
            </div>

            <div className="main-menu">

                <Link to={`${baseurl}/all`}>All Applications - <div className="number"> {applicationStats.all} </div></Link>
                <Link to={`${baseurl}/pending`}>Pending - <div className="number"> {applicationStats.pending} </div></Link>
                <Link to={`${baseurl}/graded`}>Graded - <div className="number"> {applicationStats.graded} </div></Link>
                <Link to={`${baseurl}/interviewbucket`}> Interview Bucket - <div className="number"> {applicationStats.interviewbucket} </div></Link>

            </div>

            <div className="closingPart">

                {/* <div className="callupsID"  > 
                
                    <div className="appsLink" onClick={ () => setShowTrack(!showTrack) }>All Applications <i className="fi fi-rr-angle-down"></i></div>
                    
                    {
                        showTrack ? (

                            <div className="popOut">

                                <li onClick={ () => setShowTrack(!showTrack) } >All Applications</li>
                                <li onClick={ () => setShowTrack(!showTrack) } >Stem Applications</li>
                                <li onClick={ () => setShowTrack(!showTrack) } >Innovation Applications</li>

                            </div>

                        ) : null
                    }

                </div> */}

                

                {/* <div className="shortLine"></div> */}

                <div className="accounts" onClick={ () => { signOut(authState); window.location.reload(); } } >
                    Logout
                </div>

            </div>

        </div>
    );
}

export default CouncilHeading;
