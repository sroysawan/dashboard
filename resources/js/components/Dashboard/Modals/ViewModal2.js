import React, { Component } from 'react';
class ViewModal2 extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedOption: null,
            isConditionMet: true,
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.resetRadioButtons = this.resetRadioButtons.bind(this);
    }

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

    handleFormSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        if (this.state.selectedOption === "radioChangeOp") {
            window.location.href = "/operation";
        } else if (this.state.selectedOption === "radioRemove") {
            window.location.href = "/operation";
        } else if (this.state.selectedOption === "radioNewTask") {
            window.location.href = "/newtask";
        }
    };
    
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
                    <form onSubmit={this.handleFormSubmit}>
                                    <div class="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioButton"
                                            value="radioChangeOp"
                                            checked={this.state.selectedOption === "radioChangeOp"}
                                            onChange={this.handleOptionChange}
                                            disabled={this.props.dashboardData.currentDashboardItemno === ''}
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
                                            disabled={this.props.dashboardData.currentDashboardItemno === '' }
                                        />
                                        <label className="form-check-label" for="radioRemove">
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
                                            disabled={this.props.dashboardData.currentDashboardItemno != ''}
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
export default ViewModal2;
