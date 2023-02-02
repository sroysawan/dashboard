import axios from 'axios';
import { Toast } from 'bootstrap';
import React, { Component } from 'react';


class CreateModal extends Component {

    constructor(props) {
        super(props);

        this.state={
            dashboardName: null,
            dashboardSalary: null,
        }
    }

    //Create name

    inputDashboardName = (event) => {
        this.setState({
            dashboardName: event.target.value,
        });
    }

    //Create  state

    inputDashboardSalary = (event) => {
        this.setState({
            dashboardSalary: event.target.value,
        });
    }

    //Storing dashboard data.

    storedashboardData = () =>{
        axios.post('/store/dashboard/data',{
            dashboardName: this.state.dashboardName,
            dashboardSalary: this.state.dashboardSalary,
        }).then(() =>{
            Toast.success("Dashboard Saved Successfully");

            setTimeout(() => {
                location.reload();
            },2500)
        })
    }

    render() {
        return (
            <>
                {/* <div className='row text-right mb-3 pb-3'>
                <button className='btn btn-info text-right col-3 offset-md-9'
                        data-toggle="modal"
                        data-target="#modalCreate"
                        >
                            Add New Dashboard
                        </button>
                </div>
                <div className="modal fade" id="ModalCreate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Staff</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className='form'>
                            <div className="form-group">
                                <input type="text"
                                id="dashboardName"
                                placeholder="Name Here"
                                onChange={this.inputDashboardName}
                                />
                            </div>

                            <div className="form-group">
                                <input type="text"
                                id="dashboardSalary"
                                placeholder="Salary Here"
                                onChange={this.inputDashboardSalary}
                                />
                            </div>
                        </form>
                    </div>
                    <div className ="modal-footer">
                    <input type="button"
                                value="Save"
                                onClick={this.storedashboardData}
                                />

                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>                  
                    </div>
                    </div>
                </div>
                </div> */}
            </>
        )
    }
}

export default CreateModal;
