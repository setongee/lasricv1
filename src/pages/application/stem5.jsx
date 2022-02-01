import React, {useState, useEffect} from 'react';
import { getApplication } from '../../api/firebase/getApplication';
import './application.scss'
import SethAnimation from '../../components/lottie/seth-animation';
import { updateStemScalabilityApplication } from '../../api/firebase/handleStemSubmits';
import { useLocation } from 'react-router-dom';

const Stem5 = ({currentUser}) => {

    const initialData = {

        adoptionEase: "",
        need: "",
        workAround: ""

    }

    const [form2, setForm2] = useState(initialData);
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

                setForm2(response.data.scalability.data);
                setLoader(false);

            } else {

                setLoader(false)

            }
        });
        
    }, []);

    


    const handleChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        if (g.length > 150) {

            alert('Sorry, you cannot input above 150 words.')

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

        updateStemScalabilityApplication(appid, form2)

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
                                <label htmlFor="">Relevance & Proposition</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">1. Explain how your solution is scalable in one year, three years and five years and what resources will you need to achieve them? </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="howScalable"  onChange={handleChange} value={form2.howScalable}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">2. What is your revenue model to ensure sustainability of this project. How can you sustain your project beyond the initial funding?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="uniqDiff" onChange={handleChange} value={form2.uniqDiff}></textarea>
                            </div>
                            
                            <button className="submitArea" onClick={() => handleSubmit}> Submit & Continue </button>

                        </div>

                        </form>
                    </div>
                
            </div>


        </div>
        
    );
}

export default Stem5;
