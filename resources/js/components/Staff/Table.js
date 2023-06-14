import React, { Component } from 'react';
import TableOther from './TableOther';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '../Dashboard/Navbar/Navbars';
import { FaSearch } from "react-icons/Fa";
import './staffStyle.css';
import ReactPaginate from "react-paginate";

class Table extends Component{
  
  constructor(props) {
    super(props);
      
    this.state = {
        Staff : [],
        StaffTemp: [],
        currentPage: 0,
        itemsPerPage: 5, 
        sortConfig: { key: 'id_staff', direction: 'asc' },
        isSorted: false,
    }

}

componentDidMount() {
this.getInfoStaff();
}

getInfoStaff = () => {
let self = this;
axios.get('/update/DashboardStaff/').then(function (response) {
    self.setState({                                                                                                                                                                                                                                                                                                                       
        Staff: response.data,
        StaffTemp:response.data,
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

      //sort
    sortBy =(key) =>{
      let direction = 'asc';
      if (
        this.state.sortConfig &&
        this.state.sortConfig.key === key &&
        this.state.sortConfig.direction === 'asc'
      ) {
        direction = 'desc';
      }
      this.setState({ sortConfig: { key, direction }, isSorted: true  });
    }

    compare =(a, b, direction) =>{
      if (a === b) {
        return 0;
      } else if (a < b) {
        return direction === 'asc' ? -1 : 1;
      } else {
        return direction === 'asc' ? 1 : -1;
      }
    }
    
    renderSortingArrow = (columnKey) =>{
      if (this.state.sortConfig.key === columnKey) {
        return this.state.sortConfig.direction === 'asc' ? '▴' : '▾';
      }
      return '▴';
    }
render() {
  const sortedData = [...this.state.Staff];
  if (this.state.isSorted && this.state.sortConfig.key) {
    sortedData.sort((a, b) =>
      this.compare(
        a[this.state.sortConfig.key],
        b[this.state.sortConfig.key],
        this.state.sortConfig.direction
      )
    );
  }
  const { currentPage, itemsPerPage } = this.state;
  // Logic for displaying current items
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOther = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div>
      <header className="page-header page-header-dark pb-5"></header>
       <div className="container-fluid px-4 mt-n10">
      <Navbars/>
      <div className="card mb-4 w-100">
       <div className="card-header fw-bold text-white fs-4 d-flex justify-content-between bg-primary">
         <div>Other Staff List</div>
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
                                    placeholder="Search id, RFID, Name" 
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
                    <th className="text-center" scope="col">StaffID
                    <span className="mc-box sortable-header" 
                    onClick={() => this.sortBy('id_staff')}>{this.renderSortingArrow('id_staff')}
                    </span>
                    </th>
                    <th className="text-center" scope="col">RFID</th> 
                    <th className="text-center" scope="col">Prefix</th>
                    <th className="text-center" scope="col">Name</th>
                    <th className="text-center" scope="col">Role</th>
                    {/* <th className="text-center" scope="col">Shif</th> */}
                    <th className="text-db-center" scope="col">Picture</th>
                    <th className="text-center" scope="col">Status</th>
                    <th className="text-center" scope="col">Operation</th>
                    
                  </tr>            
                  </thead>
                  <tbody>
                      {
                        currentOther.map(function (row, key) {
                              return <TableOther key={key} data={row}/> 
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


export default Table;

