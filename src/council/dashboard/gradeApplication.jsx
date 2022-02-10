import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Stemtr from '../../components/tabletr/stemtr';

import { getApplication } from '../../api/firebase/getApplication';
import { updateGrade } from '../../api/firebase/council-applications';

const Gradeapplication = ({councilProfile}) => {

const Navigate = useNavigate()

    const formData23 = {

        personal : {

            status : 'completed',
            data : {
                companyName : '',
                keyArea : '',
                stemTitle : "",
                trackSuccess : ''

            }

        },
        problem : {

            status : 'pending',
            data : {
                adoptionEase: "",
                need: "",
                workAround: ""
            }

        },
        relevance : {

            status : 'pending',
            data : {
                relevance : '',
                exactSoln: '',
                targetCustomers : ''
            }

        },
        impact : {

            status : 'pending',
            data : {
                missionDrive : '',
                impact : ''
            }

        },
        scalability : {

            status : 'pending',
            data : {
                howScalable : '',
                uniqDiff : ""
            }

        },
        experience : {

            status : 'pending',
            data : {
                team: { team1 : { name: '', response : '', role: ''}},
                experience : ''
            }

        },

    }

    const [form2, setForm2] = useState(formData23)
    const pageDetect = useLocation().pathname
    const rip = pageDetect.split("/")[5]

    const [tableTR, setTableTR] = useState({team : []})

    console.log(rip);


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

        console.log(milo);

        getApplication(rip).then(response => {

            if(response !== null ) {

                setForm2(response.data);

            }
        });
        
    }, []);

    console.log();

    const addTableTR = (e, key) => {

        e.preventDefault();

        const {name, id, value} = e.target;

        const gh = Object.keys(form2.team).length

        const newKey = `team${gh+1}`

        setForm2(data => {

            return {
              ...data,
              team : form2.team ? {...form2.team, [newKey] : {name : '', role : '', response : "", linkedin : "" } } : []
            }
        })
        

    }

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


    const [gradeScr, setGradeScr] = useState(0)

    const [score, setScore] = useState({

        personal : 0,
        experience : 0,
        relevence : 0,
        impact : 0,
        scalability : 0

    })

    const handleGradeChange = (e) => {

        const {id, value} = e.target;
        const g = value.split(" ");

        

        setScore(data => {

            return {
              ...data,
              [id] : Number(value)
            }
        })
  
    }

    const dip = Object.values(score).reduce((a, b) => a + b);


    const handleSubmitGrade = async () => {

        await updateGrade(rip, dip, councilProfile.uid).then(() => Navigate('/council'))

    }



    return (

        <div className="gradingApplication">

           <div className="liveScore">

               {/* <div className="user-profile">
                    <div className="init">DK</div>
                    <h4>Doyin Kayode</h4>
               </div> */}

               <div className="score">

                    Your Grading

                    <h1>{dip}%</h1>

               </div>



               <div className="activity" onClick={()=>handleSubmitGrade()}>
               Submit Grading
               </div>

           </div>

           <div className="applicationStem">



               {/* PERSONAL */}


                <div className="application innovation">


                    <div className="wrapper council-wrap showSheet" id='personal'>

                        <div className="body-section">

                            <form className='lasric-apply-form gradingPart'>

                                <div className="sections">
                                    
                                    <div className="section">
                                        <label htmlFor="">Personal</label>
                                        <div className="line-section" />
                                    </div>

                                    <div className="sub-section">

                                        <label htmlFor="">
                                            1. How do you intend to track your progression to success over time?
                                        </label>

                                        <textarea id="trackSuccess" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.trackSuccess} />

                                    </div>

                                    <div className="sub-section">

                                        <label htmlFor="">
                                        Company Name
                                        </label>

                                        <textarea id="companyName" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.companyName} />

                                    </div>

                                    <div className="sub-section">

                                        <label htmlFor="">
                                        What is the Title of your STEM Solution (50 words)
                                        </label>

                                        <textarea id="stemTitle" rows={5} placeholder="Please Enter..." onChange={handleChange} required value = {form2.personal.data.stemTitle} />

                                    </div>

                                    <div className="sub-section">

                                        <label for="">Which of these key areas does your solution target?</label>

                                        <select name="" id="keyArea" required  value = {form2.personal.data.keyArea} onChange={handleChange}>
                                            <option value="None">----------Select----------</option>
                                            <option value="STEM for Teachers (including teachers training)">STEM for Teachers (including teachers training)</option>
                                            <option value="Demystifying STEM – Early learners (up to Primary Schools)">Demystifying STEM – Early learners (up to Primary Schools)</option>
                                            <option value="Demystifying STEM – Secondary Schools / Teenagers">Demystifying STEM – Secondary Schools / Teenagers</option>
                                            <option value="STEM for Out of School Youth">STEM for Out of School Youth </option>
                                            <option value="STEM Content made easy">STEM Content made easy</option>
                                            <option value="Technology application in STEM">Technology application in STEM</option>
                                        </select>

                                    </div>

                                    <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "personal" onChange={handleGradeChange}/>

                                    </div>
                                    

                                </div>

                                </form>
                            </div>

                <div className="body-section">

                    <form className='lasric-apply-form gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Problem, Solution & Adoptability</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">1. What is the problem/need of your target customer/user that you are trying to solve? (150 words maximum) </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="need"  onChange={handleChange} value={form2.problem.data.need}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">2. What are people doing, and how is your solution different?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="workAround" onChange={handleChange} value={form2.problem.data.workAround}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">3. Please explain how easy it is to adopt your solution by learners (150 words)</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="adoptionEase" onChange={handleChange} value={form2.problem.data.adoptionEase}></textarea>
                            </div>   

                            <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "problem" onChange={handleGradeChange}  />

                                    </div>
                            

                        </div>
                        

                        </form>
                    </div>




                
            </div>


            <div className="body-section">

                    <form className='lasric-apply-form gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Relevance & Proposition</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">1. How relevant is your solution to the LASRIC focus area(s) you’ve selected above? </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="relevance"  onChange={handleChange} value={form2.relevance.data.relevance}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">2. Explain your value proposition?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="exactSoln" onChange={handleChange} value={form2.relevance.data.exactSoln}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">3. Who are your target customers and how many do you have now?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="targetCustomers" onChange={handleChange} value={form2.relevance.data.targetCustomers}></textarea>
                            </div>   
                            
                            <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "relevance" onChange={handleGradeChange}  />

                                    </div>
                            

                        </div>

                        </form>
                    </div>
                


                    

                        
                 </div>

                 <div className="body-section">

                    <form className='lasric-apply-form gradingPart'>

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Impact</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">
                                <label for="">1. Explain the impact your solution brings to Lagos state. With 5 million Naira, how many people can be reached over one year. </label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="missionDrive"  onChange={handleChange} value={form2.impact.data.missionDrive}></textarea>
                            </div>

                            <div className="sub-section">
                                <label for="">2. What is the ripple effect of your solution?</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="impact" onChange={handleChange} value={form2.impact.data.impact}></textarea>
                            </div>
                            
                            <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "impact" onChange={handleGradeChange}  />

                                    </div>

                        </div>

                        </form>
                    </div>
                



                    <div className="body-section">

<form className='lasric-apply-form gradingPart' >

    <div className="sections">
        
        <div className="section">
            <label htmlFor="">Scalability</label>
            <div className="line-section" />
        </div>

        <div className="sub-section">
            <label for="">1. Explain how your solution is scalable in one year, three years and five years and what resources will you need to achieve them? </label>
            <textarea name="" rows="5" placeholder="Please Enter..." id="howScalable"  onChange={handleChange} value={form2.scalability.data.howScalable}></textarea>
        </div>

        <div className="sub-section">
            <label for="">2. What is your revenue model to ensure sustainability of this project. How can you sustain your project beyond the initial funding?</label>
            <textarea name="" rows="5" placeholder="Please Enter..." id="uniqDiff" onChange={handleChange} value={form2.scalability.data.uniqDiff}></textarea>
        </div>
        <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "scalability" onChange={handleGradeChange}  />

                                    </div>

    </div>

    </form>
</div>


<div className="body-section">

                    <form className='lasric-apply-form gradingPart' >

                        <div className="sections">
                            
                            <div className="section">
                                <label htmlFor="">Experience</label>
                                <div className="line-section" />
                            </div>

                            <div className="sub-section">

                                <label>
                                1. How many people are on your team? What is each person’s role and what are their responsibilities? (Add LinkedIn Profile Link for each)
                                </label>
                                
                                <table className="team-table" style = { {border:'none'} } > 

                                    <tr>
                                        <th>Team Member</th>
                                        <th>Role</th>
                                        <th>Responsibilities</th>
                                        <th>Responsibilities</th>
                                    </tr>
                                    
                                    <tr className="team-table-row team-table-row-1">

                                        <td> <input name = "team1" required type="text" id="name" onChange={handleTeam}  value = {form2.experience.data.team.team1.name} />  </td>
                                        <td> <input name = "team1" required type="text" id="role" onChange={handleTeam} value = {form2.experience.data.team.team1.role} /> </td>
                                        <td> <input name = "team1" required type="text" id="response" onChange={handleTeam} value = {form2.experience.data.team.team1.response} /> </td>
                                        <td> <input name = "team1" required type="text" id="linkedin" onChange={handleTeam} value = {form2.experience.data.team.team1.linkedin} /> </td>

                                        <td style={{width:'10%', textAlign : 'center', padding :0, border:'none' }}> </td>

                                    </tr>

                                    {
                                        Object.keys(form2.experience.data.team).length > 1 && tableTR.team.length == 0 ? Object.keys(form2.experience.data.team).map( (team, index) => {
                                            if(index === 0) {
                                                return null
                                            } else {
                                                return <Stemtr deleted = {handleTableDelete} customName="team" data = {form2.experience.data.team} bill = {team} index = {index} key = {index} change = {handleTeam} />
                                            }
                                        } ) : null
                                    }
            
                                </table>

                            </div>

                            <div className="sub-section">
                                <label for="">2. Explain the experience you /your team has with delivering this solution or any similar solution.</label>
                                <textarea name="" rows="5" placeholder="Please Enter..." id="experience" onChange={handleChange} value={form2.experience.data.experience}></textarea>
                            </div>
                            <div className="sub-section" style={{color : '#f60', marginTop: '50px', borderTop: '1px solid #999', paddingTop : '50px'}}>

                                        <label htmlFor="" style={{color : '#f60'}}>
                                                <strong>Grade this Area (Max of 20)</strong>
                                        </label>

                                        <input type="number" max={20} min = {0} placeholder = "Enter your Score" id = "experience" onChange={handleGradeChange}  />

                                    </div>

                        </div>

                        </form>
                    </div>
                

</div>


           </div>



    );
}

export default Gradeapplication;
