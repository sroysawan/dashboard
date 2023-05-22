import React, { Component } from 'react';
// import Tablebutton from './Tablebutton';

class ApproveRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // approve_status : this.props.data.status,
            approve_status:"",
        }
    }

    componentDidMount = () =>{
        let status;
        if(this.props.data.status == 1){
            status = 'อนุมัติ'
        }
        else if(this.props.data.status == 2){
            status = 'รออนุมัติ'
        }
        else if(this.props.data.status == 3){
            status = 'ไม่อนุมัติ'
        }
        this.setState({
            approve_status:status,
        })
    }

    showbutton = () =>{
        let i = 1;
        if(i=1){
            return (
                <center>
            <tr > 
                <td>
                    <button type="button" 
                            className="btn btn-success"
                            onClick={() => { this.confirmEdit(true, this.props.data.id_approve) }}
                            disabled={this.props.data.status==1||this.props.data.status==3?true:false}
                            >
                            อนุมัติ
                    </button>
                    </td>
                    <td>                          
                    <button type="button" 
                            className="btn btn-danger "
                            onClick={() => { this.confirmEdit(false, this.props.data.id_approve) }}
                            disabled={this.props.data.status==1||this.props.data.status==3?true:false}
                            >
                            ไม่อนุมัติ
                    </button></td>
                    {/* {this.props.data.status==2?'ดำเนินการแล้ว':''} */}
                    </tr>  </center> 
                    );
        }

    }

    confirmEdit = (isConfirm, id) =>{
        let reqData = {id_approve : id,
                       confirm_approve : isConfirm,
                        role_approve : localStorage.getItem('token')};
            // console.log(reqData);
            axios.post('/update/approve/confirm',reqData).then(response=>{
                console.log(response.data);
            });
            setTimeout(() => {
                     location.reload();
                 },500)
    }
 

    render() {


        return (
            <tr>
                {/* <td>{ this.props.data.id_approve}</td>
                <td>{ this.props.data.id_foreman}</td> */}
                <td>{ this.props.data.id_staff }</td>
                {/* <td></td> */}
                <td>{ this.props.data.id_manager }</td>
                {/* <td>{ this.props.data.prefix}</td>
 
                <td>{ this.props.data.name}</td>
                <td>{ this.props.data.role}</td> */}
                <td>{ this.props.data.edit_data.split(", ").map((item, index) => <React.Fragment key={index}>{item}<br/></React.Fragment>) }</td>
                {/* <td>{ this.props.data.new_data}</td> */}
                <td>{ this.props.data.update_history }</td>
                <td className='status-w'>{ this.state.approve_status}</td>
                <td className='btn-w'>
                    {this.showbutton()}

                </td>
                <td>{ this.props.data.id_foreman }</td>
            <td>{ this.props.data.approve_datetime }</td>
            </tr>
        )
    }
}

export default ApproveRow;
