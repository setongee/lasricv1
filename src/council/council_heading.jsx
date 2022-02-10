import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import LasricLogo from '.././assets/svg/lasric_logo.svg'

const CouncilHeading = () => {

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

                <div className="accounts">
                    Logout
                </div>

            </div>

        </div>
    );
}

export default CouncilHeading;
