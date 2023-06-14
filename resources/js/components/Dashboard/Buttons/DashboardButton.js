import axios from "axios";
import React, { Component } from "react";
import { FaRegEdit } from "react-icons/Fa";
import ViewModal from "../Modals/ViewModal";

class DashboardButton extends Component {
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

            currentDashboardIdRfid: null,
            currentDashboardActivityType: null,
            currentDashboardNosend: null,
            currentDashboardNoPulse1: null,
            no_pulse2: null,
            no_pulse3: null,
        };
    }

    getDashboardDetailsNewDB = (id_machine) => {
        console.log(id_machine);
        axios
            .get("/get/indivvidual/dashboard/detailsNew", {
                params: { dashboardID: id_machine },
            })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    currentDashboardIdmc: response.data.id_machine,
                    currentDashboardItemno: response.data.item_no,
                    currentDashboardIdjob: response.data.id_job,
                    currentDashboardOp: response.data.operation,
                    currentDashboardDatedue: response.data.date_due,
                    currentDashboardQtypertray: response.data.qty_per_pulse2,
                    currentDashboardQtyactivity: response.data.no_pulse_sum,
                    currentDashboardQtyaccum: response.data.qty_accum,
                    currentDashboardQtyaccumsum: response.data.qty_accum_sum,
                    currentDashboardQtyorder: response.data.qty_order,
                    currentDashboardQtypercent: response.data.qty_percent,
                    currentDashboardIdtask: response.data.id_task,
                    currentDashboardDtupdate: response.data.datetime_update,
                    currentDashboardIdactivity: response.data.id_activity,
                    currentDashboardIdstaff: response.data.id_staff,
                    currentDashboardStatusWork: response.data.status_work,
                    currentDashboardIdbreak: response.data.id_break,
                    currentDashboardIdactivityDowntime: response.data.id_activity_downtime,
                    currentDashboardIdRfid: response.data.id_rfid,
                    currentDashboardActivityType: response.data.type,
                    currentDashboardNosend: response.data.no_send,
                    currentDashboardNoPulse1: response.data.no_pulse1,
                    no_pulse2: response.data.no_pulse2,
                    no_pulse3: response.data.no_pulse3,
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
                    data-bs-target={"#viewModal" + this.props.eachRowId}
                    onClick={() => {
                        this.getDashboardDetailsNewDB(this.props.eachRowId);
                    }}
                >
                    <FaRegEdit />
                </button>
                <ViewModal
                    modalId={this.props.eachRowId}
                    dashboardData={this.state}
                    level={this.props.level}
                />
            </div>
        );
    }
}
export default DashboardButton;
