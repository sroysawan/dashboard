import React, { Component } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            dashboardIdmc: this.props.modalId,
            dashboardQtypertray: null,
            dashboardQtyaccum: null,
        }
    }
    componentDidMount = () => {
        console.log('updateModal'+this.props.modalId);
    }

    //update
    inputDashboardQtypertray = (event) => {
        this.setState({
            dashboardQtypertray: event.target.value, 
        });
        console.log('update 80');
    }

    //update
    inputDashboardQtyaccum = (event) => {
        this.setState({
            dashboardQtyaccum: event.target.value,
        });
    }

    static getDerivedStateFromProps(props,current_state){
        let dashboardUpdate ={
            dashboardQtypertray: null,
            dashboardQtyaccum: null,
        }
        if(current_state.dashboardQtypertray && (current_state.dashboardQtypertray !== props.dashboardData.currentDashboardQtypertray)){
            return null;
        }
        if(current_state.dashboardQtyaccum && (current_state.dashboardQtyaccum !== props.dashboardData.currentDashboardQtyaccum)){
            return null;
        }

        if(current_state.dashboardQtypertray !== props.dashboardData.currentDashboardQtypertray||
            current_state.dashboardQtypertray === props.dashboardData.currentDashboardQtypertray) {
            dashboardUpdate.dashboardQtypertray = props.dashboardData.currentDashboardQtypertray;
         }
         if(current_state.dashboardQtyaccum !== props.dashboardData.currentDashboardQtyaccum||
            current_state.dashboardQtyaccum === props.dashboardData.currentDashboardQtyaccum) {
            dashboardUpdate.dashboardQtyaccum = props.dashboardData.currentDashboardQtyaccum;
         }
         return dashboardUpdate;
    }

    updateModalDashboard = () => {
        console.log(this.props.modalId);
        console.log(this.state.dashboardQtypertray);
        console.log(this.state.dashboardQtyaccum);
        console.log('update 80');

        // axios.get('/update/dashboard/modal',{
        //     dashboardId: this.props.modalId,
        //     dashboardQtypertray: this.state.dashboardQtypertray,
        //     dashboardQtyaccum: this.state.dashboardQtyaccum,     
        // })
        axios.get('/update/dashboard/modal',{
                params:{dashboardId: this.props.modalId}, 
                params:{dashboardQtypertray: this.state.dashboardQtypertray}, 
                params:{dashboardQtyaccum: this.state.dashboardQtyaccum}, 
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
                    <h5 className="modal-title" id="exampleModalLabel">
                                Current task for machine:{" "}
                                {this.props.modalId}
                            </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='form'>
                                        <div className="form-group">
                                            <input type="text"
                                            id="currentDashboardQtypertray"
                                            // className='form-control mb3 bg'
                                            value={this.state.dashboardQtypertray ?? ""}
                                            onChange={this.inputDashboardQtypertray}
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="text"
                                            id="currentDashboardQtyaccum"
                                            // className='form-control mb3 bg'
                                            value={this.state.dashboardQtyaccum ?? ""}
                                            onChange={this.inputDashboardQtyaccum}
                                            />
                                        </div>   
                    </form>
                    </div>
                    <div className ="modal-footer">
                                <input type="submit"
                                className="btn btn-primary"
                                value="Update"
                                onClick={this.updateModalDashboard}
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