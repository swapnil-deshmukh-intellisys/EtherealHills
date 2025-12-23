import React from 'react';
import Intro from './Intro.jsx';
import Welcome from './welcome.jsx';
import Offers from './offers.jsx';
import Pac2 from './Pac2.js';
import Package from './package.js';
import Facility from './facility.js';
// import Feature from './Feature.js';

import Popup from './Popup.js';
// import Private from './policy.js'
function HomeP ({ isLoggedIn }) {

    return(

        <div>
            
            <Intro/>
            <Welcome/>
            
            <Offers/>
            {isLoggedIn ? <Pac2/> : null}
            <Package/>
            {/* <Feature/> */}
            <Facility/>
            <Popup/>
        
        </div>

    );

}

export default HomeP;