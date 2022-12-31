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
        axios.get('/update/DashboardRefreshQueue2/',{
            dashboardID: id_machine
        }).then((response) => {
            for(var i=0 ; i<response.data.length ; i++){
                if(response.data[i].id_machine == id_machine){
                    this.setState({
                        currentDashboardIdmc: response.data[i].id_machine,
                        currentDashboardItemno: response.data[i].item_no,
                        currentDashboardOp: response.data[i].operation,
                        currentDashboardDatedue: response.data[i].date_due,
                        currentDashboardQtyaccum: response.data[i].qty_accum,
                        currentDashboardQtyorder: response.data[i].qty_order,
                        currentDashboardQtypercent: response.data[i].qty_percent,
                        currentDashboardIdtask: response.data[i].id_task,
                        currentDashboardIdjob: response.data[i].id_job,
                        currentDashboardDtupdate: response.data[i].datetime_update
                    })
                    break;
                }
            }
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
                <ViewModal2 modalId={this.props.eachRowId} sumResult= {this.state}/>
                </div>          
        );
    }
}
export default DashboardButton2;