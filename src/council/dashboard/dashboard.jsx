import React, {useEffect} from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import '../councilArea.scss'
import CouncilHeading from '../council_heading';

const CouncilDashboard = ({user}) => {

    const Path = useLocation().pathname.split('/')[1];

    useEffect(() => {

    }, []);

    return (

        <div>

            <CouncilHeading/>

            <div className="nameSpace">

                <p>Welcome Back,</p>

                <h1 className="councilProfile">
                    {user.firstname} {user.lastname}
                </h1>

            </div>
            
            <Outlet/>

        </div>
    );
}

export default CouncilDashboard;
