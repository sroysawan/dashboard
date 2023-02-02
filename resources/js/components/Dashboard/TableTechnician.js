import React, { Component } from 'react';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


class TableTechnician extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        Staff : [],
    }

}

componentDidMount() {
this.getInfoStaff();
}

getInfoStaff = () => {
let self = this;
axios.get('/update/DashboardStaff/technician').then(function (response) {
    self.setState({                                                                                                                                                                                                                                                                                                                       
        Staff: response.data
    });
});
}

 Search = () => {
  var txt = document.getElementById("myInput").value;
  console.log(txt);
  axios.get('/api/search/' + txt).then(function (response) {
});
 
}


render() {
  return (
    <div className="container">
          <div class="card ">
            <div class="container p-3 my-0 bg-danger text-white rounded-top">
              <h5>Staff List</h5>
            </div>
            <div class="card-body">
              <center>
              <input type="text"  class="form-control rounded" id="myInput" onKeyUp={() => { this.Search()}}placeholder="Search for names.." title="Type in a name"></input>
              </center><br></br>
              <div class="table table-responsive" id="sortTable">
              <table className="table table-bordered table-striped table-responsive">
                <thead>
                  <tr className="bg-warning text-dark">
                    <th className="text-center" scope="col">StaffID</th>
                    <th className="text-center" scope="col">RFID</th> 
                    <th className="text-center" scope="col">prefix</th>
                    <th className="text-center" scope="col">Name</th>
                    <th className="text-center" scope="col">Role</th>
                    <th className="text-center" scope="col">Shif</th>
                    <th className="text-center" scope="col">Picture</th>
                    <th className="text-center" scope="col">Operation</th>
                    
                  </tr>            
                  </thead>
                  <tbody>
                      {
                        this.state.Staff.map(function (row, key) {
                              return <TableRow key={key} data={row} /> 
                      })}
                  </tbody>
              </table>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default TableTechnician;

