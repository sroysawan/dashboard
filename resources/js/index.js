// import React from 'react';
// import ReactDOM from 'react-dom';
// import Home from './components/Home';
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
import Home from './components/Home';
import Operation from './components/Operation';
import NewTask from './components/NewTask';
import DataDashboard from './components/Dashboard/DataDashboard';
import DataOperation from './components/Operation/DataOperation';
import DataNewTask from './components/NewTask/DataNewtask';
import LoginPage from './components/LoginPage/LoginPage';
import TestOperation from './components/Operation/TestOperation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={DataDashboard} />
        <Route path="/operation" component={DataOperation} />
        <Route path="/newtask" component={DataNewTask} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);