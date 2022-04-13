import React from 'react';
import SethAnimation from '../../components/lottie/seth-animation';

const areasData = [
    
    {
        heading : 'Agriculture',
        img : "https://assets7.lottiefiles.com/packages/lf20_0xbu1xfo.json",
        p : 'Food Security, Water conservation, Traditional Botanical and Medicinal knowledge. '
    },

    {
        heading : 'Tourism',
        img : "https://assets5.lottiefiles.com/packages/lf20_x9h8ar8l.json",
        p : 'Media and Creative industry, Hospitality and Tourism, Sports, Entertainment, Transportation '
    },

    {
        heading : 'Housing and Health',
        img : "https://assets10.lottiefiles.com/packages/lf20_a3ntzciy.json",
        p : 'Housing, Energy, Land Use, Urbanization and Habitable cities, Manufacturing, Healthcare '
    },

    {
        heading : 'Environment',
        img : "https://assets3.lottiefiles.com/datafiles/dc49lw7cOTLEo6y/data.json",
        p : 'Climate change, Food security, water conservation and Flood Management, Materials'
    },

    {
        heading : 'Education',
        img : "https://assets6.lottiefiles.com/packages/lf20_k4gmdjfp.json",
        p : 'Learning Solutions, Skills development, and digital transformation literacy.'
    },

    {
        heading : 'Security',
        img : "https://assets2.lottiefiles.com/packages/lf20_jzpjbmvd.json",
        p : 'Security, Information and Communication Technology, Energy'
    },

    {
        heading : 'Financial Inclusion',
        img : "https://assets1.lottiefiles.com/private_files/lf30_zgs2uxra.json",
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    },

    {
        heading : 'Transportation',
        img : "https://assets3.lottiefiles.com/private_files/lf30_bhgw5v82.json",
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    },

    {
        heading : 'Energy & Power',
        img : "https://assets2.lottiefiles.com/packages/lf20_qtgnjnam.json",
        p : 'Access to bank facilities, thrift societies and other Financial solutions'
    }

]

const About = () => {
    return (

        <div className="about">

            <div className="head-area">
                On a mission empower <span> research and innovation initiatives </span> by supporting through funding and network access.
            </div>

            <div className="subhead">
            Being one of the largest megacities in the world, Lagos is on the road to being a smart city. The Existential challenge it faces requires a rapid acceleration of socio-economic development across all sectors. Research and innovation remain key drivers of development, LASRIC is on a mission to enable the fundamental levers of the research, development, and innovation ecosystem.

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
                                <SethAnimation jsonSrc={data.img} lottieStyle = {{width: '100px', height: '100px'}} speed={"1"} />

                            </div>

                            <p> {data.p} </p>

                        </div>

                            )
                        )
                    }


                </div>

            </div>


            <div className="whygive">

                <h1> Why do we give funding? </h1>

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
