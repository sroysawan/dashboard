import React from 'react';
import ReactDOM from 'react-dom';
import DataDashboard from './components/Dashboard/DataDashboard';
import DataOperation from './components/Operation/DataOperation';
import DataOperationQ2 from './components/Operation/DataOperationQ2';
import DataNewTask from './components/NewTask/DataNewtask';
import DataNewTaskQ2 from './components/NewTask/DataNewTaskQ2';
import LoginPage from './components/LoginPage/LoginPage';
import TableOperator from './components/Staff/TableOperator';
import TableTechnician from './components/Staff/TableTechnician';
import AddStaff from './components/Staff/AddStaff';
import Approve from './components/Staff/Approve/Approve';
import Import from './components/Staff/Import';
import Table from './components/Staff/Table';
import ApproveHistory from './components/Staff/Approve/ApproveHistory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* --------> Dashboard <-------- */}
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={DataDashboard} />
        <Route path="/operation" component={DataOperation} />
        <Route path="/operationQ2" component={DataOperationQ2} />
        <Route path="/newtask" component={DataNewTask} />
        <Route path="/newtaskQ2" component={DataNewTaskQ2} />
        
        {/* --------> Staff <-------- */}
        <Route path="/operator" component={TableOperator} />
        <Route path="/technician" component={TableTechnician} />
        <Route path="/addstaff" component={AddStaff} />
        <Route path="/approve" component={Approve} />
        <Route path="/history" component={ApproveHistory} />
        <Route path="/import" component={Import} />
        <Route path="/otherstaff" component={Table} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);