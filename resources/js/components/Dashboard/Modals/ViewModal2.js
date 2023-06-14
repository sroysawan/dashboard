import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import * as bootstrap from 'bootstrap';
class ViewModal2 extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedOption: null,
            isConditionMet: true,
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetRadioButtons = this.resetRadioButtons.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let apiUrl ;
        let newPath ;

        if(this.state.selectedOption === 'radioChangeOp'){
            apiUrl = '/change/Operation';
            newPath = '/operationQ2';
        }else if (this.state.selectedOption === 'radioRemoveQ2'){
            apiUrl = '/remove/Machine';
            newPath = '/';
        }else if (this.state.selectedOption === 'radioNewTask'){
            apiUrl = '/select/Newtask';
            newPath = '/newtaskQ2';
        }
        axios.post(`${apiUrl}`, { 
            selectedOption: this.state.selectedOption,
            modalId: this.props.modalId, //id_machine
            Idjob: this.props.dashboardData.currentDashboardIdjob,
            operation: this.props.dashboardData.currentDashboardOp,
            Idtask: this.props.dashboardData.currentDashboardIdtask,
            Idstaff: this.props.dashboardData.currentDashboardIdstaff,
            Idactivity: this.props.dashboardData.currentDashboardIdactivity

        })
            .then(response => {
                // นำข้อมูลที่ได้จาก Laravel มาโชว์แยกหน้ากับหน้าที่มี radio button อยู่
                console.log('Data received from Laravel:', response.data);
                const { data_planning, machine_queues, data_newtask,} = response.data;

                console.log('data_planning:', data_planning);
                console.log('machine_queues:', machine_queues);
                console.log('data_newtask:', data_newtask);


                if (this.state.selectedOption === 'radioChangeOp') {
                    console.log('currentOperation:', this.props.dashboardData.currentDashboardOp);
                  }
                this.handleCloseModal(); // ปิด modal ก่อนเปลี่ยนเส้นทาง

                if(this.state.selectedOption === 'radioChangeOp'){
                    this.props.history.push({
                        pathname: '/operationQ2',
                        state: {
                            data: data_planning,
                            machine_queues: machine_queues,
                            modalId: this.props.modalId,
                            currentDashboardOp: this.props.dashboardData.currentDashboardOp
                    }
                });
                }else if (this.state.selectedOption === 'radioRemoveQ2') {
                    this.props.history.push({
                        pathname: '/',
                        state: {
                            data: response.data,
                            modalId: this.props.modalId,
                        }
                    });
                    window.location.reload();
                }else if (this.state.selectedOption === 'radioNewTask') {
                    this.props.history.push({
                        pathname: '/newtaskQ2',
                        state: {
                            data: data_newtask,
                            machine_queues: machine_queues,
                            modalId: this.props.modalId,
                            currentDashboardOp: this.props.dashboardData.currentDashboardOp,
                            Idactivity: this.props.dashboardData.currentDashboardIdactivity
                        }
                    });
                }  
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handleModalClick = (e) => {
        if (e.target.className === "modal fade") {
            this.resetRadioButtons();
        }
    };

    handleCloseModal = () => {
        const modalElement = document.getElementById(`viewModal2${this.props.modalId}`);
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        console.log(this.props.modalId);
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
    
    render(){  
        return(    
            <div 
                className="modal fade" 
                id={"viewModal2"+this.props.modalId} 
                tabIndex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
                onClick={this.handleModalClick}
            >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Current task for machine: {this.props.dashboardData.currentDashboardIdmc}</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close"
                        onClick={this.resetRadioButtons}
                    >
                    </button>
                </div>
                <div className="modal-body">
                <table id="modal_table_current" class="table table-striped">
                <tbody>
                                    <tr>
                                        <td>Machine ID:</td>
                                        <td>{this.props.dashboardData.currentDashboardIdmc}</td>
                                    </tr>
                                    <tr>
                                        <td>Item NO:</td>
                                        <td>{this.props.dashboardData.currentDashboardItemno}</td>
                                    </tr>
                                    <tr>
                                        <td>Operation:</td>
                                        <td>{this.props.dashboardData.currentDashboardOp}</td>
                                    </tr>
                                    <tr>
                                        <td>Date due:</td>
                                        <td>{this.props.dashboardData.currentDashboardDatedue}</td>
                                    </tr>
                                    <tr>
                                        <td>Qty per tray:</td>
                                        <td>{this.props.dashboardData.currentDashboardQtypertray}</td>
                                    </tr>
                                    <tr>
                                        <td>Qty accum:</td>
                                        <td>{this.props.dashboardData.currentDashboardQtyaccum}</td>
                                    </tr>
                                    <tr>
                                        <td>Qty order:</td>
                                        <td>{this.props.dashboardData.currentDashboardQtyorder}</td>
                                    </tr>
                                    <tr>
                                        <td>Qty percent:</td>
                                        <td>{this.props.dashboardData.currentDashboardQtypercent}</td>
                                    </tr>
                                    <tr>
                                        <td>Task ID:</td>
                                        <td>{this.props.dashboardData.currentDashboardIdtask}</td>
                                    </tr>
                                    <tr>
                                        <td>Last update:</td>
                                        <td>{this.props.dashboardData.currentDashboardDtupdate}</td>
                                    </tr>
                                </tbody>
                    </table>
                    <br/>
                    <h5>Action: </h5>
                    <div class="mb-3">
                    <form onSubmit={this.handleSubmit}>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioChangeOp"
                                            checked={this.state.selectedOption === "radioChangeOp"}
                                            onChange={this.handleOptionChange}
                                            disabled={this.props.dashboardData.currentDashboardItemno === ''|| this.props.level}
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
                                            value="radioRemoveQ2"
                                            checked={this.state.selectedOption === "radioRemoveQ2"}
                                            onChange={this.handleOptionChange}
                                            disabled={this.props.dashboardData.currentDashboardItemno === '' || this.props.level}
                                        />
                                        <label className="form-check-label" for="radioRemoveQ2">
                                            Remove this task (เอางานออก)
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
                                            disabled={this.props.dashboardData.currentDashboardItemno != '' || this.props.level}
                                        />
                                        <label class="form-check-label" for="radioNewTask">
                                            Select a new task (เพิ่มงานใหม่)
                                        </label>
                                    </div>
                              
                         <div className="modal-footer">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={this.state.selectedOption === null || this.props.level }
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
        );
    }
}
export default withRouter(ViewModal2);
