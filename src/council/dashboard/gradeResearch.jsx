import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Stemtr from '../../components/tabletr/stemtr';

import { getApplication } from '../../api/firebase/getApplication';
import { updateGrade, getApplicationGrades } from '../../api/firebase/council-applications';

import SethAnimation from '../../components/lottie/seth-animation';

const GradeResearch = ({councilProfile}) => {

    const Navigate = useNavigate()

        console.log("heyyo")

        const formData23 = {

            personal : {

                status : 'completed',
                data : {
                    coResearchers : '',
                    department : '',
                    institution : ""
                }

            },
            project : {

                status : 'pending',
                data : {}

            },
            results : {

                status : 'pending',
                data : {
                    activity : { activity1 : {activity : "", result : ""} }
                }

            },
            budget : {

                status : 'pending',
                data : {
                    activity : { activity1 : {activity : "", result : ""} },
                    budget : { budget1 : {item : "", amount : "", total : ""} }
                }

            }

        }

        const [form2, setForm2] = useState(formData23)
        const pageDetect = useLocation().pathname
        const rip = pageDetect.split("/")[6]

        const [tableTR, setTableTR] = useState({team : []})

        const [score, setScore] = useState({

            personal : '',
            experience : '',
            relevance : '',
            impact : '',
            scalability : ''

        })

        const [loadSubmit, setLoadSubmit] = useState(false)

        useEffect(() => {

            const milk = document.querySelectorAll('textarea');
            const milo = Array.from(milk)

            milo.forEach(e => {
                e.disabled = true
            })

            const select = document.querySelectorAll('select');
            const sect = Array.from(select)

            sect.forEach(e => {
                e.disabled = true
            })

            getApplication(rip).then(response => {

                if(response !== null ) {

                    setForm2(response.data);
                    console.log(response.data);

                }
            });

            //get gradings

            getApplicationGrades(rip)
            .then( data => {

                if (data.length) {

                    const result = data[0].grades[councilProfile.uid].gradings;
                    setScore(result)

                } 
            } )
            
        }, []);


        const handleTableDelete = async (e, val) => {

            const del = document.querySelector(`table #team-row-${e.target.id}`);
            //del.remove();
            form2.team[val].status = 'deleted';
            del.style.display = 'none';
        }


        const handleTeam = (e) => {

            const {name, id, value} = e.target;

            setForm2(data => {

                return {
                ...data,
                team : form2.team ? {...form2.team, [name] : { ...form2.team[name], [id] : value } } : []
                }
            })

        }


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
        
        } 

        const handleGradeChange = (e) => {

            const {id, value} = e.target;
            
            var numbers = /^[-+]?[0-9]+$/;
        
            if (value !== "") {
                
                if (!value.match(numbers)){

                    alert('Please input only numbers to grade application')
                    
                }
            }

            if (value > 20){

                alert('Grade for this area connot be above 20 marks')

            } else {

                setScore(data => {

                    return {
                    ...data,
                    [id] : value
                    }
                })
            }
            

            
    
        }

        const dip = Object.values(score).reduce((a, b) => Number(a) + Number(b));

        const handleSubmitGrade = async () => {

            await updateGrade(rip, dip, councilProfile.uid, score).then(() => Navigate('/council'))

        }



        return (

            <div className="gradingApplication">

                {
                    loadSubmit ? (

                        <div className="loaderScreen">

                        <SethAnimation jsonSrc={"https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />
                        
                    </div>

                    ) : null
                }

                <div className="liveScore">

                    <div className="score">

                            Your Grading

                            <h1>{dip}%</h1>

                    </div>



                    <div className="activity" onClick={()=>handleSubmitGrade()}>
                    Submit Grading
                    </div>

                </div>

                <div className="applicationStem">

                    <div className="application innovation custom-grade">

                        <div className="body-section">

                            <form className='lasric-apply-form gradingPart'>

                                <div className="sections">
                                    
                                    <div className="section">
                                        <label >Personal</label>
                                        <div className="line-section" />
                                    </div>

                                    <div className="sub-section">
                                        <label >1. Institution </label>
                                        <input id="institution" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.institution} />

                                    </div>

                                    <div className="sub-section">
                                        <label >2. Department</label>
                                        <input id="department" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.department} />
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "problem" onChange={handleGradeChange} value = {score.personal} data-max = { Number("5") } />

                                    </div>


                                    <div className="sub-section">

                                        <label>
                                            Co-Researchers (if any)
                                        </label>

                                        <textarea id="coResearchers" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.coResearchers} />
                                    
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "problem" onChange={handleGradeChange} value = {score.coResearchers} data-max = { Number("5") } />
                            
                                    </div>
                                    
                                </div>

                                <div className="sections">
                                    
                                    <div className="section">
                                        <label >Project</label>
                                        <div className="line-section" />
                                    </div>

                                    <div className="sub-section">
                                        <label for="">Project Title </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="projectTitle"  onChange={handleChange} value={form2.project.data.projectTitle}></textarea>
                                    </div>

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "title" onChange={handleGradeChange} value = {score.title} data-max = { Number("10") } />
                            
                                    </div>

                                    <div className="sub-section">
                                        <label for="">Executive Summary</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="executiveSummary" onChange={handleChange} value={form2.project.data.executiveSummary}></textarea>
                                    </div>
                                    
                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "execSummary" onChange={handleGradeChange} value = {score.execSummary} data-max = { Number("10") } />
                            
                                    </div>

                                    <div className="sub-section">
                                        <label for="">Introduction</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="introduction" onChange={handleChange} value={form2.project.data.introduction}></textarea>
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "intro" onChange={handleGradeChange} value = {score.intro} data-max = { Number("5") } />
                            
                                    </div>
                                    

                                    <div className="sub-section">
                                        <label for="">Problem Statement/Justification/Conceptual framework</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="problemStatement" onChange={handleChange} value={form2.project.data.problemStatement}></textarea>
                                    </div>   

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "probState" onChange={handleGradeChange} value = {score.probState} data-max = { Number("5") } />
                            
                                    </div>


                                    <div className="sub-section">
                                        <label for="">Objective(s) of the Study</label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="objectives" onChange={handleChange} value={form2.project.data.objectives}></textarea>
                                    </div>  

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "obj" onChange={handleGradeChange} value = {score.obj} data-max = { Number("5") } />
                            
                                    </div>

                                    <div className="sub-section">
                                        <label for=""> Literature Review </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="literature" onChange={handleChange} value={form2.project.data.literature}></textarea>
                                    </div>  

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 5)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "lite" onChange={handleGradeChange} value = {score.lite} data-max = { Number("5") } />
                            
                                    </div>

                                    <div className="sub-section">
                                        <label for=""> Methodology </label>
                                        <textarea name="" rows="5" placeholder="Please Enter..." id="methodology" onChange={handleChange} value={form2.project.data.methodology}></textarea>
                                    </div> 

                                    <div className="sub-section grade-value">

                                        <label>
                                                <strong>Grade this Area (Max of 10)</strong>
                                        </label>

                                        <input type="text" placeholder = "Enter your Score" id = "meth" onChange={handleGradeChange} value = {score.meth} data-max = { Number("10") } />
                            
                                    </div>
                                    
                                </div> 

                            </form>

                        </div>
                
                    </div>

                    {/* overall grading */}
                            
                    <div>

                        {
                            !score.problem || !score.experience || !score.relevance || !score.impact || !score.scalability === "" ? (

                                <div className="realtimeScore">
                                    <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                                    <div className="submitApplication emppty">Submit Application</div>
                                </div>

                            ) : <div className="realtimeScore">
                                    <div className="score_real">Your Total Grading is  : <strong>{dip}</strong>% </div>
                                    <div className="submitApplication" onClick = { () => { handleSubmitGrade(); setLoadSubmit( true) } }  >Submit Application</div>
                                </div>
                        }
                                
                    </div>
                
                </div>

            </div>

        );
    }

export default GradeResearch;