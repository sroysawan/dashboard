import React, { Component } from 'react';
import UpdateModal from './UpdateModal';


class EditModal extends Component {

    constructor(props) {
        super(props);
        this.state={
            currentDashboardStaff: null,
            currentDashboardRfid: null,
            currentDashboardPrefix: null,
            currentDashboardFirst: null,
            currentDashboardLast: null,
            //currentDashboardSite: null,
            currentDashboardRole: null,
            currentDashboardShif: null
            // dashboardimg: null,  
        }
    }

    getDashboardDetails = (id_staff) => {
        axios.post('/get/individual/dashboard/details',{
            dashboardId: id_staff
        }).then((response) =>{
            console.log(response.data);
            this.setState({
                currentDashboardStaff: response.data.id_staff,
                currentDashboardRfid: response.data.id_rfid,
                currentDashboardPrefix: response.data.prefix,
                currentDashboardFirst: response.data.name_first,
                currentDashboardLast: response.data.name_last,
                //currentDashboardSite: response.data.site,
                currentDashboardRole: response.data.id_role,
                currentDashboardShif: response.data.id_shif
                // currentDashboardimg: response.data.img
            })
            
        })
    }

    convert_Prefix =(in_prefix)=>{
        if(in_prefix == 1){
            return  "นาย"
        }
        else if(in_prefix == 2){
            return  "นาง"
        }
        else if(in_prefix == 3){
            return  "นางสาว"
        }
    }

    convert_Role =(in_role)=>{
        if(in_role == 1){
            return  "Operator"
        }
        else if(in_role == 2){
            return  "Technician"
        }
        else if(in_role == 3){
            return  "Production Support"
        }
        else if(in_role == 4){
            return  "Instructor"
        }
        else if(in_role == 5){
            return  "Senior Instructor"
        }
        else if(in_role == 6){
            return  "Foreman"
        }
        else if(in_role == 7){
            return  "Leader"
        }
        else if(in_role == 8){
            return  "Senior Technician"
        }
        else if(in_role == 9){
            return  "Manager"
        }
        else if(in_role == 10){
            return  "Engineering"
        }
    }

    render() {
        return (
            <div className="modal fade" id={"editModal"+this.props.modalId } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Staff</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

      
                        Staff ID : <strong>{ this.props.dashboardData.currentDashboardStaff} </strong>
                        
                        <hr/>
                        RFID : <strong>{ this.props.dashboardData.currentDashboardRfid} </strong>
                        
                        <hr/>
                        Prefix : <strong>{ this.convert_Prefix(this.props.dashboardData.currentDashboardPrefix)}</strong>
                        <hr/>
                        First name : <strong>{ this.props.dashboardData.currentDashboardFirst} </strong>
                        
                        <hr/>
                        Last name : <strong>{ this.props.dashboardData.currentDashboardLast} </strong>
                        
                        {/*<hr/>
                        Site : <strong>{ this.props.dashboardData.currentDashboardSite} </strong>
                        */}
                        <hr/>
                        Role : <strong>{ this.convert_Role(this.props.dashboardData.currentDashboardRole)} </strong>
                        
                        <hr/>
                        Shif : <strong>{ this.props.dashboardData.currentDashboardShif} </strong>
                        {/* <select className='form-select' aria-label="Disabled select example" disabled id="dashboardStaff" onChange={this.inputDashboardShif}value ={this.state.dashboardShif}>
                        <option selected=" ">กรุณาเลือก...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        </select> */}
                    </div>


                    <div className ="modal-footer">

                    <button type="button" 
                            className="btn btn-info"
                            data-bs-toggle="modal" 
                            data-bs-target={'#updateModal'+this.props.modalId}
                            onClick={ () => { this.getDashboardDetails(this.props.modalId) }}
                    >
                            update
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                    
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditModal;
