import axios from 'axios';
import React, { Component } from 'react';
import {FaRegEdit} from 'react-icons/Fa';
import ViewModal2 from '../Modals/ViewModal2';


class DashboardButton2 extends Component{

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
            currentDashboardIdjob: null,
            currentDashboardDtupdate: null,
        }
    }

    
    //Getting Indivvidual Dashboard data
    getDashboardDetails = (id_machine) => {
        console.log(id_machine);
        axios.get('/update/DashboardRefreshQueue2/',{ params: { dashboardID: id_machine } }
        ).then((response) => {
            console.log(response.data);
                    console.log("123");
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
                
            
            // console.log(response.data[1]);
        })


    }
    
    render(){
        return(    
            <div className='btn-group' role="group">
                <button type="button" 
                className="btn" 
                data-bs-toggle="modal" 
                data-bs-target={'#viewModal2'+this.props.eachRowId}
                onClick={ () => { this.getDashboardDetails(this.props.eachRowId)}}
                >
  
                <FaRegEdit/>
                </button>  
                <ViewModal2 modalId={this.props.eachRowId} dashboardData= {this.state} level={this.props.level}/>
                </div>          
        );
    }
}
export default DashboardButton2;