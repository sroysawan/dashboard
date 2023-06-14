import React, { Component } from 'react';
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
            currentDashboardShif: null,
            currentDashboardStatus: null,

            status:'',
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
                currentDashboardShif: response.data.id_shif,
                currentDashboardStatus: response.data.status_staff,

                // status_approve : response.data.status_approve,
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

    renderStaffStatus() {
        switch(this.props.dashboardData.currentDashboardStatus) {
            case 0:
                return 'ลาออก';
            case 1:
                return 'ทำงาน';
            case 2:
                return 'ทำงาน (Manual)';
            default:
                return '';
        }
    }

    render() {
        return (
            <div 
            className="modal fade" 
            id={"editModal"+this.props.modalId } 
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Staff</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <table id="modal_table_current" class="table table-striped">
                            <tbody>
                                    <tr>
                                        <td>Staff ID:</td>
                                        <td>
                                            {this.props.dashboardData.currentDashboardStaff}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>RFID ID:</td>
                                        <td>
                                            {this.props.dashboardData.currentDashboardRfid}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Prefix:</td>
                                        <td>
                                            {this.convert_Prefix(this.props.dashboardData.currentDashboardPrefix)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>First name:</td>
                                        <td>
                                            {this.props.dashboardData.currentDashboardFirst}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Last name:</td>
                                        <td>
                                            {this.props.dashboardData.currentDashboardLast}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Role:</td>
                                        <td>
                                            {this.convert_Role(this.props.dashboardData.currentDashboardRole)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Shif:</td>
                                        <td>
                                            {this.props.dashboardData.currentDashboardShif}
                                        </td>
                                    </tr>   
                                    <tr>
                                        <td>Status:</td>
                                        <td>
                                        { this.renderStaffStatus() }
                                        </td>
                                    </tr> 
                            </tbody>
                        </table>
                    </div>


                    <div className ="modal-footer">
                    <button type="button" 
                            className={this.props.dashboardData.approve_status ? 'btn btn-danger' : 'btn btn-primary'}
                            data-bs-toggle="modal" 
                            data-bs-target={'#updateModal'+this.props.modalId}
                            onClick={ () => { this.getDashboardDetails(this.props.modalId) }}
                            disabled={this.props.dashboardData.approve_status}
                    >
                            {this.props.dashboardData.approve_status ? 'อยู่ระหว่างการแก้ไข' : 'Edit'}
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
