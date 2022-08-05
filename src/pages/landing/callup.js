import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getCMSCallupData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';
import "./styles.scss"
import EmptyData from '../../assets/svg/empty_data.png'
import ApplyCard from './apply';
import { email_notice_subscription } from '../../api/firebase/email_notice';

const ApplyApplication = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [deleteListener, setDeleteListener] = useState(true)
    const [cohort, setCohort] = useState("");
    const [loadPage, setLoadPage] = useState(true);
    const [noticeEmail, setNoticeEmail] = useState("")

    useEffect(() => {

        async function fetchData() {

          await getCurrentCohortNumber().then( (e) => setCohort(`cohort${e[0].present}`) )
          const cohortNum = await getCurrentCohortNumber().then( (e) => e[0].present );

          const response = await getCMSCallupData("callups", `cohort${cohortNum}`)

          filterExpiredCallup(response)
          .then( () => setLoadPage(false) )

        }

        fetchData();

    }, []);


    const filterExpiredCallup = async (res) => {

        const result = res.filter( e => {

            const dateData = new Date(e.data.date)
            const expiryDate = dateData.getTime();

            const dateToday = new Date;

            return expiryDate >= dateToday.getTime()

        })

        setData(result)

    }

    const handleSubmitNotice = async () => {

       if ( noticeEmail !== "" ) {

            const docv = document.getElementById("email_btn");
            docv.textContent = "Submitting..."

            await email_notice_subscription(noticeEmail, cohort)
            .then( () => {

                setTimeout(() => {

                    const docv = document.getElementById("email_btn");
                    docv.style.backgroundColor = "#43D57F";
                    docv.textContent = "Submitted"

                }, 1000);

                setTimeout(() => {

                    docv.style.backgroundColor = "#4351f1";
                    docv.textContent = "Notify Me"
                    setNoticeEmail("")
                    
                }, 2500);

            } )

       }

    }



    return (

        <div className="callupListing">

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }

            <div className="callupItem landing_apply_page">

                <div className="title_callup_landing"> Callups </div>

                <div className="result_data">

                    {
                        data.length ? data.map((data, index) => {

                            return <ApplyCard dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                            
                        }) : <div className="no-data-state noDataState_landing">

                                <div className="none_anim">

                                    <img src={EmptyData} alt="empty data state" />

                                </div>
                
                            <div className="info_msg">
                                
                                    No active applications currently
                                    {<br></br>}
                                    {<br></br>}
                                    Kindly fill in your email address below to be notified once there are active applications.

                            
                            </div>

                            <div className="notifyMe">
                                    <input type="email" placeholder='Enter email address to be notified' value={ noticeEmail } onChange = { (e) => setNoticeEmail(e.target.value) } required/>
                                    <div className="submitNotice" onClick={handleSubmitNotice} id = "email_btn" >Notify Me</div>
                            </div>
        
                            </div>
                    }

                </div>

            </div>

        </div>

    );
}

export default ApplyApplication;


