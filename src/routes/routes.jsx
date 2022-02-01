import React,{useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'

import Landing from '../pages/landing/landing';
import About from '../pages/landing/about';
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import Callup from '../pages/landing/callup';
import Dashboard from '../pages/dashboard/dashboard';

import Innovation from '../pages/application/innovation';
import Innovation2 from '../pages/application/innovation2';
import Innovation3 from '../pages/application/innovation3';
import Innovation4 from '../pages/application/innovation4';
import Innovation5 from '../pages/application/innovation5';
import Innovation6 from '../pages/application/innovation6';

import Stem1 from '../pages/application/stem1';
import Stem2 from '../pages/application/stem2';
import Stem3 from '../pages/application/stem3';
import Stem4 from '../pages/application/stem4';
import Stem5 from '../pages/application/stem5';
import Stem6 from '../pages/application/stem6';

import StemTitle from '../pages/application/stemTitle';
import InnovationTitle from '../pages/application/innovation-title';

import Council from './council';



const Router = ({user}) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        
        setCurrentUser(user)

    }, [user]);

    return (

        <Routes>

            <Route path = "/"> 

                <Route index element = {<Landing/>} />
                <Route path = 'about' element = {<About/>} />
                <Route path = 'register' element = {<Register/>} />
                <Route path = 'login' element = {<Login/>} />
                <Route path = 'apply' element = {<Callup/>} />
                <Route path = 'dashboard' element = { Object.keys(currentUser).length ? <Dashboard currentUser = {user} /> : <Login/>  } />
                <Route path = 'council' element = {<Council/>} />


                <Route path = 'application/innovation/:callid' element = { Object.keys(currentUser).length ? <InnovationTitle currentUser = {user} /> : <Login/>  }>

                    <Route path = 'personal' element = {<Innovation currentUser = {user} />} />
                    <Route path = 'vision' element = {<Innovation2 currentUser = {user} />} />
                    <Route path = 'proposition' element = {<Innovation3 currentUser = {user}/>} />
                    <Route path = 'organization' element = {<Innovation4 currentUser = {user} />} />
                    <Route path = 'economics' element = {<Innovation5 currentUser = {user}/>} />
                    <Route path = 'milestones' element = {<Innovation6 currentUser = {user}/>} />


                </Route>

                <Route path = 'application/stem/:callid' element = { Object.keys(currentUser).length ? <StemTitle currentUser = {user} /> : <Login/>  }>

                    <Route path = 'personal' element = {<Stem1 currentUser = {user} />} />
                    <Route path = 'problem' element = {<Stem2 currentUser = {user} />} />
                    <Route path = 'relevance' element = {<Stem3 currentUser = {user}/>} />
                    <Route path = 'impact' element = {<Stem4 currentUser = {user} />} />
                    <Route path = 'scalability' element = {<Stem5 currentUser = {user}/>} />
                    <Route path = 'experience' element = {<Stem6 currentUser = {user}/>} />


                </Route>
                

            </Route>

        </Routes>

    );
}

export default Router;
