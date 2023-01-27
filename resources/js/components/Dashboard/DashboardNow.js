// import React, { Component } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import DashboardRow from './DashboardRow';


// var columns = [
//     {
//         name: 'Status',
//         selector: row => row.status,
//         sortable: false,
//     },
//     {
//         name: 'M/C',
//         selector: row => row.machine,
//         sortable: true,
//     },
//     {
//         name: 'Item Number',
//         selector: row => row.itemno,
//         sortable: true,
//     },
//     {
//         name: 'Op.',
//         selector: row => row.op,
//         sortable: true,
//     },
//     {
//         name: 'Color',
//         selector: row => row.color,
//         sortable: true,
//     },
//     {
//         name: 'Side',
//         selector: row => row.side,
//         sortable: true,
//     },
//     {
//         name: 'Due Date',
//         selector: row => row.duedate,
//         sortable: true,
//     },
//     {
//         name: 'Qty per tray',
//         selector: row => row.qtypt,
//         sortable: true,
//     },
//     {
//         name: 'Qty accum/Qty order',
//         selector: row => row.qtyao,
//         sortable: true,
//     },
//     {
//         name: 'Process(%)',
//         selector: row => row.process,
//         sortable: true,
//     },{
//         name: 'Run time Actual/Std(Second)',
//         selector: row => row.rta,
//         sortable: true,
//     },
//     {
//         name: 'Total open tun time(Hr)',
//         selector: row => row.tott,
//         sortable: true,
//     },
//     {
//         name: 'Estimated finish',
//         selector: row => row.finish,
//         sortable: true,
//     },
//     {
//         name: 'Next item number',
//         selector: row => row.nextitem,
//         sortable: true,
//     },
//     {
//         name: 'Next Op.',
//         selector: row => row.nextop,
//         sortable: true,
//     },
    
// ];

// class DashboardNow extends Component  {
//     constructor(props) { //รับค่า props
//         super(props); //ส่งค่า props
//         this.state = {
//           DashboardRefresh : [],
//         }
//     }
    
//     componentDidMount() {
//      this.getDashboardRefresh();
//     }
    
//     getDashboardRefresh = () => {
//     let self = this;
//     axios.get('/update/DashboardRefresh/').then(function (response) {
//         self.setState({                                                                                                                                                                                                                                                                                                                       
//           DashboardRefresh: response.data
//         });
//     });
//     }

    

//     render() {
//         return ( 
//         <>
//         <tbody>
//         <DataTable columns={columns} data= {this.state.DashboardRefresh.map(function (x, i) {
//                     return <DashboardRow key={i} data={x} /> 
                    
//                   })} />;
//          </tbody>
        
       
//         </>
        
//         )
        
//     }
// }
    
// export default DashboardNow;

// import React, {useState, useEffect, Component} from 'react';
// import axios from 'axios';
// import DashboardRow from './DashboardRow';
// import DataTable from 'react-data-table-component';


// var columns = [
//     {
//         name: 'Status',
//                 selector: row => row.status_work,
//                 sortable: false,
//             },
//             {
//                 name: 'M/C',
//                 selector: row => row.id_machine,
//                 sortable: true,
//             },
//             {
//                 name: 'Item Number',
//                 selector: row => row.item_no,
//                 sortable: true,
                
//             },
//             {
//                 name: 'Op.',
//                 selector: row => row.operation,
//                 sortable: true,
//             },
//             {
//                 name: 'Color',
//                 selector: row => row.op_color,
//                 sortable: true,
//             },
//             {
//                 name: 'Side',
//                 selector: row => row.op_side,
//                 sortable: true,
//             },
//             {
//                 name: 'Due Date',
//                 selector: row => row.date_due,
//                 sortable: true,
//             },
//             {
//                 name: 'Qty per tray',
//                 selector: row => row.qtypt,
//                 sortable: true,
                
//             },
//             {
//                 name: 'Qty accum/Qty order',
//                 selector: row => row.qtyao,
//                 sortable: true,
                
//             },
//             {
//                 name: 'Process(%)',
//                 selector: row => row.process,
//                 sortable: true,
//             },{
//                 name: 'Run time Actual/Std(Second)',
//                 selector: row => {row.run_time_actual, '/' ,row.run_time_std} ,
//                 sortable: true,
//             },
//             {
//                 name: 'Total open tun time(Hr)',
//                 selector: row => row.tott,
//                 sortable: true,
//             },
//             {
//                 name: 'Estimated finish',
//                 selector: row => row.finish,
//                 sortable: true,
//             },
//             {
//                 name: 'Next item number',
//                 selector: row => row.item_no_2,
//                 sortable: true,
//             },
//             {
//                 name: 'Next Op.',
//                 selector: row => row.operation_2,
//                 sortable: true,
//             },
// ];




// function MyComponent() {
//     const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
  

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/update/DashboardRefresh/")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         },

//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, [])



//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {

//     return (
//         <DataTable
//             columns={columns}
//             data={items}
//         />
//     );
//   }
// };

// export default MyComponent;

import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import DashboardRow from './DashboardRow';
import DataTable from 'react-data-table-component';

var columns = [
    {
        name: 'Status',
                selector: row => row.status_work,
                sortable: false,
            },
            {
                name: 'M/C',
                selector: row => row.id_machine,
                sortable: true,
            },
            {
                name: 'Item Number',
                selector: row => row.item_no,
                sortable: true,
                
            },
            {
                name: 'Op.',
                selector: row => row.operation,
                sortable: true,
            },
            {
                name: 'Color',
                selector: row => row.op_color,
                sortable: true,
            },
            {
                name: 'Side',
                selector: row => row.op_side,
                sortable: true,
            },
            {
                name: 'Due Date',
                selector: row => row.date_due,
                sortable: true,
            },
            {
                name: 'Qty per tray',
                selector: row => row.qtypt,
                sortable: true,
                
            },
            {
                name: 'Qty accum/Qty order',
                selector: row => row.qtyao,
                sortable: true,
                
            },
            {
                name: 'Process(%)',
                selector: row => row.process,
                sortable: true,
            },{
                name: 'Run time Actual/Std(Second)',
                selector: row => {row.run_time_actual, '/' ,row.run_time_std} ,
                sortable: true,
            },
            {
                name: 'Total open tun time(Hr)',
                selector: row => row.tott,
                sortable: true,
            },
            {
                name: 'Estimated finish',
                selector: row => row.finish,
                sortable: true,
            },
            {
                name: 'Next item number',
                selector: row => row.item_no_2,
                sortable: true,
            },
            {
                name: 'Next Op.',
                selector: row => row.operation_2,
                sortable: true,
            },
];


class DashboardNow extends Component{
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


render() {

    return(
        <>
             <DataTable
             columns={columns}
             data=
             {this.state.DashboardRefresh.map(function (x, i) {
                return <DashboardRow key={i} data={x} /> 
              })} 
            
         />
        </>
    );
            }
}
export default DashboardNow;
