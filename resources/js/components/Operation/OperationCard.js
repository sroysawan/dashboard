import React, { Component } from "react";
import Clock from "react-digital-clock";
import DataOperation from "./DataOperation";


function OperationCard() {
   

        return (
            <div>
                <header className="page-header page-header-dark pb-5"></header>
                <div className="container-fluid px-4 mt-n10">
                    <div className="card mb-4 w-100">
                        <div className="card-header bg-red fw-bold text-white fs-4 d-flex justify-content-between bg-primary" data-bs-dismiss="modal">
                            <div>Manufacturing orders to be assigned to Machine :        
                            </div>
                            <Clock />
                        </div>

                        <div className="card-header text-black">
                            <div className="d-flex justify-content-start">
                             <DataOperation />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }


export default OperationCard;
