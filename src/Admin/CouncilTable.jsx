import React, {useEffect, useState} from 'react';
import AdminShow from './adminShow';
import SethAnimation from '../components/lottie/seth-animation'
import { getSubmittedApps, getPendingApps, getGradedApps, getInterviewBucketApps } from '../api/firebase/admin/admin_applications';
import './styles/AdminStyles.scss'
import Previewapplication from './previewApplication';

const CouncilMember = ({check}) => {

    const applicationsStack = {

        submitted : getSubmittedApps(),
        pending : getPendingApps(),
        graded : getGradedApps(),
        interview : getInterviewBucketApps()

    }

    const [data, setData] = useState([])

    const [previewShow, setPreviewShow ] = useState(false)
    const [previewData, setPreviewData] = useState({})
    const [appUID, setAppID] = useState({})

    useEffect(() => {
        
        //applicationsStack[check].then(e => setData(e));
        //applicationsStack[check].then(e => setData(e));

    }, [check]);

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

        <div className="applications-council applicationAdmin messup">


           {
               
               previewShow ?  
               
               ( 
               
                    <div className="previewThisApp">

                        <Previewapplication data = {previewData} closeModal = {closePreviewUser} appid = {appUID} />

                    </div> 
                ) 
                
                : null
           
           }

            <div className="tableHeaders itshead">

                <div className="tableHead"> Fullname </div>
                <div className="tableHead"> Track </div>
                <div className="tableHead"> Graded </div>
                <div className="tableHead"> Status </div>
                <div className="tableHead"></div>

            </div>

            {/* Applications Listings Here

            {
                data.length ? data.map((e, index) => {
                    return <AdminShow data = {e.data} key = {e.id} showPrev = {previewUser} appuid = {e.id} />
                }) : <div className="no-data-state">
                <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                <p> Oops! There are no applicants yet </p>

            </div>
            } */}

        </div>

    );
}

export default CouncilMember;
