import React from 'react';
import * as ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom';
import Home from './components/Home';
import Operation from './components/Operation';
import NewTask from './components/NewTask';
import { DataTable } from 'simple-datatables-classic';


if (document.getElementById('dashboard')) {
    ReactDOM.render(<Home />, document.getElementById('dashboard'));
}

if (document.getElementById('operation')) {
    ReactDOM.render(<Operation />, document.getElementById('operation'));
}

if (document.getElementById('newtask')) {
    ReactDOM.render(<NewTask />, document.getElementById('newtask'));
}

// window.addEventListener('DOMContentLoaded', event => {
//     // Simple-DataTables
//     // https://github.com/fiduswriter/Simple-DataTables/wiki

//     const datatablesSimple = document.getElementById('datatablesSimple');
//     if (datatablesSimple) {
//         new simpleDatatables.DataTable(datatablesSimple, {
//             searchable: false,
//             paging: false,
//             fixedHeight: true});
//     } 
// });