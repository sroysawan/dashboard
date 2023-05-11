import React, { Component } from 'react';
import Tablebutton from './Tablebutton';

class TableOther extends Component {

    constructor(props) {
        super(props);
          
        this.state = {
            Staff : [],
            StaffTemp: [],
            isManager:false,
            isDataEntry:false,
            isForeman:false,
        }
    
    }
    
    componentDidMount() {
    var user = localStorage.getItem('token');
            if(user == 'employee'){
                this.setState({
                    isDataEntry:true
                })
            }
            else if(user == 'manager'){
                this.setState({
                    isManager:true
                })
            }
            else if(user == 'foreman'){
                this.setState({
                    isForeman:true
                })
            }
            else{
                window.location.href = '/login';
            }
    }

    render() {


        return (
            <tr>
                <td>{ this.props.data.id_staff}</td>
                <td>{ this.props.data.id_rfid }</td>
                <td>{this.props.data.prefix}</td>
                <td>{ this.props.data.name_first+"   "+this.props.data.name_last}</td>
                {/* <td>{ this.props.data.site }</td> */}
                <td>{this.props.data.role}</td>
                <td>{ this.props.data.id_shif }</td>
                <td>{ this.props.data.staff_img }</td>
                <td>
                    <Tablebutton eachRowId={ this.props.data.id_staff} level={this.state.isForeman} />
                </td>
            </tr>
        )
    }
}

export default TableOther;
