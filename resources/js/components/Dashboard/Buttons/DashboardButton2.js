import axios from "axios";
import React, { Component } from "react";
import { FaRegEdit } from "react-icons/Fa";
import ViewModal2 from "../Modals/ViewModal2";

class DashboardButton2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDashboardIdmc: null,
            currentDashboardItemno: null,
            currentDashboardIdjob: null,
            currentDashboardOp: null,
            currentDashboardDatedue: null,
            currentDashboardQtypertray: null,
            currentDashboardQtyactivity: null,
            currentDashboardQtyaccum: null,
            currentDashboardQtyaccumsum: null,
            currentDashboardQtyorder: null,
            currentDashboardQtypercent: null,
            currentDashboardIdtask: null,
            currentDashboardDtupdate: null,
            currentDashboardIdactivity: null,
            currentDashboardIdstaff: null,
            currentDashboardStatusWork: null,
        };
    }

    getDashboardDetails = (id_machine) => {
        console.log(id_machine);
        axios
            .get("/update/DashboardRefreshQueue2/", {
                params: { dashboardID: id_machine },
            })
            .then((response) => {
                console.log(response.data);
                console.log("123");
                this.setState({
                    currentDashboardIdmc: response.data.id_machine,
                    currentDashboardItemno: response.data.item_no,
                    currentDashboardIdjob: response.data.id_job,
                    currentDashboardOp: response.data.operation,
                    currentDashboardDatedue: response.data.date_due,
                    currentDashboardQtypertray: response.data.qty_per_pulse2,
                    currentDashboardQtyactivity: response.data.no_pulse1,
                    currentDashboardQtyaccum: response.data.qty_accum,
                    currentDashboardQtyaccumsum: response.data.qty_accum_sum,
                    currentDashboardQtyorder: response.data.qty_order,
                    currentDashboardQtypercent: response.data.qty_percent,
                    currentDashboardIdtask: response.data.id_task,
                    currentDashboardDtupdate: response.data.datetime_update,
                    currentDashboardIdactivity: response.data.id_activity,
                    currentDashboardIdstaff: response.data.id_staff,
                    currentDashboardStatusWork: response.data.status_work,
                });
            });
    };

    render() {
        return (
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target={"#viewModal2" + this.props.eachRowId}
                    onClick={() => {
                        this.getDashboardDetails(this.props.eachRowId);
                    }}
                >
                    <FaRegEdit />
                </button>
                <ViewModal2
                    modalId={this.props.eachRowId}
                    dashboardData={this.state}
                    level={this.props.level}
                />
            </div>
        );
    }
}
export default DashboardButton2;
