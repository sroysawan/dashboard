import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbars from '../Dashboard/Navbar/Navbars';
import ReactPaginate from "react-paginate";
import "./operationStyle.css";
import { FaSearch } from "react-icons/Fa";

var tempData = [];
class DataOperation extends Component {
    constructor(props) {
        super(props);
        // console.log("Data received:", this.props.location.state.data);
        this.state = {
            data: this.props.location.state.data,
            machine_queues: this.props.location.state.machine_queues,
            modalId: this.props.location.state.modalId,
            currentOperation: this.props.location.state.currentDashboardOp,
            currentPage: 0,
            itemsPerPage: 10,            
            searchValue: "",
            SearchChangeOperation: this.props.location.state.data,
        };
    }

    //Pagination
    handlePageClick = (data) => {
      this.setState({ currentPage: data.selected });
    };
    handleItemsPerPageChange = (event) => {
        const itemsPerPage = parseInt(event.target.value);
        this.setState({ itemsPerPage, currentPage: 0 });
    };

     //search
     searchData = (event) => {
      this.state.SearchChangeOperation.map((x) => {
          if (
              x.operation.toLowerCase().includes(event.target.value.toLowerCase()) ||
              x.id_job.toLowerCase().includes(event.target.value.toLowerCase()) ||
              x.item_no.toLowerCase().includes(event.target.value.toLowerCase()) 
          ) {
              tempData.push(x);
              this.setState({
                  searchValue: event.target.value,
                  data: tempData,
              });
          } else if (event.target.value === "") {
              this.setState({
                  data: SearchChangeOperation,
                  searchValue: event.target.value,
              });
          } else if (
              this.setState({
                  searchValue: event.target.value,
                  data: tempData,
              }) === -1
          ) {
          }
      });
      tempData = [];
  };

  handleAddTo = async (id_job, operation_new, id_machine) => {
    console.log('Data sent to Laravel:', { id_job, operation_new, id_machine });
    try {
      const response = await axios.post('/add/Operation', {
        id_job: id_job,
        operation_new: operation_new,
        id_machine: id_machine,
      });
      console.log(response.data);
      if (response.data.success) {
        this.props.history.push("/");
      } else {
        console.log("Not send", response.data.message);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

    render() {
      const { currentPage, itemsPerPage } = this.state;
      const indexOfLastItem = (currentPage + 1) * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = this.state.data.slice(indexOfFirstItem, indexOfLastItem);
      const pageCount = Math.ceil(this.state.data.length / itemsPerPage);
        return(
          <div>
            <header className="page-header page-header-dark pb-5"></header>
            <div className="container-fluid px-4 mt-n10">
            <Navbars/>
            <div className="card mb-4 w-100">
                        <div className="card-header bg-dark fw-bold text-white fs-4 d-flex justify-content-between bg-danger">
                            <div>Manufacturing orders to be assigned to Machine:{" "}
                            {this.state.modalId}
                            </div>
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
                                        placeholder= "Search"
                                        onChange={this.searchData}
                                    />
                                </div>
                                </div>
                                </div>
                        </div>
           <div className="card-body">
             <div className="table-responsive">
                    <table id="datatablesSimple" className="table table-bordered table-striped">
                      <thead>
                        <tr className="bg-dark text-white">
                          <th rowSpan="2" className="text-center" scope="col">Action</th>
                          <th rowSpan="2" className="text-center" scope="col">Job ID</th>
                          <th rowSpan="2" className="text-center" scope="col">Work Ord</th>
                          <th rowSpan="2" className="text-center" scope="col">Item No</th>
                          <th rowSpan="2" className="text-center" scope="col">Machine Type</th>
                          <th rowSpan="2" className="text-center" scope="col">Operation</th>
                          <th rowSpan="2" className="text-center" scope="col">Color</th>
                          <th rowSpan="2" className="text-center" scope="col">Side</th>
                          <th rowSpan="2" className="text-center" scope="col">Qty Comp</th>
                          <th rowSpan="2" className="text-center" scope="col">Qty Open</th>
                          <th rowSpan="2" className="text-center" scope="col">Due Date</th>
                          <th rowSpan="2" className="text-center" scope="col">Machines</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        currentItems.length > 0 ? 
                        currentItems.map((item, index) => (
                            <tr key={index}>
                        <td>
                        {item.operation !== this.props.location.state.currentDashboardOp ? (
                              <button type="submit" className="btn btn-primary" onClick={() => this.handleAddTo(item.id_job, item.operation, this.state.modalId)}
                              >
                                Add to {this.state.modalId}
                              </button>
                          ) : (
                            <td></td>
                          )}
                        </td>  
                        <td>{item.id_job}</td>
                        <td>{item.work_order}</td>
                        <td>{item.item_no}</td>
                        <td>{item.machine}</td>
                        <td>{item.operation}</td>
                        <td>{item.op_color}</td>
                        <td>{item.op_side}</td>
                        <td>{item.qty_comp} / {item.qty_order}</td>
                        <td>{item.qty_open}</td>
                        <td>{item.date_due}</td>
                        <td>
                        {this.state.machine_queues.map((queue, index) => {
                        return (
                          <React.Fragment key={index}>
                          {parseInt(queue.queue_number) === 1 && item.operation === this.props.location.state.currentDashboardOp ? (
                            <button type="button" className="btn btn-success">
                              {queue.id_machine}
                            </button>
                          ) : (
                          <td></td>
                          )}
                        </React.Fragment>
                        );
                      })}
                    </td>
                    </tr>
                ))
                : 
                <tr>
                    <td colSpan="12" className="text-center">No entries found</td>
                </tr>
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

export default withRouter(DataOperation);
