import React, {Component} from "react";
import Navbars from "./Dashboard/Navbar/Navbars";
import DashboardCard from "./Dashboard/DashboardCard";
import Search from "./Dashboard/Bars/Search";

class Home extends Component {
    render(){
        return (
            <body>
                <div>
                    <Navbars />
                    <DashboardCard />
                    {/* <Search /> */}
                </div>
            </body>
        );
    }
}

export default Home;
