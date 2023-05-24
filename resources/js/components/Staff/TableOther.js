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
            status:'',
        }
    
    }
    
    componentDidMount() {
        if(this.props.data.status_staff == 0){
            this.setState({
                status:'ลาออก'
            });
        }
        else if (this.props.data.status_staff == 1){
            this.setState({
                status:'ทำงาน'
            });
        }else{
            this.setState({
                status:'ทำงาน (Manual)'
            });
        }
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
                <td>{ this.props.data.staff_img!='-'||null ? <img src={"images/staff/"+encodeURI(this.props.data.staff_img)} width="90" height="120" alt={"Image ID : "+this.props.data.staff_img} />:this.props.data.staff_img }</td>
                <td>{ this.state.status }</td>
                <td>
                    <Tablebutton eachRowId={ this.props.data.id_staff} level={this.state.isForeman} />
                </td>
            </tr>
        )
    }
}

export default TableOther;
