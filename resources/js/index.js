// import React from 'react';
// import * as ReactDOM from 'react-dom';
// import Home from './components/Home';
// import Operation from './components/Operation';
// import NewTask from './components/NewTask';
// import { DataTable } from 'simple-datatables-classic';
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
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataDashboard from './components/Dashboard/DataDashboard';
import DataOperation from './components/Operation/DataOperation';

ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/" element={<DataDashboard />} />
        {/* <Route path="/data-dashboard" element={<DataDashboard />} /> */}
        <Route path="/operation" element={<DataOperation />} />
        {/* <Route path="/new-task" element={<NewTask />} /> */}
      </Routes>
    </Router>,
    document.getElementById('root')
  );