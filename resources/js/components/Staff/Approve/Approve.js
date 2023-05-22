import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CreateModal from '../Dashboard/Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApproveRow from './ApproveRow';
import Navbars from '../../Dashboard/Navbar/Navbars';
import { GrHistory } from "react-icons/Gr"
import { FaSearch } from "react-icons/Fa";
import '../staffStyle.css';
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
       <div>
      <header className="page-header page-header-dark pb-5"></header>
       <div className="container">
      <Navbars/>
      <div className="card mb-4 w-100">
       <div className="card-header fw-bold text-white fs-4 d-flex justify-content-between bg-primary">
         <div>Approve List</div>
         <button type='button'>
    <Link to="/history">
        <GrHistory/> History
    </Link>
</button>
         </div>
         <div className="card-header text-black">
               <div className="d-flex">
               <div className="p-2 ms-auto">
                                <div className="input-wrapper">
                                    <FaSearch id="search-icon"/>
                                    <input 
                                    className="search-input"
                                    id="myInput" 
                                    onChange={(event) => { this.Search(event)}}
                                    placeholder="Search for names.." 
                                    title="Type in a name"></input>
                    </div>
                    </div>
                   </div>
                </div>
            <div class="card-body">
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
                    <th className="text-center" scope="col">Request date and time</th>
                    <th className="text-center" scope="col">Status</th>
                    <th className="text-center" scope="col">Approve</th>
                    {/* <th className="text-center" scope="col">Approve by</th>
                    <th className="text-center" scope="col">Approve date and time</th> */}

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
      </div>
    );
  }
}


export default Approve;

