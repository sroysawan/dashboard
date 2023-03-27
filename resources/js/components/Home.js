import React, {Component} from "react";
import Navbars from "./Dashboard/Navbar/Navbars";
import DataDashboard from "./Dashboard/DataDashboard";

class Home extends Component {
    render(){
        return (
            <>
                <div>
                    <Navbars />
                    <DataDashboard />
                </div>
            </>
        );
    }
}

export default Home;
