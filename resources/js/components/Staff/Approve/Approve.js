import React, { Component } from 'react';
// import TableRow from '../Dashboard/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CreateModal from '../Dashboard/Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApproveRow from './ApproveRow';
import Navbars from '../../Dashboard/Navbar/Navbars';

export class Approve extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        approve : [],
        StaffTemp: [],
    }

}
componentDidMount = () => {
   this.getApprove();
}

  getApprove = () =>{
      let self = this;
      axios.get('/update/getApprove').then(function (response) {
        console.log(response.data);
        self.setState({                                                                                                                                                                                                                                                                                                                       
              approve: response.data,
              StaffTemp : response.data,
          });
          
      });
  }

  confirmEdit = () => {

  }
  Search = (event) => {
    var txt = event.target.value;
    var result =[];
    if(txt.lenght <= 0){
      result = this.state.StaffTemp;
    }
    else{
      result = this.state.StaffTemp.filter(data=>{
        return data.id_staff.toLowerCase().includes(txt.toLowerCase()) ||
        data.name_last.toLowerCase().includes(txt.toLowerCase()) ||
        data.name_first.toLowerCase().includes(txt.toLowerCase()) ||
        data.id_rfid.toLowerCase().includes(txt.toLowerCase()) 
      })
      this.setState({
        Staff:result,
      });
      result = [];
  
    }
  
    }
render() {
  return (
    <div className="container">
      <Navbars/>
          <div class="card ">
            <div class="container p-3 my-0 bg-primary text-white rounded-top">
              <h5>Approve List</h5>
            </div>
            <div class="card-body">
              <center>
              <input type="text"  class="form-control se" id="myInput" onChange={(event) => { this.Search(event)}}placeholder="Search for names.." title="Type in a name"></input>
              </center><br></br>
              <div class="table table-responsive" id="sortTable">
              <table className="table table-bordered table-striped table-responsive">
                <thead>
                  <tr className="bg-primary text-white">
                    {/* <th className="text-center" scope="col">ID Approve</th> */}
                    <th className="text-center" scope="col">ID Editor</th>
                    <th className="text-center" scope="col">NameEditor</th>
                    {/* <th className="text-center" scope="col">Type</th> */}
{/*                    
                    <th className="text-center" scope="col">Prefix</th>
                    <th className="text-center" scope="col">Name</th>
                    
                    <th className="text-center" scope="col">Role</th> */}
                    <th className="text-center" scope="col">Edit Data</th>
                    {/* <th className="text-center" scope="col">New Data</th> */}
                    <th className="text-center" scope="col">Update date and time</th>
                    <th className="text-center" scope="col">Status</th>
                    <th className="text-center" scope="col">Approve</th>
                    <th className="text-center" scope="col">Approve by</th>
                    <th className="text-center" scope="col">Approve date and time</th>

                  </tr>            
                  </thead>
                  <tbody>{
                        this.state.approve.map(function (row, key) {
                          return <ApproveRow key={key} data={row}/> })
                        }
                  </tbody>
              </table>
              </div>
            </div>
          </div>
      </div>
    );
  }
}


export default Approve;

