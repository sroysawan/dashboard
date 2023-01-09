import { data } from "autoprefixer";
import { result } from "lodash";
import React, { useEffect, useState } from "react";
import { Container, Form, FormControl, InputGroup } from "react-bootstrap";
import DashboardRow from "../DashboardRow";


function Search() {
//   const [search,setSearch] = useState("")
//   return (
// <div>
//   <Container>
//     <h1 className="text-center mt-4">Live</h1>
//   <Form>
//     <InputGroup className="my-3">
//       <FormControl onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
//     </InputGroup>
//   </Form>
//   <Table stripes bordered hover>
//     <thead>
//       <tr>

//       <th rowSpan="2" className="text-center" scope="col">Status</th>
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
//     </thead>
//     <tbody>
//       {data.filter((key) => {
//         return search.toLowerCase() === '' ? item
//         : item.id_machine.toLowerCase.include(search);
//       })
//       .map((key,data) => (
//         <tbody>
//                       {this.state.DashboardRefresh.map(function (x, i) {
//                     return <DashboardRow key={i} data={x} /> 
//                   })}            
//       </tbody>
//       ))
//       }
    
//                       {/* {this.state.DashboardRefresh.map(function (x, i) {
//                     return <DashboardRow key={i} data={x} /> 
//                   })}             */}

//     </tbody>
//   </Table>
//   </Container>
// </div>
//   )

    const [data , setData] = useState([]);
    const [input,setInput] = useState("");

    const fetchSearch = async () => {
        const response = await fetch("http://127.0.0.1:8000/update/DashboardRefresh/");
        // const response = await fetch(<Dashboard />);
            setData(await response.json());
    };

    useEffect(() =>{
        fetchSearch();
    },[])

    

    return (
        <>
            <input type="text" name="search"  onChange={(e) => setInput(e.target.value)} />
            <ul>
                {data
                .filter((data) => data.id_machine.toLowerCase().includes(input)).map((items) => {
                    return(
                        <>
                         {/* <li className="list-item" key={items.id}>{items.id_machine} {items.item_no} {items.operation} {items.getAccum}</li> */}
                           
                         
                         {/* <tbody>
                          {this.state.DashboardRefresh.map(function (x, i) {
                    return <DashboardRow key={i} data={x} /> 
                  })}  
                         </tbody> */}
                         </>
                    );
                })}
            </ul>
        </>

        
    );

// const [userList, setUserList] = useState([]);

// useEffect(() =>{
//     fetch("http://127.0.0.1:8000/update/DashboardRefresh/")
//     .then(response => response.json())
//     .then(result => setUserList(result))
//     .catch(error =>console.log(error));
// },[])
// return<div>
//     <table>
//         <tr>
//             <th>id</th>
//             <th>name</th>

//         </tr> 
//         { 
//         userList && userList.length> 0 ? 
//         userList.map(usr =>
//             <tr>
// <td>{usr.id_machine}</td>
// <td>{usr.item_no}</td>
//             </tr>
//             )
//             :'Loading'
//            }
        
//     </table>
// </div>
           }

export default Search;
