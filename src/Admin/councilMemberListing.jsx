import React from 'react';
import CouncilMember from './CouncilTable';

const Councilmemberlisting = () => {
    return (

        <div className="councilMembers">

            <div className="headCouncil"><h1>Council Members</h1></div>
            
            <CouncilMember/>

        </div>

    );
}

export default Councilmemberlisting;
