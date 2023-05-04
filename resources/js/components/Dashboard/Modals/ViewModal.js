import React, { Component } from "react";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import UpdateModal from "./UpdateModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link, Switch, Routes, redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "./modalStyle.css";
import DataOperation from "../../Operation/DataOperation";
import * as bootstrap from 'bootstrap';


class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDashboardStatus: null,
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
            selectedOption: null,
            isConditionMet: true,
            dashboardQtypertray: null,
            dashboardQtyactivity: null,
            dashboardQtyaccum: null,
            activityTemp: null,
            accumTemp: null,
            planning_machine: [],
            planning_others: [],
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSelectedOptionChange = this.handleSelectedOptionChange.bind(this);
        this.resetRadioButtons = this.resetRadioButtons.bind(this);
    }

    getDashboardDetailsNewDB = (id_machine) => {
        console.log(id_machine);
        axios
            .get("/get/indivvidual/dashboard/detailsNew", {
                params: { dashboardID: id_machine},
            })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    currentDashboardStatus: response.data.status_work,
                    currentDashboardIdmc: response.data.id_machine,
                    currentDashboardItemno: response.data.item_no,
                    currentDashboardIdjob: response.data.id_job,
                    currentDashboardOp: response.data.operation,
                    currentDashboardDatedue: response.data.date_due,
                    currentDashboardQtypertray: response.data.qty_per_pulse2,
                    currentDashboardQtyactivity:response.data.no_pulse1,
                    currentDashboardQtyaccum: response.data.qty_accum,
                    currentDashboardQtyaccumsum: response.data.qty_accum_sum,
                    currentDashboardQtyorder: response.data.qty_order,
                    currentDashboardQtypercent: response.data.qty_percent,
                    currentDashboardIdtask: response.data.id_task,
                    currentDashboardDtupdate: response.data.datetime_update,
                    currentDashboardIdactivity: response.data.id_activity,

                });
            });
    };
    handleSubmit(event) {
        event.preventDefault();
        let apiUrl ;
        let newPath ;

        if(this.state.selectedOption === 'radioChangeOp'){
            apiUrl = '/change/Operation';
            newPath = '/operation';
        }else if (this.state.selectedOption === 'radioRemove'){
            apiUrl = '/remove/Machine';
            newPath = '/';
        }else if (this.state.selectedOption === 'radioNextQueue'){
            apiUrl = '/feed/Machine';
            // newPath = '/';
        }else if (this.state.selectedOption === 'radioNewTask'){
            apiUrl = '/select/Newtask';
            newPath = '/newtask';
        }else if (this.state.selectedOption === 'radioResetActivity'){
            apiUrl = '/';
            newPath = '/';
        }
        axios.post(`${apiUrl}`, { 
            selectedOption: this.state.selectedOption,
            modalId: this.props.modalId,
            Idjob: this.props.dashboardData.currentDashboardIdjob,
            operation: this.props.dashboardData.currentDashboardOp,
            Idtask: this.props.dashboardData.currentDashboardIdtask,
        })
            .then(response => {
                // นำข้อมูลที่ได้จาก Laravel มาโชว์แยกหน้ากับหน้าที่มี radio button อยู่
                console.log('Data received from Laravel:', response.data);
                const { data_planning, data_planning2, machine_queues, data_newtask, data_newtask2 } = response.data;

                console.log('data_planning:', data_planning);
                console.log('data_planning2:', data_planning2);
                console.log('machine_queues:', machine_queues);
                console.log('data_newtask:', data_newtask);
                console.log('data_newtask2:', data_newtask2);
                this.handleCloseModal(); // ปิด modal ก่อนเปลี่ยนเส้นทาง

                if(this.state.selectedOption === 'radioChangeOp'){
                    this.props.history.push({
                        pathname: '/operation',
                        state: {
                            data: data_planning,
                            data_planning2: data_planning2,
                            machine_queues: machine_queues,
                            modalId: this.props.modalId,
                            currentOperation: this.props.dashboardData.currentDashboardOp
                    }
                });
                }else if (this.state.selectedOption === 'radioRemove') {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            data: response.data,
                            modalId: this.props.modalId,
                        }
                    });
                    window.location.reload();
                }else if (this.state.selectedOption === 'radioNextQueue') {
                    this.props.history.push({
                        // pathname: '/feed/Machine',
                        state: {
                            data: response.data,
                            modalId: this.props.modalId,
                        }
                    });
                    window.location.reload();
                }else if (this.state.selectedOption === 'radioNewTask') {
                    this.props.history.push({
                        pathname: '/newtask',
                        state: {
                            data: data_newtask,
                            data_newtask2: data_newtask2,
                            machine_queues: machine_queues,
                            modalId: this.props.modalId,
                        }
                    });
                }else if (this.state.selectedOption === 'radioResetActivity') {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            data: response.data,
                            modalId: this.props.modalId,
                        }
                    });
                    window.location.reload();
                }    
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
// handleSubmit = async (submitEvent) => {
//   submitEvent.preventDefault();
//   try {
//     const { selectedOption } = this.state;
//     if (selectedOption === "radioChangeOp") {
//       const response = await axios.post("/change/Operation", {
//         selectedOption,
//       });
//       const data_planning = response.data;
//       // จัดเก็บ data_planning ใน state
//       this.setState({ data_planning });
//     } else if (selectedOption === "radioRemove") {
//       window.location.href = "/operation";
//     }
//     // ...
//   } catch (error) {
//     console.error("Error in handleSubmit:", error);
//   }
// };
////////////////////////////////////////
// handleSubmit = async (submitEvent) => {
//     submitEvent.preventDefault();
//     if (this.state.selectedOption === "radioChangeOp") {
//         try {
//         const response = await axios.post("/change/Operation", {
//             selectedOption: this.state.selectedOption,
//             dashboardId: this.props.dashboardData.currentDashboardIdtask,
//             dashboardIdjob: this.props.dashboardData.currentDashboardIdjob
//         });
//         const data = JSON.stringify(response.data);
//         const encodedData = encodeURIComponent(data);
//         window.location.href = `/operation?data=${encodedData}`;
//         } catch (error) {
//         console.error("Error in handleSubmit:", error);
//         }
//     }else if  (this.state.selectedOption === "radioRemove"){
//         window.location.href = `/operation`;
//     }else if  (this.state.selectedOption === "radioResetActivity"){
//         axios.post('/reset/activity', { selectedOption: this.state.selectedOption })
//         .then((response) => {
//           window.location.reload();
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
// }

handleCloseModal = () => {
    const modalElement = document.getElementById(`viewModal${this.props.modalId}`);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    console.log(this.props.modalId);
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

   
    inputDashboardQtypertray = (event) => {
        this.setState({
            dashboardQtypertray: event.target.value,
        });
    };

    inputDashboardQtyactivity = (event) => {
        this.setState({
            dashboardQtyactivity: event.target.value,
        });
    };

    
    inputDashboardQtyaccum = (event) => {
        this.setState({
            dashboardQtyaccum: event.target.value,
        });
    };

    static getDerivedStateFromProps(props, current_state) {
        let dashboardUpdate = {
            dashboardQtypertray: null,
            dashboardQtyactivity: null,
            dashboardQtyaccum: null,
            activityTemp: null,
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
            current_state.dashboardQtyactivity &&
            current_state.dashboardQtyactivity !==
                props.dashboardData.currentDashboardQtyactivity
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
            current_state.dashboardQtyactivity !==
                props.dashboardData.currentDashboardQtyactivity ||
            current_state.dashboardQtyactivity ===
                props.dashboardData.currentDashboardQtyactivity
        ) {
            dashboardUpdate.dashboardQtyactivity =
                props.dashboardData.currentDashboardQtyactivity;
            dashboardUpdate.activityTemp =
                props.dashboardData.currentDashboardQtyactivity;
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

    // updateModalDashboard = () => {
    //     console.log(this.props.modalId);
    //     console.log(this.state.dashboardQtypertray);
    //     console.log(this.state.dashboardQtyactivity);
    //     console.log(this.state.dashboardQtyaccum);

    //     axios
    //         .get("/update/dashboard/modal", {
    //             params: {
    //                 dashboardId:
    //                 this.props.dashboardData.currentDashboardIdtask,
    //                 dashboardQtypertray: this.state.dashboardQtypertray,
    //                 dashboardQtyactivity: this.state.dashboardQtyactivity,
    //                 dashboardQtyaccum: this.state.dashboardQtyaccum,
    //                 activityTemp: this.state.activityTemp,
    //                 accumTemp: this.state.accumTemp,
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             console.log("Update Success");
    //             toast.success("Update Success");
    //             setTimeout(() => {
    //                 location.reload();
    //             }, 1000);
    //             // this.getDashboardDetailsNewDB();
    //         });
    // };

    updateModalDashboard = () => {
        console.log(this.props.modalId);
        console.log(this.state.dashboardQtypertray);
        console.log(this.state.dashboardQtyactivity);
        console.log(this.state.dashboardQtyaccum);
        console.log('id_activity' + this.props.dashboardData.currentDashboardIdactivity);
        console.log('id_machine' + this.props.dashboardData.currentDashboardIdmc)
        console.log('sum' + this.props.dashboardData.currentDashboardQtyaccumsum)
    
        axios
            .post("/update/dashboard/modal", {
                dashboardId: this.props.dashboardData.currentDashboardIdtask,
                dashboardIdmc: this.props.dashboardData.currentDashboardIdmc,
                dashboardIdactivity: this.props.dashboardData.currentDashboardIdactivity,
                dashboardQtypertray: this.state.dashboardQtypertray,
                dashboardQtyactivity: this.state.dashboardQtyactivity,
                dashboardQtyaccum: this.state.dashboardQtyaccum,
                dashboardQtyaccumsum: this.props.dashboardData.currentDashboardQtyaccumsum,
                activityTemp: this.state.activityTemp,
                accumTemp: this.state.accumTemp,
            })
            .then((response) => {
                console.log(response.data);
                console.log("Update Success");
                toast.success("Update Success");
                setTimeout(() => {
                    location.reload();
                }, 1000);
            });
    };

    render() {
        // const isDisabled = !(this.state.dashboardQtypertray && this.state.dashboardQtyactivity);
        // const { selectedOption } = this.state;

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
                                            <td>Qty activity:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyactivity}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty accum:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyaccum}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Qty accum dashboard:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyaccumsum}
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
                                    <form onSubmit={this.handleSubmit}>
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
                                            <label className="form-check-label" htmlFor="radioChangeOp">
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
                                            <button
                                                className="btn btn-primary"
                                                type="submit"      
                                                onClick={this.handleCloseModal}                                       
                                                disabled={this.state.selectedOption === null}
                                                
                                                >Go
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
                                                    type="number"
                                                    id="currentDashboardQtypertray"
                                                    className="form-control mb3 bg"
                                                    value={this.state.dashboardQtypertray ?? ""}
                                                    onChange={this.inputDashboardQtypertray}
                                                />
                                            </div>
                                        </tr>
                                        <tr>
                                            <td>Qty activity:</td>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    id="currentDashboardQtyactivity"
                                                    className="form-control mb3 bg"
                                                    value={this.state.dashboardQtyactivity ?? ""}
                                                    onChange={this.inputDashboardQtyactivity}
                                                />
                                            </div>
                                        </tr>
                                        <tr>
                                            <td>Qty accum:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyaccum}
                                            </td>
                                            {/* <div className="form-group">
                                                <input
                                                    type="number"
                                                    id="currentDashboardQtyaccum"
                                                    className="form-control mb3 bg"
                                                    value={this.state.dashboardQtyaccum ?? ""}
                                                    onChange={this.inputDashboardQtyaccum}
                                                />
                                            </div> */}
                                        </tr>
                                        <tr>
                                            <td>Qty accum dashboard:</td>
                                            <td>
                                                {this.props.dashboardData.currentDashboardQtyaccumsum}
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
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Update"
                                    onClick={this.updateModalDashboard}
                                    // disabled={isDisabled}
                                />
                                <ToastContainer
                                    autoClose={400}
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
export default withRouter(ViewModal);
