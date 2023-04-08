import React, { Component } from "react";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import UpdateModal from "./UpdateModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDashboardStatus: null,
            currentDashboardIdmc: null,
            currentDashboardItemno: null,
            currentDashboardOp: null,
            currentDashboardDatedue: null,
            currentDashboardQtypertray: null,
            currentDashboardQtyaccum: null,
            currentDashboardQtyorder: null,
            currentDashboardQtypercent: null,
            currentDashboardIdtask: null,
            currentDashboardDtupdate: null,
            selectedOption: null,
            isConditionMet: true,
            dashboardQtypertray: null,
            dashboardQtyaccum: null,
            accumTemp: null,
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.resetRadioButtons = this.resetRadioButtons.bind(this);
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
                    currentDashboardStatus: response.data.status_work,
                    currentDashboardIdmc: response.data.id_machine,
                    currentDashboardItemno: response.data.item_no,
                    currentDashboardOp: response.data.operation,
                    currentDashboardDatedue: response.data.date_due,
                    currentDashboardQtypertray: response.data.qty_per_pulse2,
                    currentDashboardQtyaccum: response.data.qty_accum,
                    currentDashboardQtyorder: response.data.qty_order,
                    currentDashboardQtypercent: response.data.qty_percent,
                    currentDashboardIdtask: response.data.id_task,
                    currentDashboardDtupdate: response.data.datetime_update,
                });
            });
    };

    handleFormSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        if (this.state.selectedOption === "radioChangeOp") {
            window.location.href = "/operation";
        } else if (this.state.selectedOption === "radioRemove") {
            window.location.href = "/operation";
        } else if (this.state.selectedOption === "radioNextQueue") {
            window.location.href = "/operation";
        } else if (this.state.selectedOption === "radioNewTask") {
            window.location.href = "/newtask";
        } else if (this.state.selectedOption === "radioResetActivity") {
            window.location.href = "/operation";
        }
    };

    handleModalClick = (e) => {
        if (e.target.className === "modal fade") {
            this.resetRadioButtons();
        }
    };

    resetRadioButtons() {
        this.setState({
            selectedOption: null,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalId !== this.props.modalId) {
            this.resetRadioButtons();
        }
    }

    handleOptionChange(event) {
        this.setState({
            selectedOption: event.target.value,
        });
    }

    showTestData = () => {
        console.log(
            "#updateModal" + this.props.modalId + " with data : " + this.state
        );
    };

    //update
    inputDashboardQtypertray = (event) => {
        this.setState({
            dashboardQtypertray: event.target.value,
        });
    };

    //update
    inputDashboardQtyaccum = (event) => {
        this.setState({
            dashboardQtyaccum: event.target.value,
        });
    };

    static getDerivedStateFromProps(props, current_state) {
        let dashboardUpdate = {
            dashboardQtypertray: null,
            dashboardQtyaccum: null,
            accumTemp: null,
        };
        if (
            current_state.dashboardQtypertray &&
            current_state.dashboardQtypertray !==
                props.dashboardData.currentDashboardQtypertray
        ) {
            return null;
        }
        if (
            current_state.dashboardQtyaccum &&
            current_state.dashboardQtyaccum !==
                props.dashboardData.currentDashboardQtyaccum
        ) {
            return null;
        }

        if (
            current_state.dashboardQtypertray !==
                props.dashboardData.currentDashboardQtypertray ||
            current_state.dashboardQtypertray ===
                props.dashboardData.currentDashboardQtypertray
        ) {
            dashboardUpdate.dashboardQtypertray =
                props.dashboardData.currentDashboardQtypertray;
        }
        if (
            current_state.dashboardQtyaccum !==
                props.dashboardData.currentDashboardQtyaccum ||
            current_state.dashboardQtyaccum ===
                props.dashboardData.currentDashboardQtyaccum
        ) {
            dashboardUpdate.dashboardQtyaccum =
                props.dashboardData.currentDashboardQtyaccum;
            dashboardUpdate.accumTemp =
                props.dashboardData.currentDashboardQtyaccum;
        }
        return dashboardUpdate;
    }

    updateModalDashboard = () => {
        console.log(this.props.modalId);
        console.log(this.state.dashboardQtypertray);
        console.log(this.state.dashboardQtyaccum);

        axios
            .get("/update/dashboard/modal", {
                params: {
                    dashboardId:
                        this.props.dashboardData.currentDashboardIdtask,
                    dashboardQtypertray: this.state.dashboardQtypertray,
                    dashboardQtyaccum: this.state.dashboardQtyaccum,
                    accumTemp: this.state.accumTemp,
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log("Update Success");
                //  toast.success("Dashboard Updated Successully");
                //  setTimeout(() => {
                //      location.reload();
                // },500)
            });
    };

    render() {
        return (
            <>
                <div
                    className="modal fade"
                    id={"viewModal" + this.props.modalId}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    onClick={this.handleModalClick}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Current task for machine:{" "}
                                    { this.props.dashboardData.currentDashboardIdmc }
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.resetRadioButtons}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <table id="modal_table_current" class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Machine ID:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardIdmc}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Item NO:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardItemno}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Operation:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardOp}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date due:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardDatedue}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty per tray:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtypertray}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty accum:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyaccum}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty order:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyorder}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty percent:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtypercent}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Task ID:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardIdtask}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Last update:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardDtupdate}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <br /> */}
                                <h5> Action: </h5>
                                <div className="mb-3">
                                    <form onSubmit={this.handleFormSubmit}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioButton"
                                                value="radioChangeOp"
                                                checked={this.state.selectedOption === "radioChangeOp"}
                                                onChange={this.handleOptionChange}
                                                disabled={this.props.dashboardData.currentDashboardItemno === ""}
                                            />
                                            <label className="form-check-label">
                                                Change operation (เปลี่ยน Operation)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioButton"
                                                value="radioRemove"
                                                checked={this.state.selectedOption === "radioRemove"}
                                                onChange={this.handleOptionChange}
                                                disabled={this.props.dashboardData.currentDashboardItemno === ""}
                                            />
                                            <label className="form-check-label">
                                                Remove this task (เอางานออก)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioButton"
                                                value="radioNextQueue"
                                                checked={this.state.selectedOption === "radioNextQueue"}
                                                onChange={this.handleOptionChange}
                                                disabled={this.props.dashboardData.currentDashboardItemno != ""}
                                            />
                                            <label className="form-check-label">
                                                Feed task from next queue (ดึงงานจากคิวถัดไป)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioButton"
                                                value="radioNewTask"
                                                checked={this.state.selectedOption === "radioNewTask"}
                                                onChange={this.handleOptionChange}
                                                disabled={this.props.dashboardData.currentDashboardItemno != ""}
                                            />
                                            <label className="form-check-label">
                                                Select a new task (เพิ่มงานใหม่)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioButton"
                                                value="radioResetActivity"
                                                checked={this.state.selectedOption === "radioResetActivity"}
                                                onChange={this.handleOptionChange}
                                                disabled={this.props.dashboardData.currentDashboardItemno === ""}
                                            />
                                            <label className="form-check-label">
                                                Reset activity (รีเซ็ตงาน)
                                            </label>
                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                // data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target={"#updateModal" + this.props.modalId}
                                                // onClick={() => { this.getDashboardDetailsNewDB(this.props.eachRowId)}}
                                                onClick={this.showTestData}
                                                disabled={this.props.dashboardData.currentDashboardItemno === ""}
                                            >
                                                Edit
                                            </button>
                                            {/* <UpdateModal modalId={this.props.modalId} dashboardData={this.props.dashboardData}/> */}

                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                disabled={this.state.selectedOption === null}
                                            >
                                                Go
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                <div
                    className="modal fade"
                    id={"updateModal" + this.props.modalId}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Current task for machine:{" "}
                                    {this.props.modalId}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <table id="modal_table_current" className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Machine ID:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardIdmc}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Item NO:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardItemno}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Operation:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardOp}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date due:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardDatedue}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty per tray:</td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    id="currentDashboardQtypertray"
                                                    className="form-control mb3 bg"
                                                    value={this.state.dashboardQtypertray ?? ""}
                                                    onChange={this.inputDashboardQtypertray}
                                                />
                                            </div>
                                        </tr>
                                        <tr>
                                            <td>Qty accum:</td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    id="currentDashboardQtyaccum"
                                                    className="form-control mb3 bg"
                                                    value={this.state.dashboardQtyaccum ?? ""}
                                                    onChange={this.inputDashboardQtyaccum}
                                                />
                                            </div>
                                        </tr>
                                        <tr>
                                            <td>Qty order:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyorder}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty percent:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtypercent}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Task ID:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardIdtask}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Last update:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardDtupdate}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Update"
                                    onClick={this.updateModalDashboard}
                                />

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default ViewModal;
