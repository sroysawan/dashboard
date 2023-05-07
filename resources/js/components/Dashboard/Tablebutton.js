import React, { Component } from 'react';
import EditModal from './Modals/EditModal';
import DeleteModal from './Modals/DeleteModal';
import axios from 'axios';
import UpdateModal from './Modals/UpdateModal';
import { FaEdit } from "react-icons/Fa";
import { FaTrash } from "react-icons/Fa"
import { BiUserCheck } from "react-icons/Bi"

class Tablebutton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            
            currentDashboardStaff: null,
            currentDashboardRfid: null,
            currentDashboardPrefix: null,
            currentDashboardFirst: null,
            currentDashboardLast: null,
            currentDashboardSite: null,
            currentDashboardRole: null,
            currentDashboardShif: null,
            // currentDashboardimg: null,
        }
    }

    //Getting Individual
    getDashboardDetails = (id_staff) => {
        axios.post('/get/individual/dashboard/details',{
            dashboardId: id_staff
        }).then((response) =>{
            this.setState({
                currentDashboardStaff: response.data.id_staff,
                currentDashboardRfid: response.data.id_rfid,
                currentDashboardPrefix: response.data.prefix,
                currentDashboardFirst: response.data.name_first,
                currentDashboardLast: response.data.name_last,
                currentDashboardSite: response.data.site,
                currentDashboardRole: response.data.id_role,
                currentDashboardShif: response.data.id_shif
                // currentDashboardimg: response.data.img
            })
            console.log(response.data);
        })
    }

    render() {
        return (
            <div className="btn-group" role="group">

            <button type="button" 
            className="btn btn-primart"
            data-bs-toggle="modal" 
            data-bs-target={'#editModal'+this.props.eachRowId}
            onClick={() => { this.getDashboardDetails(this.props.eachRowId) }}
            >
                <FaEdit/>
            </button>

            <EditModal modalId= { this.props.eachRowId} dashboardData={ this.state}/>
            
            {/* <button type="button" 
            className="btn btn-info"
            data-bs-toggle="modal" 
            data-bs-target={'#updateModal'+this.props.eachRowId}
            onClick={ () => { this.getDashboardDetails( this.props.eachRowId) }}
            >
                
                update
            </button> */}
    
            <UpdateModal modalId= { this.props.eachRowId} dashboardData={ this.state}/>


            <button type="button"
                    className="btn btn-primart"
                    data-bs-toggle="modal"
                    data-bs-target={'#deleteModal' + this.props.eachRowId}
                    onClick={() => { this.getDashboardDetails(this.props.eachRowId) }}
                >
                    <FaTrash/>
            </button>

            <DeleteModal modalId= { this.props.eachRowId} dashboardData={ this.state}/>


            {/*<button type="button"
                    className="btn btn-primart"
                    data-bs-toggle="modal"
                    data-bs-target={'#detailModal' + this.props.eachRowId}
                    onClick={() => { this.getDashboardDetails(this.props.eachRowId) }}
                >
                    <BiUserCheck/>
            </button>

            <DetailTable modalId= { this.props.eachRowId} dashboardData={ this.state}/>  */}
          </div>
        )
    }
}

export default Tablebutton;
