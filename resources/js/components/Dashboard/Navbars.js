import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/Gi';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


class Navbars extends Component{                                                                        


    render(){  
      return(
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="">Marjoratte</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="">Dashboard</Nav.Link>
        

        {/* <NavDropdown title="Machines" id="basic-nav-dropdown">
          <NavDropdown.Item href="">Machine List</NavDropdown.Item>
          <NavDropdown.Item href="">Add new Machine</NavDropdown.Item>
        </NavDropdown> */}

        <NavDropdown title="Staffs" id="basic-nav-dropdown">
          <NavDropdown.Item href="/operator">Operator List</NavDropdown.Item>
          <NavDropdown.Item href="/technician">Technician List</NavDropdown.Item>
          <NavDropdown.Item href="/">Other Staff List</NavDropdown.Item>
          <NavDropdown.Item href="/import">Import Excel</NavDropdown.Item>
          <NavDropdown.Item href="/addstaff">Add Staff</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/approve">Approve</Nav.Link>
        
        {/* <NavDropdown title="Jobs" id="basic-nav-dropdown">
          <NavDropdown.Item href="#uploadjob">Upload Jobs</NavDropdown.Item>
          <NavDropdown.Item href="#exportjob">Export Jobs</NavDropdown.Item>
        </NavDropdown> */}

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    );
}
}

export default Navbars;


// import Navbar from "./Sidebar/Navbar";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Web from "./Pages/Web";

// function Navbars (){
//     return(
//         <>
//         <Router>
//             <Navbar/>
//             <Switch>
//                 <Route path="/" exact component={Web} />
//             </Switch>
//             </Router>
//             </>
//     );
// }

// export default Navbars;