import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import UpdateModal from "./UpdateModal";
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

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value,
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

    render() {
        return (
            <div
                className="modal fade"
                id={"viewModal" + this.props.modalId}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Current task for machine:{" "}
                                {this.props.sumResult.currentDashboardIdmc}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <table
                                id="modal_table_current"
                                class="table table-striped"
                            >
                                <tbody>
                                    <tr>
                                        <td>Machine ID:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardIdmc}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Item NO:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardItemno}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Operation:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardOp}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date due:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardDatedue}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Qty per tray:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardQtypertray}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Qty accum:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardQtyaccum}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Qty order:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardQtyorder}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Qty percent:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardQtypercent}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Task ID:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardIdtask}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Last update:</td>
                                        <td>
                                            {this.props.sumResult.currentDashboardDtupdate}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <h5>Action: </h5>
                            <div class="mb-3">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioChangeOp"
                                            checked={this.state.selectedOption === "radioChangeOp"}
                                            onChange={this.handleOptionChange}
                                        />
                                        <label class="form-check-label">
                                            Change operation (เปลี่ยน Operation)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioRemove"
                                            checked={this.state.selectedOption === "radioRemove"}
                                            onChange={this.handleOptionChange}
                                        />
                                        <label
                                            class="form-check-label"
                                            for="radioRemove"
                                        >
                                            Remove this task (เอางานออก)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioNextQueue"
                                            checked={this.state.selectedOption === "radioNextQueue"}
                                            onChange={this.handleOptionChange}
                                        />
                                        <label
                                            class="form-check-label"
                                            for="radioNextQueue"
                                        >
                                            Feed task from next queue
                                            (ดึงงานจากคิวถัดไป)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioNewTask"
                                            checked={this.state.selectedOption === "radioNewTask"}
                                            onChange={this.handleOptionChange}
                                        />
                                        <label
                                            class="form-check-label"
                                            for="radioNewTask"
                                        >
                                            Select a new task (เพิ่มงานใหม่)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioResetActivity"
                                            checked={this.state.selectedOption === "radioResetActivity"}
                                            onChange={this.handleOptionChange}
                                        />
                                        <label
                                            class="form-check-label"
                                            for="radioResetActivity"
                                        >
                                            Reset activity (รีเซ็ตงาน)
                                        </label>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={"#updateModal"+this.props.eachRowId}
                                            onClick={() => {this.getDashboardDetailsNewDB(this.props.eachRowId);}}
                                        >
                                            Edit
                                        </button>
                                        {/* <UpdateModal modalId={this.props.eachRowId} sumResult= {this.state}/> */}

                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={this.state.selectedOption === null}
                                        >
                                            ยืนยัน
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewModal;
