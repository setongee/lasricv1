import React, {useEffect, useState} from 'react';
import AdminShow from './adminShow';
import SethAnimation from '../components/lottie/seth-animation'
import { getSubmittedApps, getPendingApps, getGradedApps, getInterviewBucketApps, getCouncilMemberListing } from '../api/firebase/admin/admin_applications';
import './styles/AdminStyles.scss'
import Previewapplication from './previewApplication';
import CouncilShow from './councilTabs';

const CouncilMember = ({check}) => {

    const councilStack = {

        councils : getCouncilMemberListing()

    }

    const [data, setData] = useState([])

    const [previewShow, setPreviewShow ] = useState(false)
    const [previewData, setPreviewData] = useState({})
    const [appUID, setAppID] = useState({})

    useEffect(() => {
        
        councilStack.councils.then(e => setData(e));

    }, []);

    const previewUser = (data, appuid) => {

        //show the modal
        setPreviewShow(true);

        //set the data in for viewing
        setPreviewData(data)

        //set the appid
        setAppID(appuid)
        
    }

    const closePreviewUser = () => {

        //show the modal
        setPreviewShow(false);

        //set the data in for viewing
        setPreviewData({})

        
    }
    
    return (

        <div className="applications-council applicationAdmin messup" style={{marginTop : "45px"}}>

            <div className="previewCouncil">

                <div className="councilInformation">

                    <div className="profileImageContainer">
                        <div className="profileImage"><img src="https://lasric.lagosstate.gov.ng/assets/council/img/BayoAdekanmbi.jpg" alt="council member Image" /></div>
                        <div className="councilName"> 

                            <div className="firstname-council">Bayo</div>
                            <div className="lastname-council">Adekambi</div>
                        
                        </div>

                        <div className="uploadImage"><i className="fi fi-rr-upload"></i> Upload</div>
                    </div>

                    <form action="">

                        <div className="gradeTrack"> <i className="fi fi-rr-user"></i> Personal Information</div>

                        <div className="inputForm">
                            <input type="text" placeholder='Enter Council Fullname' value="" name='name' id='name' />
                        </div>

                        <div className="inputForm">
                            <input type="email" placeholder='Enter Council Valid Email Address' value="" name='email' id='email' />
                        </div>

                        <div className="inputForm">
                            <input type="text" placeholder='Enter Council Job Title'value="" name='job' id='job'  />
                        </div>

                        <div className="inputForm">
                            <input type="text" placeholder='Enter Council Linkedin Profile URL' value="" name='linkedin' id='linkedin' />
                        </div>

                        <div className="select-box">

                            <div className="gradeTrack"> <i className="fi fi-rr-checkbox"></i> Grading Track</div>

                            <div className="checkboxx" name = 'innovation' id='innovation'>
                                <p>Innovation</p>
                                <input type="checkbox" />
                            </div>

                            <div className="checkboxx">
                                <p>Research</p>
                                <input type="checkbox" name = 'research' id='research'/>
                            </div>

                            <div className="checkboxx">
                                <p>Stem</p>
                                <input type="checkbox" name = 'stem' id='stem'/>
                            </div>

                            <div className="checkboxx">
                                <p>Secondary School</p>
                                <input type="checkbox" name = 'secsch' id='secsch'/>
                            </div>
                            
                        </div>

                    </form>

                </div>

            </div>

            <div className="tableHeaders itshead">

                <div className="tableHead"> Fullname </div>
                <div className="tableHead"> Track </div>
                <div className="tableHead"> Graded </div>
                <div className="tableHead"> Status </div>
                <div className="tableHead"></div>

            </div>

            {/* council Listings Here */}

            {
                data.length ? data.map((e, index) => {

                        return <CouncilShow data = {e.data} key = {e.id} showPrev = {previewUser} appuid = {e.id} />
                    }) : <div className="no-data-state">
                    <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                    <p> Oops! There are no applicants yet </p>

                </div>
            }

        </div>

    );
}

export default CouncilMember;
