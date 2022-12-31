import React, {Component} from "react";
import Navbars from "./Dashboard/Navbar/Navbars";
import DashboardCard from "./Dashboard/DashboardCard";

class Home extends Component {
    render(){
        return (
            <body>
                <div>
                    <Navbars />
                    <DashboardCard />
                </div>
            </body>
        );
    }
}

export default Home;
