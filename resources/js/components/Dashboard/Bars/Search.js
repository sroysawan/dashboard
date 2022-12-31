import React, { useEffect, useState } from "react";


function Search() {

    const [data , setData] = useState([]);
    const [input,setInput] = useState("");

    const fetchSearch = async () => {
        const response = await fetch("http://127.0.0.1:8000/update/DashboardRefresh/");
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
                         <li className="list-item" key={items.id}>{items.id_machine} {items.item_no} {items.operation}</li>
                         </>
                    );
                })}
            </ul>
        </>

        
    );
}




// const Search = () => (
//     <div action="/" method="get">
//         <label htmlFor="header-search">
//             <span className="visually-hidden">Search</span>
//         </label>
//         <input
//             type="text"
//             id="header-search"
//             placeholder="Search"
//             name="s"
//         />
//         <button type="submit">Search</button>
//     </div>
// );


{/* <div className="card-body">
<div class="table-responsive">
       <table className="table table-bordered table-striped">
         <thead>
           <tr class="bg-warning">
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
             <th className="text-center" scope="col">Time</th>
           </tr>
         </thead>
         <tbody>
         {this.state.DashboardRefresh.map(function (x, i) {
       return <DashboardRow key={i} data={x} /> 
     })}            
         </tbody>
       </table>
     </div>
   </div> */}
export default Search;
