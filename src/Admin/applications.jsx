import React,{useState, useEffect} from 'react';
import AdminTable from './adminTables';

const Applications = () => {

    const [ filterContent, setFilterContent ] = useState("submitted")

    useEffect(() => {
        switch (filterContent) {
        
            case 'submitted':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.submitted').classList.add('active')
    
                } else {
    
                    document.querySelector('.submitted').classList.add('active')
    
                }
                
                break;
            
            case 'pending':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.pending').classList.add('active')
    
                } else {
    
                    document.querySelector('.pending').classList.add('active')
                    
                }
                
                break;
    
            case 'graded':
    
                var act = document.querySelector('.filters .active');
                
                if(act !== null) {
    
                    act.classList.remove('active');
                    document.querySelector('.graded').classList.add('active')
    
                } else {
    
                    document.querySelector('.graded').classList.add('active')
                    
                }
                
                break;
    
                case 'interview':
    
                    var act = document.querySelector('.filters .active');
                    
                    if(act !== null) {
        
                        act.classList.remove('active');
                        document.querySelector('.interview').classList.add('active')
        
                    } else {
        
                        document.querySelector('.interview').classList.add('active')
                        
                    }
                    
                    break;
        
            default:
                break;
        }
    }, [filterContent]);

    return (

        <div className = "overviewAdmin applicationsPage" >
            
            <div className="tableInfo">

                <div className="filters">

                    <li className="submitted active" onClick={()=>setFilterContent("submitted")}>All Applications</li>
                    <li className='pending' onClick={()=>setFilterContent("pending")}>Pending</li>
                    <li className='graded' onClick={()=>setFilterContent("graded")}>Graded</li>
                    <li className='interview' onClick={()=>setFilterContent("interview")}>Interview Bucket</li>

                </div>

            </div>

            <AdminTable check = {filterContent} />

        </div>

    );
}

export default Applications;
