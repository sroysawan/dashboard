import React from 'react';
import Dashboard from './Dashboard';
import Navbars from './Dashboard/Navbars';


function Home() {
    return (
        <div className="container">
        <div className="row justify-content-center">
        <Navbars/>
        <Dashboard/>
        </div>
    </div>      
    );
}

export default Home;