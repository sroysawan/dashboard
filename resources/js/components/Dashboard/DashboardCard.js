import React, { Component } from "react";
import Clock from "react-digital-clock";
import DataDashboard from "./DataDashboard";
import DataTable from "./DataTable";
import Hide from "./Bars/Hide";
import Search from "./Bars/Search";
import Color from "./Bars/Color";
import Dash from "./Dash";
import DashboardNow from "./DashboardNow";

function DashboardCard() {
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
                            </div>
                        </div>
                        <DataDashboard />
                        {/* <Dash /> */}
                        {/* <Search /> */}
                        {/* <DataTable /> */}
                        {/* <DashboardNow /> */}
                    </div>
                </div>
            </div>
        );
    }


export default DashboardCard;
