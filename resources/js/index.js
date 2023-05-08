// import React from 'react';
// import ReactDOM from 'react-dom';
// import Operation from './components/Operation';
// import NewTask from './components/NewTask';
// import DataDashboard from './components/Dashboard/DataDashboard';
// import DataOperation from './components/Operation/DataOperation';


// if (document.getElementById('dashboard')) {
//     ReactDOM.render(<DataDashboard />, document.getElementById('dashboard'));
// }

// if (document.getElementById('operation')) {
//     ReactDOM.render(<DataOperation />, document.getElementById('operation'));
// }

// if (document.getElementById('newtask')) {
//     ReactDOM.render(<NewTask />, document.getElementById('newtask'));
// }


// App.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
// import DataDashboard from './components/Dashboard/DataDashboard';
// import DataOperation from './components/Operation/DataOperation';
// import TestOperation from "./components/Operation/TestOperation";

// ReactDOM.render(
//     <Router>
//       <Routes>
//         <Route path="/" element={<DataDashboard />} />
//         {/* <Route path="/data-dashboard" element={<DataDashboard />} /> */}
//         {/* <Route path="/operation" element={<DataOperation />} /> */}
//         <Route path="/operation" element={<TestOperation />} />
//         {/* <Route path="/new-task" element={<NewTask />} /> */}
//       </Routes>
//     </Router>,
//     document.getElementById('root')
//   );

import React from 'react';
import ReactDOM from 'react-dom';
import DataDashboard from './components/Dashboard/DataDashboard';
import DataOperation from './components/Operation/DataOperation';
import DataNewTask from './components/NewTask/DataNewtask';
import LoginPage from './components/LoginPage/LoginPage';
import TableOperator from './components/Staff/TableOperator';
import TableTechnician from './components/Staff/TableTechnician';
import AddStaff from './components/Staff/AddStaff';
import Approve from './components/Staff/Approve/Approve';
import Import from './components/Staff/Import';
import Table from './components/Staff/Table';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* --------> Dashboard <-------- */}
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={DataDashboard} />
        <Route path="/operation" component={DataOperation} />
        <Route path="/newtask" component={DataNewTask} />
        
        {/* --------> Staff <-------- */}
        <Route path="/operator" component={TableOperator} />
        <Route path="/technician" component={TableTechnician} />
        <Route path="/addstaff" component={AddStaff} />
        <Route path="/approve" component={Approve} />
        <Route path="/import" component={Import} />
        <Route path="/otherstaff" component={Table} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);