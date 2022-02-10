import React, {useEffect, useState} from 'react';
import { getAllSubmittedApplications } from '../../api/firebase/council-applications';
import Tableshow from './tableShow';
import SethAnimation from '../../components/lottie/seth-animation';

const All = ({councilProfile}) => {

    const alldata = getAllSubmittedApplications();

    const [data, setData] = useState([])

    useEffect(() => {
        
        alldata.then( e => setData(e) )
        
    }, []);

    return (

        <div className="applications-council">

            <div className="tableHeaders itshead">

                <div className="tableHead"> Fullname </div>
                <div className="tableHead"> Date Submitted </div>
                <div className="tableHead"> Status </div>
                <div className="tableHead"> Grade </div>

            </div>

            {/* Applications Listings Here */}

            {
                data.length ? data.map((e, index) => {
                    return <Tableshow feed = {e} key = {index} councilUID = {councilProfile.uid} />
                }) : <div className="no-data-state">
                <SethAnimation jsonSrc={"https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"} lottieStyle = {{width: '400px', height: '400px'}} speed={"1"} />

                <p>Oops! You have no submitted applications</p>
            </div>
            }

        </div>

    );
}

export default All;
