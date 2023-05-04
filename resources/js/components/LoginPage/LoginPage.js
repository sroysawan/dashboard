import React, { Component } from 'react';
import Navbars from '../Dashboard/Navbar/Navbars';
import ReactPaginate from "react-paginate";
// import "./newtaskStyle.css";
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/Fa";

var tempData = [];
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            pass:"",
            
        };
    }
    handleUser =(event)=>{
        this.setState({
            user:event.target.value,
        });
    }

    handlePassword =(event)=>{
        this.setState({
            password:event.target.value,
        });
    }

    handleLogin = (event) =>{
        event.preventDefault();
        let data = {id:this.state.user,
                    pass:this.state.password};
        axios.post("/login/validate",data).then(response => {
            console.log(response.data);
            if(response.data.status == true){
                localStorage.setItem('token', response.data.level);
                window.location.href = '/';
            }
            else{
                alert('Wrong User or Password.');
            }
        })
    }

    

    render() {
        return(
        <>
        <div>
        <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', width:'40%', textAlign:'center' }}><hr/>
            <b  style={{ fontSize: '28px' }}>USER LOGIN</b><hr/>
            <div style={{textAlign: 'left' }}>
            <Form onSubmit={this.handleLogin}>
            <Form.Label className='text-black'><b></b></Form.Label>
                <Form.Group className="mb-3">
                    <Form.Label className='text-black'><b>USER : </b></Form.Label>
                    <Form.Control value={this.state.user} type='text' id="user" onChange={this.handleUser}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='text-black'><b>PASSWORD : </b></Form.Label>
                    <Form.Control value={this.state.password} type='password' id="pass" onChange={this.handlePassword}/>
                </Form.Group>
                <hr/>
                <div style={{textAlign: 'center' }}>
                <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred'}} type="submit" value="Login" />&nbsp;&nbsp;
                </div>
            </Form>
            {/*start show notify access */}
            <hr/>
            {/* {this.state.successLogin?
            <input className="btn btn-primary" readOnly style={{ color: 'black', backgroundColor: '#AFFFB2', borderColor: 'green', width:'100%'}} value={this.state.returnLoginData} />
            :''}

            {this.state.failedLogin?
            <input className="btn btn-primary" readOnly style={{ color: 'black', backgroundColor: '#FFB3B3', borderColor: 'darkred', width:'100%'}} value={this.state.returnLoginData+", Login Failed."} />
            :''} */}
            {/*end show notify access */}
            </div>
    </div>

        </div>
        </>
        )
          
  }
}

export default LoginPage;
