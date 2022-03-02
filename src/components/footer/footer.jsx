import React from 'react';
import './footer.scss'
import { Link, useLocation } from 'react-router-dom';

import LasricLogo from '../../assets/svg/lasric_logo.svg'


const Footer = () => {
    const {pathname} = useLocation();
    return (

        <div className={`footer client_${pathname.split('/')[1]}`}>

            <a href = '/' className="logo-foot"> <img src={LasricLogo} alt="lasric-logo" /></a>

            <div className="links-footer">

                <Link to = '/about'> About </Link>
                <Link to = '/people'> council </Link>
                <Link to='/apply'> Apply </Link>
                <Link to = '/login'> Login </Link>
                <Link to = '/register'> Register </Link>

            </div>
            
        </div>

    );
}

export default Footer;
