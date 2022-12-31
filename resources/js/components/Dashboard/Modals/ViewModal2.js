import React, { Component } from 'react';

class ViewModal2 extends Component{

    constructor(props){
        super(props);
    }
    
    render(){  
        return(    
            <div className="modal fade" id={"viewModal2"+this.props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Current task for machine: {this.props.sumResult.currentDashboardIdmc}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <table id="modal_table_current" class="table table-striped">
                        <tbody>
                        <tr>
                                        <td>Machine ID:</td>
                                        <td>{this.props.sumResult.currentDashboardIdmc}</td>            
                            </tr>                           
                            <tr>
                                        <td>Item NO:</td>
                                        <td>{this.props.sumResult.currentDashboardItemno}</td>                              
                            </tr>   
                            <tr>
                                        <td>Operation:</td>
                                        <td>{this.props.sumResult.currentDashboardOp}</td>
                            </tr>
                            <tr>
                                        <td>Date due:</td>
                                        <td>{this.props.sumResult.currentDashboardDatedue}</td>
                            </tr>
                            <tr>
                                        <td>Qty accum:</td>
                                        <td>{this.props.sumResult.currentDashboardQtyaccum}</td>    
                            </tr>   
                            <tr>
                                        <td>Qty order:</td>
                                        <td>{this.props.sumResult.currentDashboardQtyorder}</td>    
                            </tr>
                            <tr>
                                        <td>Qty percent:</td>
                                        <td>{this.props.sumResult.currentDashboardQtypercent}</td>    
                            </tr>
                            <tr>
                                        <td>Task ID:</td>
                                        <td>{this.props.sumResult.currentDashboardIdtask}</td>    
                            </tr>
                            <tr>
                                        <td>Job ID:</td>
                                        <td>{this.props.sumResult.currentDashboardIdjob}</td>    
                            </tr>
                            <tr>
                                        <td>Last update:</td>
                                        <td>{this.props.sumResult.currentDashboardDtupdate}</td>    
                            </tr>
                    </tbody>
                    </table>
                    <br/>
                    <h5>Action: </h5>
                    <div class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input radioNextTask" type="radio" name="radioNextTask" id="radioNextChangeOp" value="1"></input>
                                <label class="form-check-label" for="radioNextChangeOp">
                                    Change operation
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioNextTask" type="radio" name="radioNextTask" id="radioNextRemove" value="4"></input>
                                <label class="form-check-label" for="radioNextRemove">
                                    Remove this task
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioNextTask" type="radio" name="radioNextTask" id="radioNextNewTask" value="6"></input>
                                <label class="form-check-label" for="radioNextNewTask">
                                    Select a new task
                                </label>
                            </div>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" 
                    className="btn btn-primary"
                    value=""
                    >Go!
                    </button>
                </div>
                </div>
            </div>
            </div>
        );
    }
}
export default ViewModal2;
