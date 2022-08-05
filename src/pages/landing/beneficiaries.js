import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';
import BeneficiariesItemLanding from './beneficiaryItem';
import EmptyData from '../../assets/svg/empty_data.png'

const Beneficiaries = () => {

    const Navigate = useNavigate()

    const [data, setData] = useState([]);
    const [cohort, setCohort] = useState("cohort0");
    const [deleteListener, setDeleteListener] = useState(true)
    const [loadPage, setLoadPage] = useState(true);

    useEffect(() => {

        async function fetchData() {

          const response = await getCMSCallupData("beneficiaries", cohort);
          setData(response);

        }

        fetchData();

      }, [cohort]);


      useEffect(() => {

        async function fetchCohort() {

          const cohort = await getCurrentCohortNumber().then( (e) => e[0].present)
          setCohort(`cohort${Number(cohort) - 1}`);

          // Fill in the past cohorts in the options
          const selectOptionsBody = document.querySelector('#select_track');

          if (!selectOptionsBody.childNodes.length) {


              for ( let i = 1; i < cohort; i++ ) {
        
                const selectOptions = document.querySelector('#select_track');
    
                const option = document.createElement('option');
                option.value = `cohort${i}`;
                option.innerText = `Cohort ${i}`;
    
                selectOptions.appendChild(option)
    
                const selectOptionsBody = document.querySelector('#select_track');
                selectOptionsBody.value = `cohort${Number(cohort) - 1}`

                setLoadPage(false)
            
            }  

          }

        }

        fetchCohort();

      }, []);

      
    const handleChange = (e) => {

      setData([])
      setCohort(e.target.value);

    }


    return (

        <div className="callupListing landing_beneficiaries">

            {
                loadPage ? 
                
                <div className="loadPage">
                    <div className="loadingCircle">
                        <SethAnimation jsonSrc={"https://assets9.lottiefiles.com/packages/lf20_l9bcfk19.json"} lottieStyle = {{width: '120px', height: '120px'}} speed={"1"} />
                    </div>
                </div> : null
            }

            <div className="topic">Beneficiaries</div>

            <div className="cms-nav beneficiary">

                <div className="sidedItem">

                    <div className="selectTrack">

                        <p>Filter by Cohort</p>

                        <select name="select_track" id="select_track" onChange={handleChange} >
                            
                        </select>

                    </div>

                </div>

            </div>

            <div className="callupItem beneficiary_map">

                {
                    data.length ? data.map((data, index) => {

                        return <BeneficiariesItemLanding dataPlan = {data} key = {index} onDelete = {setDeleteListener} deleteVal = {deleteListener} />
                        
                    }) : <div className="no-data-state noDataState_landing">

                    <div className="none_anim">

                        <img src={EmptyData} alt="empty data state" />

                    </div>
    
                <div className="info_msg">
                    
                        No beneficiaries added yet
                        {<br></br>}
                        {<br></br>}
                    Kindly check back later on as awardees will be updated duly

                
                </div>

                </div>
                }

            </div>

        </div>

    );
}

export default Beneficiaries;
