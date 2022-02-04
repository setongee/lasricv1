import React,{useState, useEffect} from 'react';
import '../../global/styles/apply.scss'
import Apply from './apply';
import { getCallups } from '../../api/firebase/callup';

const Callup = () => {

    const [callup, setCallupData] = useState([])

    useEffect(() => {

        getCallups().then(response => setCallupData(response));
        
    }, []);

    return (

        <div className="apply">

            <div className="apply-filter">

                <h1>Call for Applications</h1>

                {/* <div className="filter">
                    <li>All</li>
                    <li>Innovation</li>
                    <li>Research</li>
                    <li>Stem</li>
                    <li>Secondary Schools</li>
                </div> */}

            </div>

            <div className="callups">
            {
                callup.length ? 
                    callup.map ((data, index) => <Apply key = {index} data = {data}/> )
                : null
            }
            </div>

        </div>
    );
}

export default Callup;
