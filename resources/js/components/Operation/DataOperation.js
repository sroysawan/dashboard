import React, { Component, forEach } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { DataTable } from 'simple-datatables-classic';

var tempData =[];
class DataOperation extends Component{
  constructor(props) { //รับค่า props
    super(props); //ส่งค่า props
    this.state = {
      searchValue: "",
      DashboardRefresh : [],
      TempDashboardRefresh :[],
    }
}

componentDidMount = () => {
 this.getDashboardRefresh();
}

getDashboardRefresh = () => {
let self = this;
axios.get('/update/DashboardRefresh/').then(function (response) {
  console.log(response.data);
    self.setState({                                                                                                                                                                                                                                                                                                                       
      DashboardRefresh: response.data,
      TempDashboardRefresh:response.data
    });
});
}
setInput = (event) => {
  this.state.TempDashboardRefresh.map((x, index) => {
    // console.log(x.operation);
    if(x.operation.toLowerCase().includes(event.target.value.toLowerCase())|| x.id_machine.toLowerCase().includes(event.target.value.toLowerCase()) ||x.item_no.toLowerCase().includes(event.target.value.toLowerCase())){
      tempData.push(x);
      this.setState({searchValue:event.target.value,
        DashboardRefresh:tempData});
    }
    else if(event.target.value === "" ){
      this.setState({DashboardRefresh:TempDashboardRefresh,
        searchValue:event.target.value,});
    }
    })
  tempData=[];
}
  
    render() {
        return(
           <div className="card-body">
             <input
               type="text"
               className="form-control"
               style={{width:"240px"}}
               placeholder="Search"
               onChange={this.setInput}
          />

             <div class="table-responsive">
                    <table id="datatablesSimple" className="table table-bordered table-striped">
                      <thead>
                        <tr class="bg-info">
                        {/* <tr className = {styles.trd}> */}
                          <th rowSpan="2" className="text-center" scope="col">Action</th>
                          <th rowSpan="2" className="text-center" scope="col">Job ID</th>
                          <th rowSpan="2" className="text-center" scope="col">Work Out</th>
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
         
                      </tbody>
                    </table>
                   </div>
                 </div>
    );
  }
}

export default DataOperation;
