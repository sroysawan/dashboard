import React, { Component } from 'react';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


class AddStaff extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        Staff : [],
    }

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
    <div class="col-xl-6">
        <div class="card mb-4">
            <div class="card-header">Add New Staff</div>
            <div class="card-body">
                <form method="post" action="pp-staff-add-action.php" enctype="multipart/form-data">
                    <div class="row gx-10 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_staff">Staff ID</label>
                            <input class="bg wi" id="id_staff" name="id_staff" type="text" maxlength="6" required="required"></input>
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_rfid">RFID</label>
                            <input class="bg wi" id="id_rfid" name="id_rfid" type="text" maxlength="10" required="required"></input>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="prefix">Prefix</label>
                            <select  class="bg wi" id="prefix" name="prefix" required="required">
                                <option value="0"></option>
                                <option value="1">นาย</option>
                                <option value="2">นาง</option>
                                <option value="3">นางสาว</option>
                            </select>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="name_first">First name</label>
                            <input class="bg wi" id="name_first" name="name_first" type="text" required="required"></input>
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="name_last">Last name</label>
                            <input class="bg wi" id="name_last" name="name_last" type="text" required="required"></input>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_role">Role</label>
                            <select class="bg wi" id="id_role" name="id_role" required="required">
                                <option value="0"></option>
                                <option value="1">Operator</option>
                                <option value="2">Technician</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="id_shif">Team</label>
                            <select class="bg wi" id="id_shif" name="id_shif" required="required">
                                <option value="0"></option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-12">
                        Select picture to upload:
                            <input class="btn text-black bg " type="file" name="fileToUpload" id="fileToUpload"></input>
                            <br></br>
                        </div>
                    </div>
                    <button id="submit_button" class="btnt" type="submit" disabled>Add</button>
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

