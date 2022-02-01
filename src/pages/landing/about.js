import React from 'react';

import agric from '../../assets/svg/agric.png'
import health from '../../assets/svg/health.png'
import padlock from '../../assets/svg/padlock.png'
import tourism from '../../assets/svg/tourism.png'
import environ from '../../assets/svg/environ.png'
import edu from '../../assets/svg/edu.png'
import finance from '../../assets/svg/finance.png'

import SethAnimation from '../../components/lottie/seth-animation';

const areasData = [
    
    {
        heading : 'Agriculture',
        img : agric,
        p : 'Food Security, Water conservation, Traditional Botanical and Medicinal knowledge. '
    },

    {
        heading : 'Tourism',
        img : tourism,
        p : 'Media and Creative industry, Hospitality and Tourism, Sports, Entertainment, Transportation '
    },

    {
        heading : 'Housing and Health',
        img : health,
        p : 'Housing, Energy, Land Use, Urbanization and Habitable cities, Manufacturing, Healthcare '
    },

    {
        heading : 'Environment',
        img : environ,
        p : 'Climate change, Food security, water conservation and Flood Management, Materials'
    },

    {
        heading : 'Education',
        img : edu,
        p : 'Learning Solutions, Skills development, and digital transformation literacy.'
    },

    {
        heading : 'Security',
        img : padlock,
        p : 'Security, Information and Communication Technology, Energy'
    },

    {
        heading : 'Financial Inclusion',
        img : finance,
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    }

]

const About = () => {
    return (

        <div className="about">

            <div className="head-area">
                On a mission to empower several <span>research and innovation</span> initiatives by empowering with grants.
            </div>

            <div className="subhead">
                As Lagos, a megacity gears towards a smart city, there is need to accelerate the pace of development with the increasing population to sustain its place as a major contributor to the GDP and economic focal point of Nigeria. Research and innovation remain key drivers of development, hence Lagos is on a mission to empower several research and innovation initiatives by empowering them with grants. 
            </div>

            <div className="line-tap">
                <div className="pint"></div>
                <div className="pint"></div>
            </div>

            <div className="vision-mission">
                <div className="vision">
                    <div className="h1">Our Vision</div>
                    <p>To make Lagos State one of the world’s knowledge hubs through the application of Science and Technology</p>
                </div>

                <div className="mission">
                    <div className="h1">Our Mission</div>
                    <p>Creating wealth, growth and tackling societal challenges in Lagos State through the application of Science and Technology in a knowledge driven world</p>
                </div>
            </div>

            <div className="headInterest">

                <h1>Ideas we are interested in</h1>

                <div className="areas">

                    {
                        areasData.map(data => (

                        <div className="area">

                            <div className="tag-part">

                                <div className="AREA"> {data.heading} </div>
                                <div className="area-icon"> <img src={data.img} alt="area icon" /> </div>

                            </div>

                            <p> {data.p} </p>

                        </div>

                            )
                        )
                    }


                </div>

            </div>


            <div className="whygive">

                <h1>Why we give grants?</h1>

                <div className="reason">

                    <div className="content">

                        <div className="heading"> 1. Harness Potentials. </div>
                        <p>
                            Harness the potentials and ingenuity of Lagosians to address the challenges faced by the State through Science and Technology, thereby creating wealth and escalating socio-economic development 
                        </p>

                    </div>

                    <div className="anim_a">

                        <SethAnimation jsonSrc={"https://assets1.lottiefiles.com/packages/lf20_doyhajlr.json"} lottieStyle = {{width: '480px', height: '480px'}} speed={"1"} />

                    </div>

                </div>

                <div className="reason">

                    <div className="anim_a">

                        <SethAnimation jsonSrc={"https://assets6.lottiefiles.com/packages/lf20_2uvh7uv0.json"} lottieStyle = {{width: '480px', height: '480px'}} speed={"1"} />

                    </div>

                    <div className="content">

                        <div className="heading"> 2.Promote Sustainability. </div>
                        <p>
                            Promote sustainability of science by boosting the teaching and learning of science at the elementary, secondary and tertiary institutions of learning.
                        </p>

                    </div>

                    

                </div>
                
                <div className="reason">

                    <div className="content">

                        <div className="heading"> 3. Boost Economic Growth. </div>
                        <p>
                            Empower more entrepreneurs, create more jobs.
                        </p>

                    </div>

                    <div className="anim_a">

                        <SethAnimation jsonSrc={"https://assets3.lottiefiles.com/packages/lf20_S2eIOQ.json"} lottieStyle = {{width: '480px', height: '480px'}} speed={"1"} />

                    </div>

                </div>



            </div>


        </div>

    );
}

export default About;
