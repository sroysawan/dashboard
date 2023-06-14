import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import iconImage from "./logo.png";
import "./navbarStyle.css";
import { VscAccount } from "react-icons/vsc";
import { RiNotification3Fill } from "react-icons/ri";

class Navbars extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            isManager:false,
            isDataEntry:false,
            isForeman:false,
            approve:null,
            notify:false,

    };
}
componentDidMount = () => {

    var user = localStorage.getItem('token');
        if(user == 'Data Entry'){
            this.setState({
                isDataEntry:true
            })
        }
        else if(user == 'Manager'){
            axios.get('/update/getApprove').then(response =>{
                //   console.log(response.data);
                  if(response.data.length !== 0){
                    // console.log('yes');
                    this.setState({                                                                                                                                                                                                                                                                                                                       
                        notify: true,
                        isManager:true
                    });
                  }
                  else{
                    this.setState({
                        notify: false,
                        isManager:true
                    });
                  }
                });
        }
        else if(user == 'Foreman'){
            this.setState({
                isForeman:true
            })
        }
        else{
            window.location.href = '/login';
        }
};

getApprove = () =>{
    axios.get('/update/getApprove').then(function (response) {
    //   console.log(response.data);
      if(response.data!=null){
        console.log('yes');
        this.setState({                                                                                                                                                                                                                                                                                                                       
            notify: true,
        });
      }
      
        
    });
}

    logout = (event) =>{
        localStorage.removeItem('token');
        // localStorage.clear();
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
                                    Operator Staff List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/technician">
                                    Technician Staff List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/otherstaff">
                                    Other Staff List
                                </NavDropdown.Item>
                                {!this.state.isForeman && (
                                <NavDropdown.Item href="/import_staff">
                                    Import Staff Excel
                                </NavDropdown.Item>
                                )}
                                <NavDropdown.Item href="/addstaff">
                                    Add Staff
                                </NavDropdown.Item>
                            </NavDropdown>
                            {this.state.isManager && <Nav.Link href="/approve">Approve</Nav.Link>}{this.state.notify && <RiNotification3Fill style={{ color: 'red' }} />}
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
