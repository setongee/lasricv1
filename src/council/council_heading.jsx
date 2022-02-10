import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

import LasricLogo from '.././assets/svg/lasric_logo.svg'

const CouncilHeading = () => {

    const Navigate = useNavigate()

    const authState = getAuth()

    const baseurl = '/council/dashboard/applications'

    return (

        <div className="council_heading">

            <div className="logo-lasric">

                <img src={LasricLogo} alt="lasric logo" />
                
            </div>

            <div className="main-menu">

                <Link to={`${baseurl}/all`}>All Applications - <div className="number"> 0</div></Link>
                <Link to={`${baseurl}/pending`}>Pending - <div className="number"> 0</div></Link>
                <Link to={`${baseurl}/graded`}>Graded - <div className="number"> 0</div></Link>
                <Link to={`${baseurl}/interviewbucket`}> Interview Bucket - <div className="number"> 0</div></Link>

            </div>

            <div className="closingPart">

                <div className="callupsID"> Stem Applications </div>

                <div className="shortLine"></div>

                <div className="accounts" onClick={ () => { signOut(authState); window.location.reload(); } } >
                    Logout
                </div>

            </div>

        </div>
    );
}

export default CouncilHeading;
