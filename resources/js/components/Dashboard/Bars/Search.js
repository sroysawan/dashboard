import React, { Component, forEach } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';


var tempData =[];
class Search extends Component{
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
            </div>
    );
  }
}

export default Search;
