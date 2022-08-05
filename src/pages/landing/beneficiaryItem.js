import React, {useState, useEffect} from 'react';
import '../../Admin/styles/cms.scss'
import { useNavigate } from 'react-router-dom';
import { setLandingDetails, getCMSData, addCallupsDetails, getCMSCallupData } from '../../api/firebase/admin/cms';
import SethAnimation from '../../components/lottie/seth-animation';
import { getCurrentCohortNumber } from '../../api/firebase/admin/admin_applications';

const BeneficiariesItemLanding = ({dataPlan, onDelete, deleteVal}) => {

    const Navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)


    useEffect(() => {
        
        setData(dataPlan.data);

    }, []);



    return (


        <div className='cms-joint beneficiary_item'>

            <div className="callups_section beneficiary_card_hold">

                <div className="preview_cms_card beneficiary beneficiary_card">

                    <div className="callup_img">
                        <img src={data.foundersImg} alt="Founders image" />
                    </div>

                    <div className="logoCompany">
                        <img src={data.logo} alt="company logo image" />
                    </div>

                    <div className="details_pin">

                        <div className="callup_details">
                            {data.founders}
                        </div>

                        <div className="callup_title">{data.company}</div>

                        <div className="callup_footer">

                            <p><a href = {data.website} target = '_blank' > Visit Website <i className="fi fi-rr-arrow-small-right"></i> </a></p>
                            <div className="callup_track"> <div className="track_icon"><i className="fi fi-rr-bulb"></i></div> {data.track} </div>

                        </div>

                    </div>

                </div>
                

            </div>

        </div>

    );
}

export default BeneficiariesItemLanding;
