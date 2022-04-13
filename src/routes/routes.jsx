import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'

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
import Redirect from './redirect';

import CouncilLogin from '../council/auth/login';
import CouncilRegister from '../council/auth/register';
import CouncilDashboard from '../council/dashboard/dashboard';
import All from '../council/dashboard/all';
import Pending from '../council/dashboard/pending';
import Graded from '../council/dashboard/graded';
import Gradeapplication from '../council/dashboard/gradeApplication';
import GradeInnovationApplication from '../council/dashboard/gradeInnovationApplication';
import Interview from '../council/dashboard/interview';
import Gallery from '../pages/landing/gallery';

import ApplicationsDash from '../pages/dashboard/applications';

import Admin from '../Admin/admin';
import Bene from './benefi';

const Router = ({user}) => {

    const Navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});

    useEffect( () => {
        
        setCurrentUser(user)
        

    }, [user] );


    return (

        <Routes>

            <Route path = "/"> 


            <Route path = 'register2' element = {<CouncilRegister/>} > </Route>

                <Route index element = {<Landing/>} />
                <Route path = 'about' element = {<About/>} />
                <Route path = 'register' element = {<Register/>} />
                <Route path = 'login' element = {<Login/>} />
                <Route path = 'apply' element = {<Callup/>} />

                <Route path = 'dashboard' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <Dashboard currentUser = {user} /> : <Login/>  }/>
                    
                <Route path = 'dashboard/applications' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <ApplicationsDash currentUser = {user} /> : <Login/>  }/>

                <Route path = 'people' element = {<Council/>} />
                <Route path = 'beneficiaries' element = { <Bene/> } />
                <Route path = 'admin' element = {<Admin/>} />
                <Route path = 'gallery' element = {<Gallery/>} />
                <Route path = 'council' element = {<Redirect navigator = '/council/dashboard/applications/all'/>} />
                {/* <Route path = 'admin' element = {<Redirect navigator = '/council/dashboard/applications/all'/>} /> */}


                <Route path = 'application/innovation/:callid' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <InnovationTitle currentUser = {user} /> : <Login/> }>

                    <Route path = 'personal' element = {<Innovation currentUser = {user} />} />
                    <Route path = 'vision' element = {<Innovation2 currentUser = {user} />} />
                    <Route path = 'proposition' element = {<Innovation3 currentUser = {user}/>} />
                    <Route path = 'organization' element = {<Innovation4 currentUser = {user} />} />
                    <Route path = 'economics' element = {<Innovation5 currentUser = {user}/>} />
                    <Route path = 'milestones' element = {<Innovation6 currentUser = {user}/>} />


                </Route>

                <Route path = 'application/stem/:callid' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <StemTitle currentUser = {user} /> : <Login/>  }>

                    <Route path = 'personal' element = {<Stem1 currentUser = {user} />} />
                    <Route path = 'problem' element = {<Stem2 currentUser = {user} />} />
                    <Route path = 'relevance' element = {<Stem3 currentUser = {user}/>} />
                    <Route path = 'impact' element = {<Stem4 currentUser = {user} />} />
                    <Route path = 'scalability' element = {<Stem5 currentUser = {user}/>} />
                    <Route path = 'experience' element = {<Stem6 currentUser = {user}/>} />


                </Route>

                <Route path = 'council/dashboard/applications' element = { Object.keys(currentUser).length && currentUser.type === "council" ? <CouncilDashboard user = {currentUser}/> : <CouncilLogin/>  } >

                    <Route path = 'all' element = {<All councilProfile = {currentUser}/>} />
                    
                    <Route path = 'pending' element = {<Pending councilProfile = {currentUser}/>} />

                    <Route path = 'graded' element = {<Graded councilProfile = {currentUser}/>} />

                    <Route path = 'interviewbucket' element = {<Interview councilProfile = {currentUser}/>} />

                    <Route path = 'grade/stem/:appid' element = {< Gradeapplication councilProfile = {currentUser} />} />

                    <Route path = 'grade/innovation/:appid' element = {< GradeInnovationApplication councilProfile = {currentUser} />} />

                </Route>
                

            </Route>

        </Routes>

    );
}

export default Router;
