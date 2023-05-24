import React, { Component } from 'react';
import TableRow from './TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './Modals/CreateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '../Dashboard/Navbar/Navbars';
import DataTable from 'react-data-table-component';
import { FaSearch } from "react-icons/Fa";
import './staffStyle.css';
import ReactPaginate from "react-paginate";
class TableOperator extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        Staff : [],
        StaffTemp: [],
        currentPage: 0,
        itemsPerPage: 5, 
    }

}
componentDidMount() {
  this.getInfoStaff();
  }
  
  getInfoStaff = () => {
  let self = this;
  axios.get('/update/DashboardStaff/operator').then(function (response) {
    console.log(response.data);
      self.setState({                                                                                                                                                                                                                                                                                                                       
          Staff: response.data,
          StaffTemp : response.data,
      });
  });
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

          //Pagination
          handlePageClick = (data) => {
            this.setState({ currentPage: data.selected });
          };
          handleItemsPerPageChange = (event) => {
              const itemsPerPage = parseInt(event.target.value);
              this.setState({ itemsPerPage, currentPage: 0 });
          };
render() {
  const { currentPage, itemsPerPage } = this.state;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOperator = this.state.Staff.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(this.state.Staff.length / itemsPerPage);
  return (
<div>
      <header className="page-header page-header-dark pb-5"></header>
       <div className="container-fluid px-4 mt-n10">
      <Navbars/>
      <div className="card mb-4 w-100">
       <div className="card-header fw-bold text-white fs-4 d-flex justify-content-between bg-primary">
         <div>Operator Staff List</div>
         </div>
         <div className="card-header text-black">
               <div className="d-flex">
               <div className="p-2 custom-header">
                                <label>Row per page: </label>
                                <select value={itemsPerPage} onChange={this.handleItemsPerPageChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                </select>
                </div>
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
                  <tr className="bg-warning text-dark">
                    <th className="text-center" scope="col">StaffID</th>
                    <th className="text-center" scope="col">RFID</th> 
                    <th className="text-center" scope="col">prefix</th>
                    <th className="text-center" scope="col">Name</th>
                    <th className="text-center" scope="col">Role</th>
                    <th className="text-center" scope="col">Shif</th>
                    <th className="text-center" scope="col">Picture</th>
                    <th className="text-center" scope="col">Status</th>
                    <th className="text-center" scope="col">Operation</th>
                  </tr>            
                  </thead>
                  <tbody>
                      {
                        currentOperator.map(function (row, key) {
                              return <TableRow key={key} data={row} /> 
                      })}
                  </tbody>
              </table>
              </div>
              <div className="d-flex justify-content-center mt-3 pagination">
                            <div className="dataTables_paginate">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                            </div>
                            </div>
            </div>
          </div>
      </div>
      </div>
      
    );
  }
}


export default TableOperator;

