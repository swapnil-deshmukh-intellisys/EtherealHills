import React from 'react';
import Intro from './Intro.jsx';
import Welcome from './welcome.jsx';
import Offers from './offers.jsx';
import Package from './package.js';
import Facility from './facility.js';
import Pac2 from './Pac2.js';
import Popup from './Popup.js';

// import Feature from './Feature.js';

function Homed () {
    return(
        <div>
            <Popup/>
            <Intro/>
            <Welcome/>
            <Offers/>
            <Pac2/>
            <Package/>
            <Facility/>
        </div>
    );
}

export default Homed;
