import React, { Component } from 'react';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '../Dashboard/Navbar/Navbars';


class AddStaff extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        login: null,
        // Staff : [],
        id_staff:null,
        id_rfid:null,
        prefix: "1",
        name_first:'',
        name_last:'',
        id_role:"1",
        id_shif:"A",

    }

}

componentDidMount = () =>{
    var roleLogin = localStorage.getItem('token');
    if (roleLogin == 'manager' || roleLogin =='employee'){
        this.setState({
            login:1
        });
    }
    else{
        this.setState({
            login:2
        });
    }
}
addStaff = (event) =>{
event.preventDefault();
    var data = {
        id_staff:this.state.id_staff,
        id_rfid:this.state.id_rfid,
        prefix: this.state.prefix,
        name_first:this.state.name_first,
        name_last:this.state.name_last,
        id_role:this.state.id_role,
        id_shif:this.state.id_shif,
    };
    axios.post('/create/add/staff',{data}).then(response=>{
        console.log(response.data);
    })
    
}

handleStaff = (event) => {
    this.setState({
        id_staff: event.target.value,
    });
}
//Update  
handleRfid = (event) => {
    this.setState({
        id_rfid: event.target.value,
    });
}
//Update  
handlePrefix = (event) => {
    this.setState({
        prefix: event.target.value,
    });
}
//Update  
handleFirst = (event) => {
    this.setState({
        name_first: event.target.value,
    });
}
//Update  
handleLast = (event) => {
    this.setState({
        name_last: event.target.value,
    });
}
handleRole = (event) => {
    this.setState({
        id_role: event.target.value,
    });
}
//Update  
handleShif = (event) => {
    this.setState({
        id_shif: event.target.value,
    });
}

render() {
  return (
  <div id="layoutSidenav_content">
                <main>
                    <header class="page-header page-header-dark pb-5">
                        <div class="container-xl px-4">
                            <div class="page-header-content pt-4">
                            </div>
                        </div>
                    </header>
    <div class="container">
        <Navbars/>
    <div class="col-xl-6">
        <div class="card mb-4">
            <div class="card-header">Add New Staff</div>
            <div class="card-body">
                <form enctype="multipart/form-data">
                    <div class="row gx-10 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_staff">Staff ID</label>
                            <input class="bg wi" id="id_staff" name="id_staff" type="text" maxlength="6" onChange={this.handleStaff} required="required" ></input>
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_rfid">RFID</label>
                            <input class="bg wi" id="id_rfid" name="id_rfid" type="text" maxlength="10" onChange={this.handleRfid} required="required" ></input>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="prefix">Prefix</label>
                            <select  class="bg wi" id="prefix" name="prefix" value={this.state.prefix} onChange={this.handlePrefix} required="required">
                                {/* <option value="0"></option> */}
                                <option value="1">นาย</option>
                                <option value="2">นาง</option>
                                <option value="3">นางสาว</option>
                            </select>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="name_first">First name</label>
                            <input class="bg wi" id="name_first" name="name_first" type="text" onChange={this.handleFirst} required="required"></input>
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="name_last">Last name</label>
                            <input class="bg wi" id="name_last" name="name_last" type="text" onChange={this.handleLast} required="required"></input>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_role">Role</label>
                            {this.state.login == 1 ?
                            <select class="bg wi" id="id_role" name="id_role" value={this.state.id_role} onChange={this.handleRole} required="required">
                                <option value="1">Operator</option>
                                <option value="2">Technician</option>
                                <option value="3">Production Support</option>
                                <option value="4">Instructor</option>
                                <option value="5">Senior Instructor</option>
                                <option value="6">Foreman</option>
                                <option value="7">Leader</option>
                                <option value="8">Senior Technician</option>
                                <option value="9">Manager</option>
                                <option value="10">Engineering</option>
                            </select>:
                            <select class="bg wi" id="id_role" name="id_role" value={this.state.id_role} onChange={this.handleRole} required="required">
                            <option value="1">Operator</option>
                            <option value="2">Technician</option>
                        </select>

                            }
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_shif">Team</label>
                            <select class="bg wi" id="id_shif" name="id_shif" value={this.state.id_shif} onChange={this.handleShif} required="required">
                                {/* <option value="0"></option> */}
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-12">
                        Select picture to upload:
                            <input class="btn text-black bg " type="file" name="fileToUpload" id="fileToUpload" accept=".png,jpg"></input>
                            <br></br>
                        </div>
                    </div>
                    <button id="submit_button" class="btnt" type="submit" onClick={this.addStaff}>Add</button>
                </form>
            </div>
        </div>
    </div>
</div>
</main>
</div>         
    );
  }
}

export default AddStaff;

