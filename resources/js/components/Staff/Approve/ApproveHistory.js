import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApproveRowHtr from './ApproveRowHtr';
import Navbars from '../../Dashboard/Navbar/Navbars';
import { FaSearch } from "react-icons/Fa";
import '../staffStyle.css';
import ReactPaginate from "react-paginate";
export class ApproveHistory extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        approve : [],
        StaffTemp: [],
        currentPage: 0,
        itemsPerPage: 10, 
    }

}
componentDidMount = () => {
    console.log('History');
   this.getApprove();
}

  getApprove = () =>{
      let self = this;
      axios.get('/update/getApprove/history').then(function (response) {
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
        return (data.id_staff && data.id_staff.toLowerCase().includes(txt.toLowerCase())) 
    })
    
      this.setState({
        approve:result,
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
  const currentApproveHtr = this.state.approve.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(this.state.approve.length / itemsPerPage);
  return (
    <div>
    <header className="page-header page-header-dark pb-5"></header>
    <div className="container-fluid px-4 mt-n10">
      <Navbars/>
      <div className="card mb-4 w-100">
      <div className="card-header fw-bold text-white fs-4 d-flex justify-content-between bg-primary">
              <h5>Approve List History</h5>
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
            <div className="card-body">
              <div className="table table-responsive" id="sortTable">
              <table className="table table-bordered table-striped table-responsive">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-center" scope="col">ID Editor</th>
                    <th className="text-center" scope="col">NameEditor</th>
                    <th className="text-center" scope="col">Edit Data</th>
                    <th className="text-center" scope="col">Request date and time</th>
                    <th className="text-center" scope="col">Status</th>
                    <th className="text-center" scope="col">Approve by</th>
                    <th className="text-center" scope="col">Approve date and time</th>
                  </tr>            
                  </thead>
                  <tbody>{
                        currentApproveHtr.map(function (row, key) {
                          return <ApproveRowHtr key={key} data={row}/> })
                        }
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


export default ApproveHistory;

