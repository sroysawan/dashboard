import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';



if (document.getElementById('dashboard')) {
    ReactDOM.render(<Home />, document.getElementById('dashboard'));
}
if (document.getElementById('operator')) {
    ReactDOM.render(<Home />, document.getElementById('operator'));
}
if (document.getElementById('technician')) {
    ReactDOM.render(<Home />, document.getElementById('technician'));
}
if (document.getElementById('addstaff')) {
    ReactDOM.render(<Home />, document.getElementById('addstaff'));
}
if (document.getElementById('import')) {
    ReactDOM.render(<Home />, document.getElementById('import'));
}
