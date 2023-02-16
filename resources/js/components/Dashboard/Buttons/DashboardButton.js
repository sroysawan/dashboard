import axios from 'axios';
import React, { Component } from 'react';
import {FaRegEdit} from 'react-icons/Fa';
import ViewModal from '../Modals/ViewModal';


class DashboardButton extends Component{

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
        }
    }

    
    //Getting Indivvidual Dashboard data
    // getDashboardDetails = (id_machine) => {
    //     console.log(id_machine);
    //     axios.post('/get/indivvidual/dashboard/details',{
    //         dashboardID: id_machine
        getDashboardDetailsNewDB = (id_machine) => {
            console.log(id_machine);
            axios.get('/get/indivvidual/dashboard/detailsNew',{
                dashboardID: id_machine
        }).then((response) => {
            this.setState({
                currentDashboardIdmc: response.data.id_machine,
                currentDashboardItemno: response.data.item_no,
                currentDashboardOp: response.data.operation,
                currentDashboardDatedue: response.data.date_due,
                currentDashboardQtypertray: response.data.qty_per_tray,
                currentDashboardQtyaccum: response.data.qty_accum,
                currentDashboardQtyorder: response.data.qty_order,
                currentDashboardQtypercent: response.data.qty_percent,
                currentDashboardIdtask: response.data.id_task,
                currentDashboardDtupdate: response.data.datetime_update
            })
           console.log(response.data);
          //console.log(this.getDashboardDetailsNewDB);
           //console.log(Object.values(response.data));
             //console.log(response.data[1]);
        })
    }
    
    render(){
        return(    
            <div className='btn-group' role="group">
                <button type="button" 
                className="btn" 
                data-bs-toggle="modal" 
                data-bs-target={'#viewModal'+this.props.eachRowId}
                onClick={ () => { this.getDashboardDetailsNewDB(this.props.eachRowId)}}
                >
                <FaRegEdit/>
                </button>  
                <ViewModal modalId={this.props.eachRowId} sumResult= {this.state}/>
                </div>          
        );
    }
}
export default DashboardButton;