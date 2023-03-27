import React, { Component } from 'react';
import axios from 'axios';
import OperationRow from './OperationRow';
import { Pagination } from 'react-bootstrap';
import { DataTable } from 'simple-datatables-classic';

var tempData =[];

class ChangeOperation extends Component{
  constructor(props) { //รับค่า props
    super(props); //ส่งค่า props
    this.state = {
      searchValue: "",
      OperationRefresh : [],
      TempOperationRefresh :[],
    }
}

componentDidMount = () => {
 this.getOperationRefresh();
}

getOperationRefresh = () => {
let self = this;
axios.get('/update/OperationRefresh/').then(function (response) {
  console.log(response.data);
    self.setState({                                                                                                                                                                                                                                                                                                                       
      OperationRefresh: response.data,
      TempOperationRefresh:response.data
    });
});
}

searchData = (event) => {
  this.state.TempOperationRefresh.map((x) => {
    // console.log(x.operation);
    if(x.operation.toLowerCase().includes(event.target.value.toLowerCase())
    || x.id_job.toLowerCase().includes(event.target.value.toLowerCase()) 
    || x.item_no.toLowerCase().includes(event.target.value.toLowerCase())
    || x.work_order.toLowerCase().includes(event.target.value.toLowerCase())){
        tempData.push(x);
        this.setState({searchValue:event.target.value,
        OperationRefresh:tempData});
        console.log(event.target.value);
        console.log(tempData);
    }
    else if(event.target.value === "" ){
      this.setState({OperationRefresh:TempOperationRefresh,
        searchValue:event.target.value,});
    }
    else if(this.setState({searchValue:event.target.value,
      OperationRefresh:tempData}) === -1 ){
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
               onChange={this.searchData}
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
                      {this.state.OperationRefresh.map(function (x, i) {
                    return <OperationRow key={i} data={x} /> 
                  })}            
                      </tbody>
                    </table>
                   </div>
                 </div>
    );
  }
}

export default ChangeOperation;
