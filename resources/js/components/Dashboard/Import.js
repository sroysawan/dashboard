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
        <div class="container-xl px-4 mt-n10">
            <div class="card mb-4" id="table-machine">
                <div class="card-header bg-dark fw-bold text-white">Upload Staff File</div>
                <div class="card-body">
                    <form class="text-black" action="pp-staff-upload-action.php" method="post" enctype="multipart/form-data">
                        Select file to upload:
                        <input class="btn text-black" type="file" name="fileToUpload" id="fileToUpload" accept=".xls"></input>
                        <br></br>
                        <input class="btn btn-primary" type="submit" value="Upload!" name="submit"></input>
                        <br></br><br></br>
                    </form>
                </div>
            </div>
        </div>
    </main>
</div>

    );
  }
}

export default AddStaff;

