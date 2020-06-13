import React from 'react';
import {Link} from 'react-router-dom'

function Landing() {
    return (
        <div className="landing">
            <h2>National Parks are awesome.</h2>
            <h2>It would be cool to be able to search and save your favorite National Parks.</h2>
            <h2>Right?</h2>
            <h2>How about viewing real time weather for your favorite National Parks?</h2>
            <h2>Lucky for you you can with this app!</h2>
            <h2>Search parks by state.</h2>
            <h2>Select your favorite park and save.</h2>
            <h2>View all your saved parks with current weather.</h2>
            <h2>View details of your parks to learn more about them.</h2>
            <Link to='/parks'>
                <button>Check it out!</button>    
            </Link>
        </div>
    );
}

export default Landing;