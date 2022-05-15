import React from 'react';
import CouncilMember from './CouncilTable';

const Councilmemberlisting = () => {
    return (

        <div className="councilMembers">

            <div className="headCouncil">

               <div className='headerTags' >Council Members</div>

            </div>
            
           <div className="councilData">

                <CouncilMember/>
                
           </div>

        </div>

    );
}

export default Councilmemberlisting;
