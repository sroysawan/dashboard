import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar ,Nav ,NavDropdown ,Container} from "react-bootstrap";
import iconImage from "./logo.png";
import "./navbarStyle.css";
class Navbars extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/dashboard">
                        <a className="navbar-brand ps-lg-2">
                            <img src={iconImage} alt="Icon" className="navbar-logo" />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <NavDropdown title="Staffs" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#operatorlist">
                                    Operator List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#technicianlist">
                                    Technician List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#technicianlist">
                                    Other staff List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#importexcel">
                                    Import Excel
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#addstaff">
                                    Add Staff
                                </NavDropdown.Item>
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
