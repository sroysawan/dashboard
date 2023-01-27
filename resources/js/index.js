import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Operation from './components/Operation';
import { DataTable } from 'simple-datatables-classic';


if (document.getElementById('dashboard')) {
    ReactDOM.render(<Home />, document.getElementById('dashboard'));
}

if (document.getElementById('operation')) {
    ReactDOM.render(<Operation />, document.getElementById('operation'));
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