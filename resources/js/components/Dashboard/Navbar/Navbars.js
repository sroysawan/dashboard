import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Container} from 'react-bootstrap';

class Navbars extends Component{
    render(){  
      return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container fluid>
    <Navbar.Brand href="/"><a class="navbar-brand ps-lg-2">Marjoratte</a></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Dashboard</Nav.Link>
        <NavDropdown title="Staffs" id="basic-nav-dropdown">
          <NavDropdown.Item href="#operatorlist">Operator List</NavDropdown.Item>
          <NavDropdown.Item href="#technicianlist">Technician List</NavDropdown.Item>
          <NavDropdown.Item href="#technicianlist">Other staff List</NavDropdown.Item>
          <NavDropdown.Item href="#importexcel">Import Excel</NavDropdown.Item>
          <NavDropdown.Item href="#addstaff">Add Staff</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/">Approve</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
    );
}
}


export default Navbars;

// class Navbars extends Component{
//     render(){  
//       return(
//         <body>
//           <nav class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
//           {/* <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" ><i data-feather="menu"></i><GiHamburgerMenu/></button> */}
//           {/* <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" ><McSidenav/></button> */}
//           {/* <HamburgerMenu /> */}
//               <div class="container-fluid">
//                   <a class="navbar-brand pe-3 ps-4 ps-lg-2" href="#home">Majorette</a>                 
//               </div>
//           </nav>
//         </body>
//     );
// }
// }