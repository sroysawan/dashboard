import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import iconImage from "./logo.png";
import "./navbarStyle.css";
import { BsEnvelope } from "react-icons/Bs";
import { VscAccount } from "react-icons/vsc";

class Navbars extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            isManager:false,
            isDataEntry:false,
            isForeman:false,

    };
}
componentDidMount = () => {
    var user = localStorage.getItem('token');
        if(user == 'employee'){
            this.setState({
                isDataEntry:true
            })
        }
        else if(user == 'manager'){
            this.setState({
                isManager:true
            })
        }
        else if(user == 'foreman'){
            this.setState({
                isForeman:true
            })
        }
        else{
            window.location.href = '/login';
        }
    // this.getRuntimecolor(this.props.run_time_actual,this.props.run_time_std,this.props.status_work);
};
    logout = (event) =>{
        localStorage.clear();
        window.location.href = '/login';
    }
    render() {
        return (
            <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <a className="navbar-brand ps-lg-2">
                            <img
                                src={iconImage}
                                alt="Icon"
                                className="navbar-logo"
                            />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Dashboard</Nav.Link>
                            <NavDropdown title="Staffs" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/operator">
                                    Operator List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/technician">
                                    Technician List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/otherstaff">
                                    Other staff List
                                </NavDropdown.Item>
                                {!this.state.isForeman && (
                                <NavDropdown.Item href="/import">
                                    Import Excel
                                </NavDropdown.Item>
                                )}
                                <NavDropdown.Item href="/addstaff">
                                    Add Staff
                                </NavDropdown.Item>
                            </NavDropdown>
                            {this.state.isManager && <Nav.Link href="/approve">Approve</Nav.Link>}
                        </Nav>
                        <ul className="navbar-nav ">
                            {/* <Nav.Link href="#">
                                <BsEnvelope />
                            </Nav.Link> */}
                            <Nav.Link href="#">
                                <VscAccount />
                            </Nav.Link>
                        </ul>
                    </Navbar.Collapse>
                    <a style={{color:'white'}}>{localStorage.getItem('token')}</a>
                    &nbsp<Button variant="danger" onClick={event=> this.logout(event)}>Logout</Button>
                </Container>
            </Navbar>
        );
    }
}

export default Navbars;
