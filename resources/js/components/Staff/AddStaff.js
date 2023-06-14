import React, { Component } from 'react';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '../Dashboard/Navbar/Navbars';
import './staffStyle.css';


class AddStaff extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        login: null,
        tempUploadImage:null,
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
    if (roleLogin == 'Manager' || roleLogin =='Data Entry'){
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
        img:this.state.tempUploadImage!=null?this.state.tempUploadImage.name:"-",
    };
    if(this.state.tempUploadImage!=null){
        this.uploadImage();
      }
    axios.post('/create/add/staff',{data}).then(response=>{
        console.log(response.data);
        toast.success("Add Success");
        setTimeout(() => {
            location.reload();
        }, 1000);
            
    })
}

handleUploadImage = (event) =>{
    console.log(event.target.files[0]);
    var selectedFile = event.target.files[0];
    var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if(selectedFile.size > (1048576*4)){
      alert("Maximum image file size is 4 MB");
    }
    else if(selectedFile.name.length > 20){
      alert("Filename is too longer");
    }
    else if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      this.setState({
        tempUploadImage:selectedFile,
        // imageValue:event.target.files[0].name,
      })
      console.log("Add file.");
    } else {
      console.log("Not found or match type file.");
    }
    
  }

  uploadImage = () =>{
    var formData = new FormData();
    formData.append('file', this.state.tempUploadImage);
    axios.post('/update/uploadFileImage',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    }).then(response =>{
      console.log(response.data);
      this.setState({
        tempUploadImage:null,
      })
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
                    <header className="page-header page-header-dark pb-5">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                            </div>
                        </div>
                    </header>
    <div className="container">
        <Navbars/>
    <div className="col-xl-6">
        <div className="card mb-4">
            <div className="card-header">Add New Staff</div>
            <div className="card-body">
                <form enctype="multipart/form-data">
                    <div className="row gx-10 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" for="id_staff">Staff ID
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className="form-control" id="id_staff" name="id_staff" type="text" maxlength="6" onChange={this.handleStaff} required="required" ></input>
                        </div>
                        <div className="col-md-6">
                            <label className="small mb-1" for="id_rfid">RFID
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className="form-control" id="id_rfid" name="id_rfid" type="text" maxlength="10" onChange={this.handleRfid} required="required" ></input>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" for="prefix">Prefix</label>
                            <select  className="form-control" id="prefix" name="prefix" value={this.state.prefix} onChange={this.handlePrefix} required="required">
                                {/* <option value="0"></option> */}
                                <option value="1">นาย</option>
                                <option value="2">นาง</option>
                                <option value="3">นางสาว</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" for="name_first">First name
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className="form-control" id="name_first" name="name_first" type="text" onChange={this.handleFirst} required="required"></input>
                        </div>
                        <div className="col-md-6">
                            <label className="small mb-1" for="name_last">Last name
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className="form-control" id="name_last" name="name_last" type="text" onChange={this.handleLast} required="required"></input>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" for="id_role">Role
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            {this.state.login == 1 ?
                            <select className="form-control" id="id_role" name="id_role" value={this.state.id_role} onChange={this.handleRole} required="required">
                                <option value="1">Operator</option>
                                <option value="2">Technician</option>
                                <option value="6">Foreman</option>
                                <option value="9">Manager</option>
                                <option value="11">Data Entry</option>
                            </select>:
                            <select className="form-control" id="id_role" name="id_role" value={this.state.id_role} onChange={this.handleRole} required="required">
                            <option value="1">Operator</option>
                            <option value="2">Technician</option>
                        </select>

                            }
                        </div>
                        <div className="col-md-6">
                            <label className="small mb-1" for="id_shif">Team
                            <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select className="form-control" id="id_shif" name="id_shif" value={this.state.id_shif} onChange={this.handleShif} required="required">
                                {/* <option value="0"></option> */}
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-12">
                        Select picture to upload:
                            <input className="btn text-black bg " id='image' type='file' accept="image/png, image/jpeg, image/jpg" onChange={this.handleUploadImage}></input>
                            <br></br>
                        </div>
                    </div>
                    <ToastContainer autoClose={400}/>
                    <button id="submit_button" className="btn btn-primary" type="submit" onClick={this.addStaff}>Add</button>
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

