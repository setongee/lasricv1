import React,{useState} from 'react';
import SethAnimation from '../../components/lottie/seth-animation';
import awardee from '../../assets/svg/aishaRaheem.jpeg'
import play from '../../assets/svg/play.svg'
import './styles.scss'
import partner1 from '../../assets/svg/1.png'
import partner2 from '../../assets/svg/2.png'
import partner3 from '../../assets/svg/3.png'
import partner4 from '../../assets/svg/4.png'
import partner5 from '../../assets/svg/5.png'
import flame from '../../assets/svg/flame.svg'
import web from '../../assets/svg/globe.svg'
import suitcase from '../../assets/svg/briefcase.svg'
import taxi from '../../assets/svg/taxi.svg'
import doctor from '../../assets/svg/doctor.svg'
import music from '../../assets/svg/music.svg'
import secure from '../../assets/svg/secure.svg'
import gradCap from '../../assets/svg/gradCap.svg'
import chart from '../../assets/svg/chart.svg'
import webinar from '../../assets/svg/lasric-live.jpeg'

import { useNavigate } from "react-router-dom";

const Landing = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("")

    //set onChange event for landing email registration

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    //setup when the email from homepage is corrected

    const handleEmailOnlyRegister = async e => {

        e.preventDefault();

        if ( email !== "" ) {
            
            await localStorage.setItem('emailOnly', email);

        }

        await navigate('/register');

    }


    return (


        <div className="landing">

            <div className="homearea darkMode">

                <div className="textArea">

                    <div className="main-text">
                        Pioneer the 🔥 next big idea to enhance lagos.
                    </div>

                    <div className="sub-text">
                        Driving a culture of Innovation, Science & Technology Research in Lagos and beyond. We invest and enable tomorrow's industries.
                    </div>
                    
                    <div className="lasric-form">

                        <h1>Get Started Today.</h1>

                        <form className="getstarted" onSubmit = {handleEmailOnlyRegister} >

                            <input type="email" placeholder='Enter your email address' onChange={handleChange} />
                            <button type='submit'> Register </button>
                            
                        </form>

                    </div>

                    <div className="awardee-action" onClick={ () => navigate('/gallery') }>

                        <div className="pulse">

                            <div className="blop"></div>
                            <div className="solid"></div>
                            <div className="playbtn"> <img src={play} alt="play button" /> </div>

                        </div>

                        <div className="inform">

                            <h1>Awardee Stories</h1>
                            <p>Watch the inspiring stories of different awardees on the impact of lasric.</p>

                        </div>


                    </div>

                </div>

                <div className="right-landing">

                    <div className="photo-awardee">

                        <img src={awardee} alt="Lasric - awardee photo" />
                                            
                    </div>

                    <div className="anim-lottie">
                        <SethAnimation jsonSrc={"https://assets3.lottiefiles.com/packages/lf20_5rnhdawe.json"} lottieStyle = {{width: '670px', height: '670px'}} speed={"1"} />
                    </div>

                    <div className="side-info">
                        “LASRIC provides the network access that is needed…”

                        <div className="awardee-author">
                        Aisha Raheem, {<br></br>} CEO/Co-Founder <strong>Farmz2u</strong>
                        </div>

                    </div>

                </div>

            </div>

            <div className="partners">

                <p>Our Trusted Partners</p>

                <div className="logos">

                    <div className="log"> <img src={partner1} alt="logo partner" /> </div>
                    <div className="log"> <img src={partner2} alt="logo partner" /> </div>
                    <div className="log"> <img src={partner3} alt="logo partner" /> </div>
                    <div className="log"> <img src={partner5} alt="logo partner" /> </div>

                </div>

            </div>

            <div className="videoplayer">

                <div className="text">

                    <div className="start">Live Webinar</div>
                    <div className="lasric_solution">Startup Funding : The LASRIC Solution</div>

                    <div className="linktoweb">To apply click <a href="#" target="_blank"> here </a></div>

                </div>

                <div className="player">
                    <img src={webinar} alt="" />
                </div>

            </div>

            <div className="build">

                <div className="tip">

                    <h1>Design your ideas, become the change Lagos needs.</h1>
                    <p>Be the next inspired technology/research team in 2020 with innovative ideas that can change Lagos State and Africa at large that are future-ready.</p>

                </div>

                <div className="anim-lottie">

                    <SethAnimation jsonSrc={"https://assets5.lottiefiles.com/private_files/lf30_gcroxmlt.json"} lottieStyle = {{width: '600px', height: '600px'}} speed={"1"} />

                </div>

            </div>

            <div className="featuredTech">

                <div className="title">Featured Tech {<br></br>} Startup of the month</div>
                
                <div className="photo"> <img src="https://lasric.lagosstate.gov.ng/assets/img/featured/startup_5fdaaf67d24e5.png" alt="lasric featured tech startup" /> </div>

                <div className="info-actions">

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={suitcase} alt="icon packs" /> </div> Company</div>
                        <div className="comapany_name">Farmz2u</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={flame} alt="icon packs" /> </div> Sector</div>
                        <div className="comapany_name">Agriculture</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={web} alt="icon packs" /> </div> Website</div>
                        <div className="comapany_name"> <a href="https://www.farmz2u.com/" target="_blank" >www.farmz.com.ng</a> </div>
                    </div>
                    

                </div>

                <div className="body-text">
                    Farmz2U is an award-winning enterprise that helps farmers farm better with tailored agricultural expertise using data, and access to the market through system integrations. For instance, using soil composition to determine how much fertilizer a farmer should apply, or helping farmers get capital through invoice discounting. Our solution focuses on using technology to support farmers’ activities end-to-end. It is mobile accessible and farmers without access to smartphones can still access some services with USSD codes. Services: Farmers Support and Market Access.
                </div>

            </div>

            <div className="applyA">
                <h1>Apply today in a few simple steps</h1>
                <div className="applybtn">Apply Now</div>
            </div>

            <div className="themes">

                <h1> The Lagos State Cardinal Focus Point </h1>
                
                <div className="cardArea">

                    <div className="theme-card t">

                        <div className="abbrv"> T </div>
                        <div className="iconify"> <img src={taxi} alt="themes_icon" /> </div>
                        <div className="textin">Traffic Management {<br></br>} and Transportation</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> H </div>
                        <div className="iconify"> <img src={doctor} alt="themes_icon" /> </div>
                        <div className="textin">Health and {<br></br>} Environment</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={gradCap} alt="themes_icon" /> </div>
                        <div className="textin">Education and {<br></br>} Technology </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> M </div>
                        <div className="iconify"> <img src={chart} alt="themes_icon" /> </div>
                        <div className="textin"> Making Lagos a {<br></br>} 21st Century Economy </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={music} alt="themes_icon" /> </div>
                        <div className="textin"> Entertainment {<br></br>} and Tourism </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> S </div>
                        <div className="iconify"> <img src={secure} alt="themes_icon" /> </div>
                        <div className="textin"> Security and {<br></br>} Governance </div>

                    </div>

                </div>

            </div>

        </div>


    );
}

export default Landing;
