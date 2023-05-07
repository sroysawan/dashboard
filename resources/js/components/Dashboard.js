import React, { Component } from 'react';
import axios from 'axios';
import Navbars from './Dashboard/Navbars';
import Table from './Dashboard/Table';
import TableOperator from './Dashboard/TableOperator'
import TableTechnician from './Dashboard/TableTechnician'
import AddStaff from './Dashboard/AddStaff'
import Import from './Dashboard/Import'
import Approve from './Approve/Approve'
class Dashboard extends Component{

render() {
    return (
        <div>
            {
                document.getElementById('dashboard')?<Table/>:
                document.getElementById('operator')?<TableOperator/>:
                document.getElementById('technician')?<TableTechnician/>:
                document.getElementById('addstaff')?<AddStaff/>:
                document.getElementById('addrove')?<Approve/>:
                document.getElementById('import')?<Import/>:""
            }
        </div>
        );
    }
}

export default Dashboard;