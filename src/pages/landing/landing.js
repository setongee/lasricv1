import React,{useState, useEffect} from 'react';
import SethAnimation from '../../components/lottie/seth-animation';
import awardee from '../../assets/svg/awardee.jpg'
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
import { getCMSData } from '../../api/firebase/admin/cms';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import { useNavigate } from "react-router-dom";

const Landing = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [techStartUp, setTechStartUp] = useState({

        image : "https://bit.ly/3n7lmfR",
        company : "",
        web : "",
        content : "",
        sector : ""

    });

    console.log(techStartUp.web)

    const [editorState, setEditorState] = useState("");

    useEffect(() => {

        if (techStartUp.content === "") {

            setEditorState(EditorState.createEmpty())

        } else {

            setEditorState(EditorState.createWithContent(convertFromRaw(techStartUp.content) ))
        }

    }, [techStartUp]);

    const injectContent = () => {

        const raw = convertToRaw( editorState.getCurrentContent() )
        const may = draftToHtml(raw)
        const result = document.getElementById('result');
        result.innerHTML = may  

    }

    if (techStartUp.content !== "") {
        injectContent()
    }


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


    useEffect(() => {

        async function fetchData() {

          const response = await getCMSData("landing");

          setTechStartUp(response)

        }

        fetchData();

      }, []); // 


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
                        “LASRIC believes in growing modern startups to scale, pricepally benefits from this belief...”

                        <div className="awardee-author">
                        Luther Lawoyin, {<br></br>} CEO <strong>Pricepally</strong>
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

            {/* <div className="videoplayer">

                <div className="text">

                    <div className="start">Live Webinar</div>
                    <div className="lasric_solution">Startup Funding : The LASRIC Solution</div>

                    <div className="linktoweb">To apply click <a href="#" target="_blank"> here </a></div>

                </div>

                <div className="player">
                    <img src={webinar} alt="" />
                </div>

            </div> */}

            <div className="build">

                <div className="tip">

                    <h1>Design & Build your ideas, become the value creator Lagos needs.</h1>
                    <p>Be the next inspired technology/research team in 2022 with innovative ideas & Future-ready solutions that can change Lagos and Africa by extension. </p>

                </div>

                <div className="anim-lottie">

                    <SethAnimation jsonSrc={"https://assets5.lottiefiles.com/private_files/lf30_gcroxmlt.json"} lottieStyle = {{width: '600px', height: '600px'}} speed={"1"} />

                </div>

            </div>

            <div className="featuredTech">

                <div className="title">Featured Tech {<br></br>} Startup of the month</div>
                
                <div className="photo"> <img src={techStartUp.image} alt="lasric featured tech startup" /> </div>

                <div className="info-actions">

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={suitcase} alt="icon packs" /> </div> Company</div>
                        <div className="comapany_name">{techStartUp.company}</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={flame} alt="icon packs" /> </div> Sector</div>
                        <div className="comapany_name">{techStartUp.sector}</div>
                    </div>

                    <div className="line-space"></div>

                    <div className="info">
                        <div className="heading"> <div className="icon-A"> <img src={web} alt="icon packs" /> </div> Website</div>
                        <div className="comapany_name"> <a href={techStartUp.web} target="_blank" >{techStartUp.web}</a> </div>
                    </div>
                    

                </div>

                <div className="body-text" id='result'></div>

            </div>

            <div className="applyA">
                <h1>Apply today in a few simple steps</h1>
                <a href='/apply' className="applybtn" style={{color: 'white'}} >Apply Now</a>
            </div>

            <div className="themes">

                <h1> The Lagos State Cardinal {<br></br>} Focus Point. </h1>
                
                <div className="cardArea">

                    <div className="theme-card t">

                        <div className="abbrv"> T </div>
                        <div className="iconify"> <img src={taxi} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Traffic Management {<br></br>} and Transportation</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> H </div>
                        <div className="iconify"> <img src={doctor} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Health and {<br></br>} Environment</div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={gradCap} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin">Education and {<br></br>} Technology </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> M </div>
                        <div className="iconify"> <img src={chart} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Making Lagos a {<br></br>} 21st Century Economy </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> E </div>
                        <div className="iconify"> <img src={music} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Entertainment {<br></br>} and Tourism </div>

                    </div>

                    <div className="theme-card t">

                        <div className="abbrv"> S </div>
                        <div className="iconify"> <img src={secure} alt="themes_icon" /> <div className="plop"></div> </div>
                        <div className="textin"> Security and {<br></br>} Governance </div>

                    </div>

                </div>

            </div>

        </div>


    );
}

export default Landing;
