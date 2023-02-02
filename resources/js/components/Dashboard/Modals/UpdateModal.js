import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class UpdateModal extends Component {

    constructor(props) {
        super(props);

        this.state={
            dashboardStaff: null,
            dashboardRfid: null,
            dashboardPrefix: null,
            dashboardFirst: null,
            dashboardLast: null,
            //dashboardsite: null,
            dashboardRole: null,
            dashboardShif: null,
            // dashboardimg: null,
            
        }
    }

   


    //Update  
    inputDashboardStaffID = (event) => {
        this.setState({
            dashboardStaff: event.target.value,
        });
    }
    //Update  
    inputDashboardRfid = (event) => {
        this.setState({
            dashboardRfid: event.target.value,
        });
    }
    //Update  
    inputDashboardPrefix = (event) => {
        this.setState({
            dashboardPrefix: event.target.value,
        });
    }
    //Update  
    inputDashboardFirst = (event) => {
        this.setState({
            dashboardFirst: event.target.value,
        });
    }
    //Update  
    inputDashboardLast = (event) => {
        this.setState({
            dashboardLast: event.target.value,
        });
    }
    //Update  
    //inputDashboardsite = (event) => {
       // this.setState({
          //  dashboardsite: event.target.value,
       // });
   // }
    //Update  
    inputDashboardRole = (event) => {
        this.setState({
            dashboardRole: event.target.value,
        });
    }
    //Update  
    inputDashboardShif = (event) => {
        this.setState({
            dashboardShif: event.target.value,
        });
    }
    // //Update  
    // inputDashboardimg = (event) => {
    //     this.setState({
    //         dashboardimg: event.target.value,
    //     });
    // }


static getDerivedStateFromProps(props,current_state){
    let dashboardUpdate ={
        

        dashboardStaff: null,
        dashboardRfid: null,
        dashboardPrefix: null,
        dashboardFirst: null,
        dashboardLast: null,
        //dashboardsite: null,
        dashboardRole: null,
        dashboardShif: null,
        // dashboardimg: null,
}


//Updating data from input




if(current_state.dashboardStaff && (current_state.dashboardStaff !== props.dashboardData.currentDashboardStaff)){
    return null;
    }
   
    if(current_state.dashboardRfid && (current_state.dashboardRfid !== props.dashboardData.currentDashboardRfid)){
        return null;
        }
        
        if(current_state.dashboardPrefix && (current_state.dashboardPrefix !== props.dashboardData.currentDashboardPrefix)){
            return null;
            }
            
            if(current_state.dashboardFirst && (current_state.dashboardFirst !== props.dashboardData.currentDashboardFirst)){
                return null;
                }

                if(current_state.dashboardLast && (current_state.dashboardLast !== props.dashboardData.currentDashboardLast)){
                    return null;
                    }
                    //if(current_state.dashboardsite && (current_state.dashboardsite !== props.dashboardData.currentDashboardimdashboardsite)){
                        //return null;
                      //  }

                        if(current_state.dashboardRole && (current_state.dashboardRole !== props.dashboardData.currentDashboardRole)){
                            return null;
                            }

                            if(current_state.dashboardShif && (current_state.dashboardShif !== props.dashboardData.currentDashboardShif)){
                                return null;
                                }

                                // if(current_state.dashboardimg && (current_state.dashboardimg !== props.dashboardData.currentDashboardimdashboardimg)){
                                //     return null;
                                //     }
    




//Updating data from props Below

if(current_state.dashboardStaff !== props.dashboardData.currentDashboardStaff||
    current_state.dashboardStaff === props.dashboardData.currentDashboardStaff) {
    dashboardUpdate.dashboardStaff = props.dashboardData.currentDashboardStaff;
 }

 if(current_state.dashboardRfid !== props.dashboardData.currentDashboardRfid||
    current_state.dashboardRfid === props.dashboardData.currentDashboardRfid) {
    dashboardUpdate.dashboardRfid = props.dashboardData.currentDashboardRfid;
 }

 if(current_state.dashboardPrefix !== props.dashboardData.currentDashboardPrefix||
    current_state.dashboardPrefix === props.dashboardData.currentDashboardPrefix) {
    dashboardUpdate.dashboardPrefix = props.dashboardData.currentDashboardPrefix;
 }

 if(current_state.dashboardFirst !== props.dashboardData.currentDashboardFirst||
    current_state.dashboardFirst === props.dashboardData.currentDashboardFirst) {
    dashboardUpdate.dashboardFirst = props.dashboardData.currentDashboardFirst;
 }

 if(current_state.dashboardLast !== props.dashboardData.currentDashboardLast||
    current_state.dashboardLast === props.dashboardData.currentDashboardLast) {
    dashboardUpdate.dashboardLast = props.dashboardData.currentDashboardLast;
 }

 {/*if(current_state.dashboardsite !== props.dashboardData.currentDashboardsite||
    current_state.dashboardsite === props.dashboardData.currentDashboardsite) {
    dashboardUpdate.dashboardsite = props.dashboardData.currentDashboardsite;
 }*/}

 if(current_state.dashboardRole !== props.dashboardData.currentDashboardRole||
    current_state.dashboardRole === props.dashboardData.currentDashboardRole) {
    dashboardUpdate.dashboardRole = props.dashboardData.currentDashboardRole;
 }

 if(current_state.dashboardShif !== props.dashboardData.currentDashboardShif||
    current_state.dashboardShif === props.dashboardData.currentDashboardShif) {
    dashboardUpdate.dashboardShif = props.dashboardData.currentDashboardShif;
 }

//  if(current_state.dashboardimg !== props.dashboardData.currentDashboardimg||
//     current_state.dashboardimg === props.dashboardData.currentDashboardimg) {
//     dashboardUpdate.dashboardimg = props.dashboardData.currentDashboardimg;
//  }


return dashboardUpdate;

}
    
    //Updating dashboard data
    updateDashboardData = () => {
        console.log(this.props.modalId);
        console.log(this.state.dashboardStaff);
        console.log(this.state.dashboardRfid);
        console.log(this.state.dashboardPrefix);
        console.log(this.state.dashboardFirst);
        console.log(this.state.dashboardLast);
        console.log(this.state.dashboardRole);
        console.log(this.state.dashboardShif);

        axios.post('/update/dashboard/data/update',{
            dashboardId: this.props.modalId,
            dashboardStaff: this.state.dashboardStaff,
            dashboardRfid: this.state.dashboardRfid,
            dashboardPrefix: this.state.dashboardPrefix,
            dashboardFirst: this.state.dashboardFirst,
            dashboardLast: this.state.dashboardLast,
            //dashboardsite: this.state.dashboardsite,
            dashboardRole: this.state.dashboardRole,
            dashboardShif: this.state.dashboardShif,
            // dashboardimg: this.state.dashboardimg,
            
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

    render() {
        return (
            <div className="modal fade" id={"updateModal"+this.props.modalId } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Staff</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='form'>
                            Staff ID :
                            <div className="form-group">
                                <input type="text"
                                id="dashboardStaffID"
                                className='form-control mb3 bg'
                                value={this.state.dashboardStaff ?? ""}
                                onChange={this.inputDashboardStaffID}
                                />
                            </div>
                            RFID :
                            <div className="form-group">
                                <input type="text"
                                id="dashboardRfid"
                                className='form-control mb3 bg'
                                value={this.state.dashboardRfid ?? ""}
                                onChange={this.inputDashboardRfid}
                                />
                            </div>
                            Prefix :
                            {/* <div className="form-group"> */}
                                <select className='form-select form-select-sm' id="dashboardPrefix" onChange={this.inputDashboardPrefix} value={this.state.dashboardPrefix}>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="1">นาย</option>
                        <option value="2">นาง</option>
                        <option value="3">นางสาว</option>
                        </select>
                                {/* <input type="text"
                                id="dashboardStaff"
                                className='form-control mb3'
                                value={this.state.dashboardPrefix ?? ""}
                                onChange={this.inputDashboardPrefix}
                                />
                            </div> */}
                            First name :
                            <div className="form-group">
                                <input type="text"
                                id="dashboardFirst"
                                className='form-control mb3 bg'
                                value={this.state.dashboardFirst ?? ""}
                                onChange={this.inputDashboardFirst}
                                />
                            </div>
                            Last name :
                            <div className="form-group">
                                <input type="text"
                                id="dashboardLast"
                                className='form-control mb3 bg'
                                value={this.state.dashboardLast ?? ""}
                                onChange={this.inputDashboardLast}
                                />
                            </div>
                            {/*Site :
                            <div className="form-group">
                                <input type="text"
                                id="dashboardsite"
                                className='form-control mb3'
                                value={this.state.dashboardsite ?? ""}
                                onChange={this.inputDashboardsite}
                                />
                        </div>*/}
                            Role :
                            {/* <div className="form-group"> */}
                                <select className='form-select form-select-sm' id="dashboardRole" onChange={this.inputDashboardRole}value ={this.state.dashboardRole }>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="1">Operator</option>
                        <option value="2">Technician</option>
                        <option value="3">Production Support</option>
                        <option value="4">Instructor</option>
                        <option value="5">Senior Instructor</option>
                        <option value="6">Foreman</option>
                        <option value="7">Leader</option>
                        <option value="8">Senior Technician</option>
                        <option value="9">Manager</option>
                        <option value="10">Engineering</option>
                        </select>
                                {/* <input type="text"
                                id="dashboardStaff"
                                className='form-control mb3'
                                value={this.state.dashboardRole ?? ""}
                                onChange={this.inputDashboardRole}
                                />
                            </div> */}
                            Shif :
                            {/* <div className="form-group"> */}
                                <select className='form-select form-select-sm'aria-label=".form-select-sm example"id="dashboardShif" onChange={this.inputDashboardShif}value ={this.state.dashboardShif}>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        </select>
                                {/* <input type="text"
                                id="dashboardStaff"
                                className='form-control mb3'
                                value={this.state.dashboardShif ?? ""}
                                onChange={this.inputDashboardShif}
                                /> */}
                            {/* </div> */}

                            {/* <div className="form-group">
                                <input type="text"
                                id="dashboardStaff"
                                className='form-control mb3'
                                value={this.state.dashboardimg ?? ""}
                                onChange={this.inputDashboardimg}
                                />
                            </div> */}

                            
                        </form>
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
        )
    }
}

export default UpdateModal;
