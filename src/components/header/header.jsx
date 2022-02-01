import React from 'react';
import { Link } from "react-router-dom";

//styles import
import './header.scss'

//lasric logo
import LasricLogo from '../../assets/svg/lasric_logo.svg'
import bell from '../../assets/svg/bell.svg'

const Header = ({user}) => {

    const  routes = {
        
        //pages
        home : '/',
        about : '/about',
        council : '/council',
        beneficiaries : '/beneficiaries',

        //auth
        registers : '/register',
        login : '/login',
        dashboard : '/dashboard',
        events : '/events'

    }

    return (

        <div className="header">

            <div className="logo"> 
            
                <img src={LasricLogo} alt="lasric logo" />
            
            </div>

            <div className="menulist">

                <Link to={routes.home}>Home</Link>
                <Link to={routes.about}>About</Link>
                <Link to={routes.council}>Council</Link>

            </div>

            <div className="auth-area">

                <div className="alert">
                    <img src={bell} alt="bell icon" />
                </div>

                {
                    user.uid ? <div className="account">
                        <Link to="/dashboard">Dashboard</Link>
                        <i className="fi fi-rr-angle-small-down"></i>
                    </div> : <div className="account">
                    <Link to="/login">Login</Link>
                    <i className="fi fi-rr-angle-small-down"></i>
                </div>
                }

                <div className="line-div"></div>

                <Link to="/apply" className="act-btn" >Apply</Link>

            </div>

        </div>

    );
}

export default Header;
