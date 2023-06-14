import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '../Dashboard/Navbar/Navbars';
import Form from 'react-bootstrap/Form';
class ImportStaff extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        fileData: null,
        dataImport:null,
    }

}

handleChange = (event) => {
      
    console.log(event);
    this.setState({fileData: event.target.files[0]});
  }


  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.fileData == null){
      return alert("file not found");
    }
    // console.log(this.state.fileData);
    var dataImport = new FormData();
    dataImport.append('file',this.state.fileData);
    axios.post('/update/uploadImport',dataImport,{
      headers:{'Content-Type': 'multipart/form-data'},
      onUploadProgress:progressEvent => {
        console.log(`Upload progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
      }}).then(response =>{
      console.log(response.data);
      document.getElementById("import_upload").value = "";
      
        var name = {filename:this.state.fileData.name};
        axios.post('/update/uploadStaff',name).then(response =>{
          console.log(response.data);
          this.setState({
            fileData:null,
          });
          // alert('Import success.');
          toast.success("Import Success");
          // setTimeout(() => {
          //     location.reload();
          // }, 1000);
      }).catch(err=>{
        console.log(err);
          this.setState({
            fileData:null,
          });
          alert('Import fail.');
      })
    })
    
    
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
        <div class="container-xl px-4 mt-n10">
            <Navbars />
            <div class="card mb-4" id="table-machine">
                <div class="card-header bg-dark fw-bold text-white">Upload Staff File</div>
                <div class="card-body">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                        <Form.Label className='text-black'><b>Select import file : </b></Form.Label>
                        <Form.Control type='file' id="import_upload" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.handleChange}/>
                        </Form.Group>
                    <ToastContainer autoClose={400}/>
                        <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#346FE7' }} type="submit" value="Import"/>
                    </Form>
                </div>
            </div>
        </div>
    </main>
</div>

    );
  }
}

export default ImportStaff;

