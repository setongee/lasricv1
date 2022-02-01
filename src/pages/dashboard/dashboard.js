import React, { useEffect, useState } from 'react';
import './dashboard.scss'
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation'
import { Link } from 'react-router-dom';

const Dashboard = ({currentUser}) => {

   const [user, setUser] = useState({})
   const [app, setApp] = useState({})

   useEffect(() => {
       
    setUser(currentUser)

   }, [user]);

    return (

        <div className="dashboard">
                    <div className="statArea shift">

                    <h1>My Stats</h1>

                    <div className="stats">

                        <div className="stat">
                            <div className="title">Submitted {<br></br>} Applications</div>
                            <div className="stat-value" style={{background : '#25DBA3'}}> { user.applications ? user.applications.cohort4.length : 0} </div>
                        </div>

                        <div className="stat">
                            <div className="title">Successful {<br></br>} Applications</div>
                            <div className="stat-value" style={{background : '#4D53E0'}}>0</div>
                        </div>

                        <div className="stat">
                            <div className="title">Saved {<br></br>} Applications</div>
                            <div className="stat-value" style={{background : '#FFC100'}}>0</div>
                        </div>

                        <div className="stat">
                            <div className="title">Pending {<br></br>} Applications</div>
                            <div className="stat-value" style={{background : '#ff5668'}}>0</div>
                        </div>

                    </div>

                </div>
                
                <div className="listApplications shift">

                    <h1>Applications</h1>

                    <div className="apps">

                        {
                            currentUser.applications.cohort4.length ? currentUser.applications.cohort4.map(data => (


                                <div className="application_card">

                                        <div className="img"> <img src={`${data.track === 'innovation' ? "https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/callups%2Fsearch%20ideas-min.jpg?alt=media&token=ca1e3da9-99ae-4bba-9d28-0624c86b46d6" : "https://firebasestorage.googleapis.com/v0/b/lasricv2.appspot.com/o/callups%2F3682410-min.jpg?alt=media&token=79740201-837d-4a81-9103-0dcaa0c43228" }`} alt="" /> </div>

                                        <div className="contentful">
                                            
                                            <div className="title"> 
                                            
                                            <div className="tagwe">Call Title</div>
                                            LASRIC Y2022 Cohort 4 {data.track.toUpperCase()} CALL-OUT
                                             </div>

                                            <div className="statusApp">

                                            <div className="tagwep">Status</div>
                                                
                                                {`${data.submitted ? 'Submitted' : "Pending"}`}
                                                
                                            </div>

                                            <Link to = {`/application/${data.track}/${data.callUID}/personal`}  className="button viewapp">View Application</Link>
                                        </div>

                                    </div>


                            )) : <div className="empty">
                                <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '500px', height: '500px'}} speed={"1"} />
                            </div>
                        }
                        
                    </div>
                    
                </div>
            </div>

    );
}

export default Dashboard;
