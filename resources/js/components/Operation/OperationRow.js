import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaCommentsDollar, FaFlag } from "react-icons/Fa";
import Blink from 'react-blink-text';


var frequency = 10000; // 10 seconds in miliseconds
var interval_update = 0;

var qty_comp;
var percent;
var run_time_open;
var runtimes;

class OperationRow extends Component {

    constructor(props) {
        super(props);
    }

    getQtyComp = (qty_complete,qty_process,divider) =>{           
        qty_comp = qty_complete + Math.floor(qty_process*divider);
        return qty_comp;
    }

    getformatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }

    render() {
        return (           
            <tr>      
                            
                <td>{  }</td>  
                <td>{ this.props.data.id_job }</td>  
                <td>{ this.props.data.work_order }</td>  
                <td>{ this.props.data.item_no }</td>  
                <td>{ this.props.data.machine }</td>  
                <td>{ this.props.data.operation }</td>  
                <td>{ this.props.data.op_color }</td>  
                <td>{ this.props.data.op_side }</td> 
                <td>{ this.getQtyComp(this.props.data.qty_complete,this.props.data.qty_process,this.props.data.divider) } / { this.props.data.qty_order }</td>  
                <td>{ this.props.data.qty_open }</td>  
                <td>{ this.props.data.date_due }</td>  
                <td></td>  
         
            </tr>
        );
    }
}

export default OperationRow;
                                                                                         