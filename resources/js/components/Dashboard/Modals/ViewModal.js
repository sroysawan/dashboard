import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import UpdateModal from './UpdateModal';

class ViewModal extends Component{

    constructor(props){
        super(props);
        this.state = {
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
            radioCurrentTask: '',
            radioChecked: '',
        }
    }

    getDashboardDetailsNewDB = (id_machine) => {
        console.log(id_machine);
        axios.get('/get/indivvidual/dashboard/detailsNew',{ params: { dashboardID: id_machine } }
        ).then((response) => {
        console.log(response.data);
        this.setState({
            currentDashboardIdmc: response.data.id_machine,
            currentDashboardItemno: response.data.item_no,
            currentDashboardOp: response.data.operation,
            currentDashboardDatedue: response.data.date_due,
            currentDashboardQtypertray: response.data.qty_per_pulse2,
            currentDashboardQtyaccum: response.data.qty_accum,
            currentDashboardQtyorder: response.data.qty_order,
            currentDashboardQtypercent: response.data.qty_percent,
            currentDashboardIdtask: response.data.id_task,
            currentDashboardDtupdate: response.data.datetime_update
        })
    })
}

  
    goToOperation = () => {
        location.href = '/operation'
    }

    radioCurrentTask = (e) =>{
        console.log(e.target.value);
        
    }

    radioChecked = (e) =>{
        if(this.radioCurrentTask == 1)
        return location.href = '/operation'
        //console.log(e.target.value);
        console.log(this.radioChecked);
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
                    <div class="mb-3" onChange={this.radioCurrentTask}>
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
                data-bs-toggle="modal" 
                data-bs-target={'#updateModal'+this.props.eachRowId}
                onClick={ () => { this.getDashboardDetailsNewDB(this.props.eachRowId)}}
                >Edit</button>
                {/* <UpdateModal modalId={this.props.eachRowId} sumResult= {this.state}/> */}

                    {/* <button type="button" 
                    className="btn btn-primary"
                    onClick={this.goToOperation}
                    >Go!
                    </button> */}

                    <button type="button" 
                    className="btn btn-primary"
                    onClick={ () => {this.radioChecked(this.props.radioCurrentTask)} }
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
