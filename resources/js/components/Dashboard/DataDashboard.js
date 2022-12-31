import React, { Component } from 'react';
import axios from 'axios';
import DashboardRow from './DashboardRow';
import styles from "./App.module.css";

class DataDashboard extends Component{
  constructor(props) { //รับค่า props
    super(props); //ส่งค่า props
    this.state = {
      DashboardRefresh : [],
    }
}

componentDidMount() {
 this.getDashboardRefresh();
}

getDashboardRefresh = () => {
let self = this;
axios.get('/update/DashboardRefresh/').then(function (response) {
    self.setState({                                                                                                                                                                                                                                                                                                                       
      DashboardRefresh: response.data
    });
});
}

    render(){
        return(
          <div className="card-body">
             <div class="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr class="bg-warning">
                        {/* <tr className = {styles.trd}> */}
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
                        </tr>
                        <tr className="fw-bold second-row bg-warning">
                          <th className="text-center" scope="col">Date</th>
                          <th className="text-center" scope="col">Tim</th>
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

// import React, { Component , useEffect, useState } from 'react';
// import axios from 'axios';
// import DashboardRow from './DashboardRow';
// import styles from "./App.module.css";

// function DataDashboard() {

//   const [data , setData] = useState([]);
//   const [input,setInput] = useState("");

//   const fetchSearch = async () => {
//       const response = await fetch("http://127.0.0.1:8000/update/DashboardRefresh/");
//           setData(await response.json());
//   };

//   useEffect(() =>{
//       fetchSearch();
//   },[])

//   return (
      // <>
      //     <input type="text" name="search"  onChange={(e) => setInput(e.target.value)} />
      //     <ul>
      //         {data
      //         .filter((data) => data.item_no.toLowerCase().includes(input)).map((items) => {
      //             return(
      //                 <>
      //                  <li className="list-item" key={items.id}>{items.id_machine} {items.item_no} {items.operation}</li>
      //                  </>
      //             );
      //         })}
      //     </ul>
      // </>
  
        // <div className="card-body">
        //    <div class="table-responsive">
        //           <table className="table table-bordered table-striped">
        //             <thead>
        //               <tr class="bg-warning">
        //               {/* <tr className = {styles.trd}> */}
        //               <input type="text" name="search"  onChange={(e) => setInput(e.target.value)} />
        //                 <th rowSpan="2" className="text-center" scope="col">Status</th>
        //                 <th rowSpan="2" className="text-center" scope="col">M/C</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Item number</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Op.</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Color</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Side</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Due Date</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Qty per tray</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Qty accum/Qty order</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Progress (%)</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Run time Actual/Std(Second)</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Total open run time(Hr)</th>
        //                 <th colSpan="2" className="text-center" scope="col">Estimated finish</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Next item number</th>
        //                 <th rowSpan="2" className="text-center" scope="col">Next Op.</th>
        //               </tr>
        //               <tr className="fw-bold second-row bg-warning">
        //                 <th className="text-center" scope="col">Date</th>
        //                 <th className="text-center" scope="col">Time</th>
        //               </tr>
        //             </thead>
        //             <tbody>
        //             {data
        //       .filter((data) => data.item_no.toLowerCase().includes(input)).map((items) => {
        //           return(
        //               <>
        //                <DashboardRow key={i} data={x} />
        //                </>
        //           );
        //       })}
        //             </tbody>
        //           </table>
        //         </div>
        //       </div>
        //       );
        //     }


      
 
// class DataDashboard extends Component{
//   constructor(props) { //รับค่า props
//     super(props); //ส่งค่า props
//     this.state = {
//       DashboardRefresh : [],
//     }
// }

// componentDidMount() {
//  this.getDashboardRefresh();
// }

// getDashboardRefresh = () => {
// let self = this;
// axios.get('/update/DashboardRefresh/').then(function (response) {
//     self.setState({                                                                                                                                                                                                                                                                                                                       
//       DashboardRefresh: response.data
//     });
// });
// }

//     render(){
//         return(
//           <div className="card-body">
//              <div class="table-responsive">
//                     <table className="table table-bordered table-striped">
//                       <thead>
//                         <tr class="bg-warning">
//                         {/* <tr className = {styles.trd}> */}
//                           <th rowSpan="2" className="text-center" scope="col">Status</th>
//                           <th rowSpan="2" className="text-center" scope="col">M/C</th>
//                           <th rowSpan="2" className="text-center" scope="col">Item number</th>
//                           <th rowSpan="2" className="text-center" scope="col">Op.</th>
//                           <th rowSpan="2" className="text-center" scope="col">Color</th>
//                           <th rowSpan="2" className="text-center" scope="col">Side</th>
//                           <th rowSpan="2" className="text-center" scope="col">Due Date</th>
//                           <th rowSpan="2" className="text-center" scope="col">Qty per tray</th>
//                           <th rowSpan="2" className="text-center" scope="col">Qty accum/Qty order</th>
//                           <th rowSpan="2" className="text-center" scope="col">Progress (%)</th>
//                           <th rowSpan="2" className="text-center" scope="col">Run time Actual/Std(Second)</th>
//                           <th rowSpan="2" className="text-center" scope="col">Total open run time(Hr)</th>
//                           <th colSpan="2" className="text-center" scope="col">Estimated finish</th>
//                           <th rowSpan="2" className="text-center" scope="col">Next item number</th>
//                           <th rowSpan="2" className="text-center" scope="col">Next Op.</th>
//                         </tr>
//                         <tr className="fw-bold second-row bg-warning">
//                           <th className="text-center" scope="col">Date</th>
//                           <th className="text-center" scope="col">Time</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                       {this.state.DashboardRefresh.map(function (x, i) {
//                     return <DashboardRow key={i} data={x} /> 
//                   })}            
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//     );
//   }
// }

// export default DataDashboard;

