import React, { Component } from "react";
import iconImage from "./logo.png";
import "./loginPageStyle.css";
import Form from "react-bootstrap/Form";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            error: null,
        };
    }

    handleUser = (event) => {
        this.setState({
            user: event.target.value,
        });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = (event) => {
        event.preventDefault();
        if (this.state.user.trim() !== this.state.user) {
            this.setState({
                error: "User field cannot have leading or trailing whitespace.",
            });
            return;
        }
        let data = { id: this.state.user, pass: this.state.password };
        axios.post("/login/validate", data).then((response) => {
            console.log(response.data);
            if (response.data.status == true) {
                localStorage.setItem("token", response.data.level);
                if (localStorage.getItem(response.data.level + "_hide") == null) {
                    localStorage.setItem(
                        response.data.level + "_hide",
                        "false"
                    );
                }
                if (localStorage.getItem(response.data.level + "_value") == null) {
                    localStorage.setItem(response.data.level + "_value", "500");
                }
                if ( localStorage.getItem(response.data.level + "_sort") == null) {
                    localStorage.setItem(
                        response.data.level + "_sort",
                        "id_machine"
                    );
                }
                if (localStorage.getItem(response.data.level + "_sortDirection") == null) {
                    localStorage.setItem(
                        response.data.level + "_sortDirection",
                        "asc"
                    );
                }
                window.location.href = "/";
            } else {
                this.setState({ error: "Wrong User or Password." });
            }
        });
    };

    render() {
        return (
            <>
                <div>
                    <div className="login-container">
                        <div className="login-topic"> Welcome Majorette </div>
                        <img
                            src={iconImage}
                            alt="Icon"
                            className="login-logo"
                        />
                        <br />
                        <div className="login-user">USER LOGIN</div>
                        <div style={{ textAlign: "left" }}>
                            <Form onSubmit={this.handleLogin}>
                                <Form.Label className="text-black">
                                    <b></b>
                                </Form.Label>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-black">
                                        <b>User : </b>
                                    </Form.Label>
                                    <Form.Control
                                        value={this.state.user}
                                        placeholder="Username"
                                        type="text"
                                        id="user"
                                        onChange={this.handleUser}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-black">
                                        <b>Password : </b>
                                    </Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        placeholder="Password"
                                        type="password"
                                        id="pass"
                                        onChange={this.handlePassword}
                                    />
                                </Form.Group>
                                <br />
                                {this.state.error && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {this.state.error}
                                    </div>
                                )}
                                <div style={{ textAlign: "center" }}>
                                    <input
                                        className="btn btn-primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#a81f1f",
                                            borderColor: "darkred",
                                        }}
                                        type="submit"
                                        value="Login"
                                    />
                                    &nbsp;&nbsp;
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginPage;
