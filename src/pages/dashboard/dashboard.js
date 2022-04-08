import React, { useEffect, useState } from 'react';
import './dashboard.scss'
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation'
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import LasricLogo from '../../assets/svg/lasric_logo.svg'
import lasricicon from '../../assets/svg/send.svg'
import banner from '../../assets/svg/banner.svg'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../api/firebase/config';

import { signOut, getAuth } from 'firebase/auth';

const Dashboard = ({currentUser}) => {

    let navigate = useNavigate()

    const auth = getAuth()

   const [user, setUser] = useState({});
   const [app, setApp] = useState([]);
   const [submitted, setSubmitted] = useState(0)
   const [showModal, setShowModal] = useState(true);

   const bannerB = () => {

        setShowModal(false);

        var chk = document.getElementById('cheq');

        if(chk.checked){
            shutBanners()
        }

   }

   const shutBanners = () =>{

       localStorage.setItem("banner", true)

   }


   useEffect( async () => {
    
    if (localStorage.getItem("banner")) {
        setShowModal(false)
    } else{
        setShowModal(true)
    }

    setUser(currentUser)

    setApp(currentUser.applications.cohort4);

    const citiesRef = collection(db, "submittedApplications")
    const q = query(citiesRef, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q)

    var arr = []

    querySnapshot.forEach((doc) => {

       arr.push(doc.data());

    });

    setSubmitted(arr.length)

}, [user]);

   const COUNTER = {

    days : 0,
    hrs : 0,
    min : 0,
    sec : 0

    }

    const [countdown, setCounter] = useState(COUNTER);

    var countDownDate = new Date("Mar 9, 2022 10:00:00").getTime();

    var deadineDtae = new Date("Mar 31, 2022 23:59:59").getTime();
    var now = new Date().getTime();
    var distance = deadineDtae - now;
    var remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));




    // setInterval(function() {
        
    // var now = new Date().getTime();

    // var distance = countDownDate - now;

    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // if (distance < 0) {

    //     //clearInterval(x);
    //     console.log('Its Today');

    // }

    // const countdown = {days, hours, minutes, seconds}
    
    // setCounter(countdown)

    // }, 1000);

    const authOut = async () => {

        console.log('Signing Out...')
        await signOut(auth).then(() => navigate('/login') )

    }


    
    return (

        <div className="dashboard">

            <div className="desknotice">

                Hey, kindly use a desktop device or screen to access this page

                <div className="goHome"> <Link to="/">Back to Main Site</Link> </div>

            </div>


            {
                showModal ? 
                
                <div className="barNew">

                    <div className="BABY">

                        <div className="banner">

                            <img src={banner} alt="" />

                        </div>

                        <div className="textArea">

                            Hello {currentUser.firstname},

                            <div className="headerText"> Introducing Dashboard v2.0 </div>

                            <div className="bodyText">
                            We noticed that you had a couple of pain points using the LASRIC dashboard platform and this had reduced your level of information access on the dashboard v1.0

                            {<br></br>} {<br></br>}

                            The LASRIC product team went back to the drawing sheet to make changes to enhance the overall user experience and subsequent areas of the platform will be updated tailored for your optimum experience  
                            </div>


                        </div>

                        <div className="activity">

                            <div className="explore_btn" onClick={ ()=> bannerB() }> Explore v2.0 </div>

                            <div className="checkbox">

                                <input type="checkbox" id = 'cheq'/>
                                Don’t show message again

                            </div>

                        </div>

                    </div>

                </div> 
                
                : null

            }
            

            <div className="menuAreaBar">


                <Link to = '/dashboard' className='dashboard_link active-li'> <i className="fi fi-rr-home"></i> Dashboard  </Link>

                <Link to = '/dashboard/applications' className='dashboard_link'> <i className="fi fi-rr-duplicate"></i> My Applications  </Link>

                <Link to = '/people' className='dashboard_link'> <i className="fi fi-rr-user"></i> Council Members  </Link>

                <Link to = '/about' className='dashboard_link'> <i className="fi fi-rr-e-learning"></i> About Lasric  </Link>

                <Link to = '/apply' className='dashboard_link'> <i className="fi fi-rr-flag"></i> Callups  </Link>

                <Link to = '/gallery' className='dashboard_link'> <i className="fi fi-rr-picture"></i> Gallery  </Link>


                <div className="account-pindrop">

                    <div className="holder-acc">

                        <div className="hold-1"></div>
                        <div className="hold-2"> { currentUser.firstname.split('')[0] }{ currentUser.lastname.split('')[0] }  </div>

                    </div>

                    <p>{currentUser.firstname || ''} {currentUser.lastname || ''}</p>

                </div>


            </div>
                    
            <div className="main-content-dashboard">
               

                <div className="header-dashboard">
                
                    <div className="lasricLogo">
                        <img src={LasricLogo} alt="logo" />
                    </div>

                    <div className="account-place">


                        <div className="main-site">
                            <Link to = '/' className='dashboard_link'> <i className="fi fi-rr-computer"></i> Main Site  </Link>
                        </div>
                        
                        <div className="account_arr">Dashboard</div>
                        <div className="line-arr"></div>
                        <div className="applyNow" onClick={ () => authOut() } > Sign Out </div>

                    </div>
                
                </div>  

                <div className="homeBar">

                    <div className="topBar">

                        <h1>Hello {currentUser.firstname || ''}</h1>
                        <p>Welcome Back!</p>

                    </div>

                    <div className="statBar">

                        <div className="status">

                            <div className="star-head"> Applications</div>
                            <div className="line_star"></div>
                            <div className="value-star"> {app.length} </div>

                        </div>

                        <div className="status">

                            <div className="star-head"> Submitted</div>
                            <div className="line_star"></div>
                            <div className="value-star">{submitted}</div>

                        </div>

                        <div className="status">

                            <div className="star-head"> Accepted </div>
                            <div className="line_star"></div>
                            <div className="value-star">0</div>

                        </div>

                    </div>


                    <div className="eventNews">

                        <div className="headtag">
                            <i className="fi fi-rr-calendar"></i>
                            Upcoming Events
                        </div>

                        <div className="content-news">

                            <div className="dateBar">

                                <div className="day">9</div>
                                <p>mar</p>

                            </div>

                            <div className="details-news">

                                <p>Lasric Webinar</p>

                                <div className="topic"> Startup Funding : The LASRIC Solution <i className="fi fi-rr-small-right"></i>  <a href = 'https://lasric.lagosstate.gov.ng/webinar' target="_blank" >View Details</a> </div>

                                <p className='countdown'> {countdown.days} Days {countdown.hours} Hours {countdown.minutes} Mins {countdown.seconds} Secs  </p>

                            </div>

                        </div>

                    </div>

                    <div className="timeline">

                        <div className="timeline-days">You Have {remainingDays} Days Till Deadline</div>

                        <div className="line-time"></div>

                        <div className="timex">

                            <div className="time t1">

                                <div className="time-content date-content"> February 1, 2022 </div>

                                <div className="ball-line">

                                    <div className="cir"><i className="fi fi-rr-check"></i></div>
                                    <div className="line-cir"></div>

                                </div>

                                <div className="time-content"> Cohort 4 Call for Applications </div>

                            </div>

                            <div className="time t1">

                                <div className="time-content date-content"> March 9, 2022 </div>

                                <div className="ball-line">

                                    <div className="cir"></div>
                                    <div className="line-cir"></div>
                                    
                                </div>

                                <div className="time-content"> LASRIC Webinar, Startup Funding </div>

                            </div>

                            <div className="time t1">

                                <div className="time-content date-content"> March 20, 2022 </div>

                                <div className="ball-line">

                                    <div className="cir"></div>
                                    <div className="line-cir"></div>
                                    
                                </div>

                                <div className="time-content"> Submitted Applications Grading Begins </div>

                            </div>

                            <div className="time t1">

                                <div className="time-content date-content"> March 31, 2022 </div>

                                <div className="ball-line">

                                    <div className="cir"></div>
                                    <div className="line-cir"></div>
                                    
                                </div>

                                <div className="time-content"> Cohort 4 - Innovation & Stem Applications Closed </div>

                            </div>

                        </div>

                    </div>


                    {/* Messages Part */}

                    <div className="messages-inapp">

                        <div className="titleSide">

                            <i className="fi fi-rr-comment"></i>
                           Recent Notifications (2)

                        </div>

                        <div className="data_area">


                            <div className="my-message">

                                <div className="contentful">

                                    <div className="subject">Welcome to LASRIC </div>

                                    <div className="content">
                                        Hi, {currentUser.firstname} i am glad to welcome you on board.
                                        Enhance Lagos with your ideas and innovation today. Apply Today, we are waiting.
                                    </div>

                                    <div className="author">

                                        <div className="pict">
                                            <img src="https://pbs.twimg.com/profile_images/1221390995742449664/OY8kFHGT_400x400.jpg" alt="alake photo" />
                                        </div>

                                       <div className="names">

                                        Tunbosun Alake,
                                            <p>SA, Innovation & Tech, Lagos State</p>

                                       </div>
                                    </div>


                                </div>

                                <div className="contentful">

                                    <img src="" alt="" />

                                    <div className="subject">Introducing Dashboard v2.0 🥁💥 </div>

                                    <div className="content">
                                    The LASRIC product team went back to the drawing sheet to make changes to enhance the overall user experience and subsequent areas of the platform will be updated tailored for your optimum experience  
                                    </div>

                                    <div className="author">

                                        <div className="pict">
                                            <img src={lasricicon} alt="alake photo" />
                                        </div>

                                       <div className="names">

                                        Product Team,
                                            <p>LASRIC</p>

                                       </div>
                                    </div>


                                </div>

                            </div>


                        </div>

                    </div>


                </div>


               
               
            </div>   
                
        </div>

    );
}

export default Dashboard;
