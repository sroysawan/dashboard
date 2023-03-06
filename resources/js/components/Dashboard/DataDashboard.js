import React, { Component, forEach } from 'react';
import axios from 'axios';
import DashboardRow from './DashboardRow';
import { Draggable }  from "react-drag-reorder";
import { Pagination } from 'react-bootstrap';
import { DataTable } from 'simple-datatables-classic';
import ReactSearchBox from "react-search-box";

var tempData =[];
var dataOnDashboard;
class DataDashboard extends Component{
  constructor(props) { //รับค่า props
    super(props); //ส่งค่า props
    this.state = {
      searchValue : "",
      DashboardRefresh : [],
      TempDashboardRefresh : [],
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
      DashboardRefresh: Object.values(response.data),
      TempDashboardRefresh:Object.values(response.data)
    });
    console.log(Object.values(response.data));
    //console.log(response.data);
});
}

setInput = (event) => {
  this.state.TempDashboardRefresh.map((x) => {
    // console.log(x.operation);
    if(x.operation.toLowerCase().includes(event.target.value.toLowerCase())
    || x.id_machine.toLowerCase().includes(event.target.value.toLowerCase()) 
    || x.item_no.toLowerCase().includes(event.target.value.toLowerCase())){
        tempData.push(x);
        this.setState({searchValue:event.target.value,
        DashboardRefresh:tempData});
        console.log(event.target.value);
        console.log(tempData);
    }
    else if(event.target.value === "" ){
      this.setState({DashboardRefresh:TempDashboardRefresh,
        searchValue:event.target.value,});
    }
    else if(this.setState({searchValue:event.target.value,
      DashboardRefresh:tempData}) === -1 ){
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
               placeholder="Search M/C ItemNo Op Color Side"
              //  value={this.state.searchValue}
               onChange={this.setInput}
          />

             <div class="table-responsive">
                    <table id="datatablesSimple" className="table table-bordered table-striped">
                      <thead>
                        <tr class="bg-warning">
                        {/* <tr className = {styles.trd}> */}
                        {/* <Draggable > */}
                          <th rowSpan="2" className="text-center" scope="col">Status</th>
                          <th rowSpan="2" className="text-center" scope="col">M/C</th>
                          <th rowSpan="2" className="text-center" scope="col">Item number</th>
                          <th rowSpan="2" className="text-center" scope="col">Op.</th>
                          <th rowSpan="2" className="text-center" scope="col">Color</th>
                          <th rowSpan="2" className="text-center" scope="col">Side</th>
                          <th rowSpan="2" className="text-center" scope="col">Due Date</th>
                          <th rowSpan="2" className="text-center" scope="col">Qty per tray</th>
                          <th rowSpan="2" className="text-center" scope="col">Qty accum/Qty order</th>
                          <th rowSpan="2" className="text-center" scope="col">Progress (%)</th>
                          <th rowSpan="2" className="text-center" scope="col">Run time Actual/Std(Second)</th>
                          <th rowSpan="2" className="text-center" scope="col">Total open run time(Hr)</th>
                          <th colSpan="2" className="text-center" scope="col">Estimated finish</th>
                          <th rowSpan="2" className="text-center" scope="col">Next item number</th>
                          <th rowSpan="2" className="text-center" scope="col">Next Op.</th>
                          {/* </Draggable> */}
                        </tr>
                        <tr className="fw-bold second-row bg-warning">
                        {/* <Draggable > */}
                          <th className="text-center" scope="col">Date</th>
                          <th className="text-center" scope="col">Time</th>
                          {/* </Draggable> */}
                        </tr>
                      </thead> 
                      <tbody>
                      {this.state.DashboardRefresh.map(function (x, i) {
                    return <DashboardRow key={i} data={x} /> 
                  })}        
                      </tbody>
                    </table>
                   </div>
                 </div>
    );
  }
}

export default DataDashboard;
