import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";

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

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    const {pathname} = useLocation();

    useEffect(() => {
        setIsBurgerOpen(false)
    }, [pathname]);

    return (

    <div className="reg">

    {/* // Mobile support */}
    
    <div className="header desktop">

        <div className="logo"> 
        
            <img src={LasricLogo} alt="lasric logo" />
        
        </div>

        <div className="menulist">

            <Link to={routes.home}>Home</Link>
            <Link to={routes.about}>About</Link>
            <Link to={routes.council}>Council</Link>

        </div>

        <div className="auth-area">

            {
                user.uid && user.uid !== undefined ? <div className="account">
                    <Link to="/dashboard">Dashboard</Link>
                    <i className="fi fi-rr-angle-small-down"></i>
                </div> : <div className="account">
                <Link to="/login">Login</Link>
                <i className="fi fi-rr-angle-small-down"></i>
            </div>
            }

            <div className="line-div"></div>

            <Link to="/apply" className="act-btn" >Apply </Link>

        </div>

    </div>

        <div className="header mobile">

            <div className="logo"> 
            
                <img src={LasricLogo} alt="lasric logo" />
            
            </div>

            <div className="menuicon" onClick={() => setIsBurgerOpen(true)}>
                <i className="fi fi-rr-menu-burger"></i>
            </div>



            {
                isBurgerOpen ? (

                    <div className="menu">

            <div className="menuicon" onClick={() => setIsBurgerOpen(false)}>
                <i className="fi fi-rr-menu-burger"></i>
            </div>

                <div className="menulist">

                <Link to={routes.home}>Home</Link>
                <Link to={routes.about}>About</Link>
                <Link to={routes.council}>Council</Link>

                </div>

                <div className="auth-area">

                    {
                        user.uid && user.uid !== undefined ? <div className="account">
                            <Link to="/dashboard">Dashboard</Link>
                            <i className="fi fi-rr-angle-small-down"></i>
                        </div> : <div className="account">
                        <Link to="/login">Login</Link>
                        <i className="fi fi-rr-angle-small-down"></i>
                    </div>
                    }

                    <div className="line-div"></div>

                    <Link to="/apply" className="act-btn" >Apply </Link>

                </div>

            </div>

                ) : null
            }

        </div>
        
    </div>

    );
}

export default Header;
