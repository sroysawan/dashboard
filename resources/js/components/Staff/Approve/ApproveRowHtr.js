import React, { Component } from 'react';

class ApproveRowHtr extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    confirmEdit = (isConfirm, id) =>{
        let reqData = {id_approve : id,
                       confirm_approve : isConfirm,
                        role_approve : localStorage.getItem('token')};
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
                <td>{ this.props.data.id_staff }</td>
                <td>{ this.props.data.id_manager }</td>
                <td>{ this.props.data.edit_data.split(", ").map((item, index) => <React.Fragment key={index}>{item}<br/></React.Fragment>) }</td>
                <td>{ this.props.data.update_history }</td>
                <td className='status-w'>
                <button className={`btn ${this.state.approve_status === 'อนุมัติ' ? 'button-approve' : 'button-disapprove'}`} 
                        disabled>
                    { this.state.approve_status}
                </button>
                </td>
                <td>{ this.props.data.id_foreman }</td>
            <td>{ this.props.data.approve_datetime }</td>
            </tr>
        )
    }
}

export default ApproveRowHtr;
