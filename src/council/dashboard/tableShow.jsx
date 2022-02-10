import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Tableshow = ({feed, councilUID}) => {

    const {data, id} = feed

    const Navigate = useNavigate()

    const INIT_1 = data.firstname.split('')[0].toUpperCase();
    const INIT_2 = data.lastname.split('')[0].toUpperCase();
    const FULLINIT = `${INIT_1}${INIT_2}`

    const tems = data.gradedBy.find(e => {
        return e.uid === councilUID
    })

    const [grade, setGrade] = useState(0)

    useEffect(() => {

        if(tems === undefined){
            setGrade(0)
        } else{
           setGrade(tems.grade)
        }

    }, []);

    var dateSubmitted = data.dateSubmitted.toDate().toDateString()

    return (

        <div className="tableHeaders information" onClick={ () => Navigate(`/council/dashboard/applications/grade/${id}`)}>

            <div className="tableHead avarta" style={{textTransform: 'capitalize'}}> <div className="cardMe"> {FULLINIT} </div> {data.firstname} {data.lastname}</div>
            <div className="tableHead"> {dateSubmitted} </div>
            <div className="tableHead" style={{textTransform: 'capitalize'}}> {data.status} </div>
            <div className="tableHead"> {grade}% </div>

        </div>
    );
}

export default Tableshow;
