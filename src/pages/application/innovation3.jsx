import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updatePropositionApplication  } from '../../api/firebase/handleSubmits';
import { useLocation } from 'react-router-dom';

const Innovation3 = ({currentUser}) => {

    const [form2, setForm2] = useState({});
    const [uploadFiles, setuploadFiles] = useState([])
    const [loader, setLoader] = useState(true);
    const [errors, setErrors] = useState([]);

    const pageDetect = useLocation().pathname
    const callupid = pageDetect.split("/")[3]

    const userid = currentUser.uid;

    const appid = `LASRIC_${callupid}_${userid}`;

    //useeffect important

    useEffect(() => {

        getApplication(appid).then(response => {

            if(response !== null) {

                setForm2(response.data.proposition.data);
                setLoader(false);

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    


    const handleChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        if (g.length > 100) {

            alert('Sorry, you cannot input above 100 words.')

        } else {

            setForm2(data => {

                return {
                  ...data,
                  [id] : value
                }
            })
        } 
        
        console.log(form2)
    
    } 

    const checkRequired = () => {

        console.log("checking required...")

        const inputs = document.querySelectorAll('textarea');

        const inputForm = Array.from(inputs);
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        inputError.length ? alert("errors") : successSubmit();

    }

    const successSubmit = () => {

        updatePropositionApplication(appid, form2)

        console.log("success")
        

    }


    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()
        console.log("handling submit")

    }


    return (

        
        <div className="application innovation">

            {
                loader ? 
                
                (
                
                    <div className="loader">

                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_bujdzzfn.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                    </div>
                
                ) : null
            }

            <div className="wrapper">

                <div className="body-section">

                    <form className='lasric-apply-form' onSubmit={handleSubmit}>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Proposition (how relevant is your offering to your chosen sector?)</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label htmlFor="">
                                    1. What is the value of each customer and sales contract you have right now? How long is each available for?
                                </label>

                                <textarea id="salesVal" rows={5} placeholder="Please Enter..." onChange={handleChange} value = {form2.salesVal} />

                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                2. How is your target market supporting substantial growth / valuation?
                                </label>
                                <textarea
                                id="growthSupport"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.growthSupport}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                3. Who are your target customers and how many do you have now?
                                </label>
                                <textarea
                                id="whoCustomers"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.whoCustomers}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                4. What exactly is the solution your startup is giving to customers?
                                </label>
                                <textarea
                                id="exactSoln"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.exactSoln}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">5. Kindly provide details of any registered intellectual property your startup owns?</label>
                                <textarea
                                id="intelProp"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.intelProp}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                6. Does your startup have a methodology for product development? If so please describe your process.
                                </label>
                                <textarea
                                id="prodMethod"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.prodMethod}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                7. How do you know that your startup brand design and marketing strategy is effective?
                                </label>
                                <textarea
                                id="brandEffective"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.brandEffective}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                8. Who are your principal competitors and what traction do they have? What are the strengths and weaknesses of each competitor?
                                </label>
                                <textarea
                                id="competitors"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.competitors}
                                />
                            </div>

                            <div className="sub-section">
                                <label htmlFor="">
                                9. What channels do you use to engage with your customers? Please describe your use of each channel.
                                </label>
                                <textarea
                                id="custEngagement"
                                rows={5}
                                placeholder="Please Enter..."
                                onChange={handleChange} value = {form2.custEngagement}
                                />
                            </div>
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Innovation3;
