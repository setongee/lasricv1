import React, {useState, useEffect} from 'react';
import './application.scss';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createApplication } from '../../api/firebase/handleSubmits';
import { getApplication } from '../../api/firebase/getApplication';
import SethAnimation from '../../components/lottie/seth-animation';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePersonalApplication } from '../../api/firebase/handleSubmits';



const Innovation = ({currentUser}) => {

    const Data = {

        age: "",
        annualReturns: "",
        bankConfirmation : "",
        bizModel: "",
        bizStage: "",
        cacCert: "",
        cacForm7: "",
        cacMemorandum: "",
        cacPost: "",
        company: "",
        companyDate: "",
        companySector: "",
        criminalRecord: "",
        gender: "",
        idCard: "",
        lasricGrant: "",
        lawsuit: "",
        lgaResidence: "",
        linkedin: "",
        nationality: "",
        nextKin: "",
        orgRole: "",
        patent: "",
        refLetter1: "",
        refLetter2: "",
        relKin: "",
        rev12: "",
        stateResidence: "",
        targetArea: "",
        taxClearance: "",
        taxEvidence: "",
        website: ""

    }

    const [form1, setForm1] = useState(Data);
    const [uploadFiles, setuploadFiles] = useState([])
    const [loader, setLoader] = useState(true);
    const [stat, setStat] = useState('pending')

    const pageDetect = useLocation().pathname
    const callupid = pageDetect.split("/")[3];
    const track = pageDetect.split("/")[2];

    const [uploadingServer, setUploadingServer] = useState(false);
    const [successUploadStores, setSuccessUploadStores] = useState(false)

    let navigate = useNavigate();

    //useEffect important
    
    const userid = currentUser.uid
    const appid = `LASRIC_${callupid}_${userid}`

    useEffect(() => {

        getApplication(appid).then(response => {

            if(response !== null) {

                setForm1(response.data.personal.data);
                setStat(response.data.personal.status);
                setLoader(false);

            } else {
                setLoader(false)
            }
        });


    }, []);

    //useeffect important

    const handleChange = (e) => {
  
        const {id, value} = e.target;

        setForm1(data => {

            return {
                ...data,
                [id] : value
            }
        })  
    
    }

    //handleChange
    
    const handleFiles = (e) => {

        const id = e.target.id
        const value = e.target.value

        const chk = uploadFiles.find(data => data.filename === `LASRIC_${id}.pdf`) || [];

        console.log(chk);
        
        if (!chk.length > 0) {

            setuploadFiles( [...uploadFiles, { filename : `LASRIC_${id}.pdf`, target : e.target.files[0] } ] )

        } else {

            uploadFiles.find(( data, index ) => {

                if(data.filename === `LASRIC_${id}.pdf`){
                    
                    uploadFiles[index].target = e.target.files[0];
                    
                }
    
            })
        }  
        
        setForm1(data => {

            return {
                ...data,
                [id] : e.target.files[0].name || ""
            }

            
        })
    }

    console.log(uploadFiles);

    const handleChooseFile = (e) => {

        var input = `input#${e.target.parentElement.id}`
        document.querySelector(input).click();

    }

    const handleFileUpload = () => {


        uploadFiles.forEach( file => {

            const storage = getStorage();
            const storageRef = ref(storage, `cohort4/${currentUser.uid}/${callupid}/${file.filename}` );

            //uploading to firebase begins
            uploadBytes(storageRef,file.target);

        if(uploadFiles.length) {
            
            setUploadingServer(true)

        }

    });

 }  

    const checkRequired = () => {

        console.log("checking required...")

        const inputs = document.querySelectorAll('input');
        const select = document.querySelectorAll('select');

        const inputForm = Array.from(inputs);
        const selectForm = Array.from(select);
        
        
        const inputError = inputForm.filter((item) => {

            return item.value === ""

        })

        const selectError = selectForm.filter((item) => {

            return item.value === ""

        })

        successSubmit();

    }

    const successSubmit = async () => {

        await handleFileUpload();

        setSuccessUploadStores(true);

        if(stat === 'pending') {

            await createApplication(callupid, userid, form1, track ).then(()=>{
                
                window.localStorage.setItem("appid", true);
    
            })

        } else {
            updatePersonalApplication(appid, form1)
        }



    }

    const handleSubmit = (e) => {

        e.preventDefault();
        checkRequired()

    }

    const manageFileView = (e) => {

        const id = e.target.parentElement.id;

        const storage = getStorage();
        const storageRef = ref(storage, `cohort4/${currentUser.uid}/${callupid}/LASRIC_${id}.pdf` );

        getDownloadURL(storageRef).then((url) => {

            window.open(url)

        })
        
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

            {

                uploadingServer 
                ? 
                <div className="uploadingFiles">

                    <div className="cont">

                        {
                            !successUploadStores ? <SethAnimation jsonSrc={"https://assets6.lottiefiles.com/temp/lf20_xYfV1x.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} /> : <SethAnimation jsonSrc={"https://assets1.lottiefiles.com/packages/lf20_wcnjmdp1.json"} lottieStyle = {{width: '200px', height: '200px'}} speed={"1"} />
                        }

                        <p> Uploading your PDF files to the Lagos State Science Research and Innovation Council (LASRIC) Servers </p>

                    </div>

                </div> : null

            }

            <div className="wrapper">
                
                <div className="body-section">
                    
                    {/*innovation form 1 breakdown*/}

                    <form id="form-innovation-1" className='lasric-apply-form'>
                    
                    <div className="details">
                        <label>
                        Gender <div className="notice req">required</div>
                        </label>

                        <select id="gender" name = "gender" onChange={handleChange} value = {form1.gender} required >

                        <option value="">-----Please Select-----</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>

                        </select>

                    </div>
                    <div className="details">
                        <label>
                        Are you a citizen of Nigeria?{" "}
                        <div className="notice req">required</div>
                        </label>
                        <select id="nationality" onChange={handleChange} value = {form1.nationality} required >
                        <option value="None">-----Please Select-----</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Age <div className="notice req">required</div>
                        </label>
                        <input type="text" id="age" placeholder="Please Enter..." onChange={handleChange} value = {form1.age} required />
                    </div>
                    
                    <div className="details">
                        <label>
                        Linkedin Profile <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="linkedin" placeholder="Please Enter..." onChange={handleChange} value = {form1.linkedin}/>
                    </div>

                    <div className="details">
                        <label>
                        State of Residence <div className="notice req">required</div>
                        </label>
                        <input type="text" required id="stateResidence" placeholder="Please Enter..." onChange={handleChange} value = {form1.stateResidence} />
                    </div>
                    <div className="details">
                        <label>
                        Local Govt. of Residence <div className="notice req">required</div>
                        </label>
                        <input type="text" required id="lgaResidence" placeholder="Please Enter..." onChange={handleChange} value = {form1.lgaResidence}/>
                    </div>

                    {/* file upload */}

                    <div className="details">

                        <label>Valid means of identification (LASRRA Card is acceptable).</label>

                        <input type="file" id="idCard" accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="idCard"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.idCard || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                        
                    </div>


                    <div className="details">
                        <label>
                        {" "}
                        Do you have any criminal records?{" "}
                        <div className="notice req">required</div>
                        </label>
                        <select required id="criminalRecord" onChange={handleChange} value = {form1.criminalRecord}>
                        <option value="">-----Please Select-----</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Evidence of payment of personal income tax till date (if you are
                        gainfully employed). <div className="notice opt">optional</div>
                        </label>
                        <input type="file" id="taxEvidence" required accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="taxEvidence"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.taxEvidence || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }
                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                    </div>

                    {/* Tax Upload */}

                    <div className="details">
                        <label>
                        Please provide a letter of confirmation of your account status with a
                        recognised commercial bank.<div className="notice opt">optional</div>
                        </label>
                        <input type="file" required id="bankConfirmation" accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="bankConfirmation"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.bankConfirmation || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>


                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                    </div>
                    <div className="details">

                        <label>
                        Please provide reference letters from at least 2 people that have been
                        resident in Lagos in the past 10-15 years.{" "}
                        <div className="notice opt">optional</div>
                        </label>
                        
                        <input type="file" required id="refLetter1" accept="application/pdf" onChange={handleFiles} hidden/>

                        <div className="fileUploaded" id="refLetter1"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.refLetter1 || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>
                        <input type="file" id="refLetter2" accept="application/pdf" onChange={handleFiles} hidden/>

                        <div className="fileUploaded" id="refLetter2"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.refLetter2 || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                        
                    </div>
                    <div className="details">
                        <label>
                        Do you or your startup have any pending lawsuits in any Nigerian or
                        other court of law? If yes, Please provide full details of any such
                        lawsuit. <div className="notice req">required</div>
                        </label>
                        <select id="lawsuit" required onChange={handleChange} value = {form1.lawsuit}>
                        <option value="">-----Please Select-----</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Next of Kins Fullname <div className="notice req">required</div>
                        </label>
                        <input type="text" id="nextKin" placeholder="Please Enter..." required onChange={handleChange} value = {form1.nextKin}/>
                    </div>
                    <div className="details">
                        <label>
                        Relationship with Kin <div className="notice req">required</div>
                        </label>
                        <input type="text" required id="relKin" placeholder="Please Enter..." onChange={handleChange} value = {form1.relKin}/>
                    </div>
                    <div className="details">
                        <label>
                        Select a target area
                        <div className="notice req">required</div>
                        </label>
                        <select required id="targetArea" onChange={handleChange} value = {form1.targetArea}>
                        <option value="">-----Please Select-----</option>
                        <option value="agriculture">Agriculture (Production and Wate Reuse)</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="greenEnergy">Green Energy</option>
                        <option value="HealthCare">HealthCare</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Have you ever received a grant for this business or idea from LASRIC?{" "}
                        <div className="notice req">required</div>
                        </label>
                        <select required id="lasricGrant" onChange={handleChange} value = {form1.lasricGrant}>
                        <option value="">-----Please Select-----</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        Company Name <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="company" placeholder="Please Enter..." onChange={handleChange} value = {form1.company}/>
                    </div>
                    <div className="details">
                        <label>
                        Company Website. if any? <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="website" placeholder="https://" onChange={handleChange} value = {form1.website}/>
                    </div>
                    <div className="details">
                        <label>
                        When was the company founded{" "}
                        <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="companyDate" placeholder="Please Enter..." onChange={handleChange} value = {form1.companyDate}/>
                    </div>
                    <div className="details">
                        <label>
                        Which of the following sectors does your company belong to?{" "}
                        <div className="notice req">required</div>
                        </label>
                        <select id="companySector" onChange={handleChange} value = {form1.companySector} required >
                        <option value="">-----Please Select-----</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="transportation">Transportation</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="details">
                        <label>
                        What's your business model? (B2B, B2C, B2G B2B2C etc.){" "}
                        <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="bizModel" placeholder="Please Enter..." onChange={handleChange} value = {form1.bizModel}/>
                    </div>
                    <div className="details">
                        <label>
                        What stage is your startup in? (Idea, Pre-Seed, Seed, Growth, Scale){" "}
                        <div className="notice req">required</div>
                        </label>
                        <input required type="text" id="bizStage" placeholder="Please Enter..." onChange={handleChange} value = {form1.bizStage}/>
                    </div>

                    <div className="details">

                        <label>
                        Is your company incorporated? If yes, please upload certificate of
                        incorporation <div className="notice opt">optional</div>
                        </label>

                        <input required type="file" id="cacCert" accept="application/pdf" onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="cacCert"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.cacCert || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>

                    </div>

                    <div className="details">
                        <label>
                        Please upload company's memorandum of association{" "}
                        <div className="notice opt">optional</div>
                        </label>

                        <input required type="file" id="cacMemorandum" accept="application/pdf"  onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="cacMemorandum"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.cacMemorandum || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>

                    </div>
                    <div className="details">

                        <label>
                        Please provide full details of any post-incorporation applications
                        i.e. alteration of CAC documents, if any.{" "}
                        <div className="notice opt">optional</div>
                        </label>

                        <input required type="file" id="cacPost" accept="application/pdf"  onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="cacPost"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.cacPost || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>

                    </div>

                    <div className="details">
                        <label>
                        Please upload form CAC 7 for particulars of directors{" "}
                        <div className="notice opt">optional</div>
                        </label>

                        <input required type="file" id="cacForm7" accept="application/pdf"  onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="cacForm7"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.cacForm7 || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>

                    </div>

                    <div className="details">
                        <label>
                        Please upload your tax clearance certificate{" "}
                        <div className="notice opt">optional</div>
                        </label>


                        <input required type="file" id="taxClearance" accept="application/pdf"  onChange={handleFiles} hidden/>

                        <div className="fileUploaded" id="taxClearance"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.taxClearance || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>   

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                        
                    </div>


                    <div className="details">
                        <label>
                        Kindly provide evidence of payment of annual returns till date.
                        <div className="notice opt">optional</div>
                        </label>
                        
                        <input required type="file" id="annualReturns" accept="application/pdf"  onChange={handleFiles} hidden />
                        
                        <div className="fileUploaded" id="annualReturns"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.annualReturns || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>
                    </div>
                    <div className="details">

                        <label>
                        Please provide proof of any existing patent, trademark or copyright
                        owned by the company/innovator(s).

                        </label>

                        <input required type="file" id="patent" accept="application/pdf"  onChange={handleFiles} hidden />

                        <div className="fileUploaded" id="patent"> 
                        
                            <div className="uploadName"> <i className="fi fi-sr-document file-ui" style={{marginRight : '10px'}}></i> { form1.patent || 'No File Chosen' } </div> 

                            {
                                stat === "pending" ? <div className="uploadAction" onClick={(e) => handleChooseFile(e)}> Choose File </div> : <div className="uploadAction hasFile" onClick={(e) => manageFileView(e)} > View Upload </div>
                            }

                        </div>

                        <i style={{ fontSize: 12, color: "#C00" }}>*PDF format only</i>


                    </div>

                    <div className="details">
                        <label>
                        What’s your role in the organisation{" "}
                        <div className="notice req">required</div>
                        </label>
                        <select required id="orgRole" onChange={handleChange} value = {form1.orgRole}>
                        <option value="">-----Please Select-----</option>
                        <option value="idea-owner">Idea Owner?</option>
                        <option value="team-member">Team Member</option>
                        <option value="other">Other?</option>
                        </select>
                    </div>
                    
                    <div className="details">

                        <label>
                        What’s your revenue in the last 12 months?{" "}
                        </label>
                        <input required type="text" id="rev12" onChange={handleChange} value = {form1.rev12} placeholder='Please Enter...'/>
                    </div>

                    {
                        stat === "pending" ? 
                        <button id="form-proceed" onClick={handleSubmit}>
                            Proceed
                        </button> :
                        <button id="form-proceed completed" style={{backgroundColor : "green"}} onClick={(e) => e.preventDefault()} >
                            Submitted
                        </button>
                    }

                    </form>
                </div>
                </div>

            
        </div>

    );
}

export default Innovation;

