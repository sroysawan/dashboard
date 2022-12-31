import React, { Component } from "react";
import Clock from "react-digital-clock";
import DataDashboard from "./DataDashboard";
import Hide from "./Bars/Hide";
import Search from "./Bars/Search";
import Color from "./Bars/Color";

class DashboardCard extends Component {
    render() {
        return (
            <div>
                <header className="page-header page-header-dark pb-5"></header>
                <div className="container-fluid px-4 mt-n10">
                    <div className="card mb-4 w-100">
                        <div className="card-header bg-red fw-bold text-white fs-4 d-flex justify-content-between bg-danger">
                            <div>Job overview by Machine</div>
                            <Clock />
                        </div>

                        <div className="card-header text-black">
                            <div className="d-flex justify-content-start">
                                <Hide />
                                <Color />
                                {/* <Search /> */}
                            </div>
                        </div>

                        {/* <div className="d-flex">
        <div className="p-2 flex-grow-1"><Hide /></div>
        <div className="p-2"><Color /></div>
        <div className="p-2"><Search /></div>
      </div> */}

                        {/* <div className="d-flex bg-light mb-3">
        <div className="me-auto p-2"><Hide /></div>
        <div className="p-2"><Color /></div>
        <div className="p-2"><Search /></div>
      </div> */}
      
                        {/* <div className="card-header text-black">
                            <div className="d-flex justify-content-between">
                                <Hide />
                                <Color />
                                <Search /> 
                            </div>
                        </div> */}


                        
{/* <div className="card-header text-black">
<div className='grid'>
<div className='g-col-4'><Hide /></div>
      <div className='g-col-4'><Color /></div>
      <div className='g-col-4'><Search /></div>
    </div>
    </div> */}
                        <DataDashboard />
                        <Search />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardCard;
