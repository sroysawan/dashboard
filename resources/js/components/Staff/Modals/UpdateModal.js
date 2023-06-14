import axios from 'axios';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
            dashboardRole: null,
            dashboardShif: null,
            tempUploadImage:null,
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


static getDerivedStateFromProps(props,current_state){
    let dashboardUpdate ={
        

        dashboardStaff: null,
        dashboardRfid: null,
        dashboardPrefix: null,
        dashboardFirst: null,
        dashboardLast: null,
        dashboardRole: null,
        dashboardShif: null,
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

 if(current_state.dashboardRole !== props.dashboardData.currentDashboardRole||
    current_state.dashboardRole === props.dashboardData.currentDashboardRole) {
    dashboardUpdate.dashboardRole = props.dashboardData.currentDashboardRole;
 }

 if(current_state.dashboardShif !== props.dashboardData.currentDashboardShif||
    current_state.dashboardShif === props.dashboardData.currentDashboardShif) {
    dashboardUpdate.dashboardShif = props.dashboardData.currentDashboardShif;
 }


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
        if(this.state.tempUploadImage != null){
            // console.log('update image');
            this.uploadImage();
          }

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
            dashboardLogin: localStorage.getItem('token'),
            // dashboardimg: this.state.dashboardimg,
            
        })
         .then((response) => {
            console.log(response.data);
            console.log("Update Success");
            toast.success("Update Success");
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    }

    handleUploadImage = (event) =>{
        console.log(event.target.files[0]);
        var selectedFile = event.target.files[0];
        var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if(selectedFile.size > (1048576*4)){
          alert("Maximum image file size is 4 MB");
        }
        else if(selectedFile.name.length > 20){
          alert("Filename is too longer");
        }
        else if (selectedFile && allowedTypes.includes(selectedFile.type)) {
          this.setState({
            tempUploadImage:selectedFile,
            // imageValue:event.target.files[0].name,
          })
          console.log("Add file.");
        } else {
          console.log("Not found or match type file.");
        }
        
      }

      uploadImage = () =>{
        var formData = new FormData();
        formData.append('file', this.state.tempUploadImage);
        formData.append('id_staff', this.state.dashboardStaff);
        axios.post('/update/updateFileImage',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(response =>{
          console.log(response.data);
          this.setState({
            tempUploadImage:null,
          })
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
                            Role :
                            {/* <div className="form-group"> */}
                                <select className='form-select form-select-sm' id="dashboardRole" onChange={this.inputDashboardRole}value ={this.state.dashboardRole }>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="1">Operator</option>
                        <option value="2">Technician</option>
                        <option value="6">Foreman</option>
                        <option value="9">Manager</option>
                        <option value="11">Data Entry</option>
                        </select>
                                <select className='form-select form-select-sm'aria-label=".form-select-sm example"id="dashboardShif" onChange={this.inputDashboardShif}value ={this.state.dashboardShif}>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        </select>
                        Change Image :
                            <div className="form-group">
                                <input className="btn text-black bg " id='image' type='file' 
                                    accept="image/png, image/jpeg, image/jpg" 
                                    onChange={this.handleUploadImage}>
                                </input>
                            </div>
                        
                        </form>
                    </div>
                    <div className ="modal-footer">
                                <input type="submit"
                                className="btn btn-primary"
                                value="Update"
                                onClick={this.updateDashboardData}
                                />           
                    <ToastContainer autoClose={400}/>          
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                        
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}

export default UpdateModal;
