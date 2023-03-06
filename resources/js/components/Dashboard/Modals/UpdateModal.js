import React, { Component } from 'react';


class UpdateModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentDashboardIdmc: null,
            currentDashboardQtypertray: null,
            currentDashboardQtyaccum: null,
        }
    }

    inputDashboardQtypertray = (event) => {
        this.setState({
            currentDashboardQtypertray: event.target.value,
        });
    }

    inputDashboardQtyaccum = (event) => {
        this.setState({
            currentDashboardQtyaccum: event.target.value,
        });
    }

    static getDerivedStateFromProps(props,current_state){
        let dashboardUpdate ={
            currentDashboardQtypertray: null,
            currentDashboardQtyaccum: null,
        }
        if(current_state.currentDashboardQtypertray && (current_state.currentDashboardQtypertray !== props.sumResult.dashboardQtypertray)){
            return null;
        }
        if(current_state.currentDashboardQtyaccum && (current_state.currentDashboardQtyaccum !== props.sumResult.dashboardQtyaccum)){
            return null;
        }

        if(current_state.currentDashboardQtypertray !== props.sumResult.dashboardQtypertray||
            current_state.currentDashboardQtypertray === props.sumResult.dashboardQtypertray) {
            dashboardUpdate.currentDashboardQtypertray = props.sumResult.dashboardQtypertray;
         }
         if(current_state.currentDashboardQtyaccum !== props.sumResult.dashboardQtyaccum||
            current_state.currentDashboardQtyaccum === props.sumResult.dashboardQtyaccum) {
            dashboardUpdate.currentDashboardQtyaccum = props.sumResult.dashboardQtyaccum;
         }
         return dashboardUpdate;
    }

    updateDashboardData = () => {
        console.log(this.props.modalId);
        console.log(this.state.currentDashboardQtypertray);
        console.log(this.state.currentDashboardQtyaccum);

        axios.post('/update/dashboard/data/update',{
            dashboardId: this.props.modalId,
            currentDashboardIdmc: response.data.id_machine,
            currentDashboardQtypertray: this.state.currentDashboardQtypertray,
            currentDashboardQtyaccum: this.state.currentDashboardQtyaccum,     
        })
         .then((response) => {
            console.log(response.data);
            console.log("Update Success");
            //  toast.success("Dashboard Updated Successully");
             setTimeout(() => {
                 location.reload();
            },500)
         })
    }

    render(){  
        return(    
            <div className="modal fade" id={"updateModal"+this.props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Current task for machine: {this.props.sumResult.currentDashboardIdmc}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table id="modal_table_current" class="table table-striped">
                        <tbody>
                        <form className='form'>
                            {/* <tr>
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
                            <tr> */}
                                       
                                        Qty per tray:
                                        <div className="form-group">
                                            <input type="text"
                                            id="currentDashboardQtypertray"
                                            className='form-control mb3 bg'
                                            value={this.state.currentDashboardQtypertray ?? ""}
                                            onChange={this.inputDashboardQtypertray}
                                            />
                                        </div>
                                        
                            {/* </tr>  
                            <tr> */}
                                        Qty accum:
                                        <div className="form-group">
                                            <input type="text"
                                            id="currentDashboardQtyaccum"
                                            className='form-control mb3 bg'
                                            value={this.state.currentDashboardQtyaccum ?? ""}
                                            onChange={this.inputDashboardQtyaccum}
                                            />
                                        </div>   
                            {/* </tr>   
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
                            </tr> */}
                            </form>
                    </tbody>
                    </table>
                    </div>
                    <div className ="modal-footer">
                                <input type="submit"
                                className="btn btn-primary"
                                value="Update"
                                onClick={this.updateDashboardData}
                                />           
                                
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                        
                    </div>
                    </div>
                    </div>
                    </div>
                    );
                }
            }

export default UpdateModal;