import React, { Component } from 'react';

class ViewModal extends Component{

    constructor(props){
        super(props);
        
    }
    

    goToOperation = () => {
        location.href = '/operation'
    }

    render(){  
        return(    
            <div className="modal fade" id={"viewModal"+this.props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <td>Qty per tray:</td>
                                        <td>{this.props.sumResult.currentDashboardQtypertray}</td>    
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
                                        <td>Last update:</td>
                                        <td>{this.props.sumResult.currentDashboardDtupdate}</td>    
                            </tr>
                    </tbody>
                    </table>
                    <br/>
                    <h5>Action: </h5>
                    <div class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input radioCurrentTask" type="radio" name="radioCurrentTask" id="radioChangeOp" value="1"></input>
                                <label class="form-check-label" for="radioChangeOp">
                                    Change operation (เปลี่ยน Operation)
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioCurrentTask" type="radio" name="radioCurrentTask" id="radioRemove" value="2"></input>
                                <label class="form-check-label" for="radioRemove">
                                    Remove this task (เอางานออก)
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioCurrentTask" type="radio" name="radioCurrentTask" id="radioNextQueue" value="3"></input>
                                <label class="form-check-label" for="radioNextQueue">
                                    Feed task from next queue (ดึงงานจากคิวถัดไป)
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioCurrentTask" type="radio" name="radioCurrentTask" id="radioNewTask" value="4"></input>
                                <label class="form-check-label" for="radioNewTask">
                                    Select a new task (เพิ่มงานใหม่)
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input radioCurrentTask" type="radio" name="radioCurrentTask" id="radioResetActivity" value="5"></input>
                                <label class="form-check-label" for="radioResetActivity">
                                    Reset activity (รีเซ็ตงาน)
                                </label>
                            </div>
                        </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" 
                    className="btn btn-primary"
                    onClick={''}
                    >Edit
                    </button>

                    <button type="button" 
                    className="btn btn-primary"
                    onClick={this.goToOperation}
                    >Go!
                    </button>
                </div>
                </div>
            </div>
            </div>
        );
    }
}
export default ViewModal;
