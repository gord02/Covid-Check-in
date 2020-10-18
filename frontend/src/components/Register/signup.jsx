import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { app } from "../../firebase";
import Apps from "../../Apps";

import firebase from "firebase"
import "firebase/auth";
import Navbar from "../Navbar/navbar";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.authEmailPassword = this.authEmailPassword.bind(this);
        // this.userName= this.userNameInput(this);
        this.state = {
            redirect: false,
            name: "",
            // email: "",
            // id: 6
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
      handleChange = event => {
        this.setState({ name: event.target.value });
        // this.setState({ email: event.target.value });
        // this.setState({id: firebase.auth().currentUser});
      }
    
      handlesSubmit = event => {
        event.preventDefault();
    
        const user = {
          name: this.state.name,
          email: this.state.email,
          id: this.state.id
        };
    
        // axios.post(`/api/createUsername`, { user })
        //   .then(res => {
        //     console.log("res:" + res);
        //     console.log("res.data:"+res.data);
        //   })
        axios({
            method:'post',
            url:'/api/createUsername',
            data: {
                user: user
            }
          }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });  
      }  

    authEmailPassword(event) {
        event.preventDefault();
        console.log("authed with email");
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        console.log(email);

        // this will check if anyone has the email 
        app.auth().fetchSignInMethodsForEmail(email)
            .then((providers) => {
                // determines if person doesn't have an account
                if (providers.length === 0) {
                    // create user
                    app.auth().createUserWithEmailAndPassword(email, password);
                    this.props.history.push('/');
                    return (<Redirect to="/" />);
                }
                else if (providers.indexOf("password") === -1) {
                    // they used google 
                    this.loginForm.reset();
                    alert("Email already In use");
                } else {
                    alert("failed to create user, try again later");
                    console.log("failed to create user");
                }
            })
            .then((user) => {
                if (user && user.email) {
                    this.loginForm.reset();
                    this.setState({ redirect: true });
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to='/' />);
        }
        return (
            <React.Fragment>
                <div className="loginPage">
                    <h1>SignUp</h1>
                    <form onSubmit={(event) => { this.authEmailPassword(event) }} ref={(form) => { this.loginForm = form }} onSubmit={this.handlesSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputUsername">Username</label>
                            {/* <input type="text" name="userName" value={this.props.value} onChange={this.handleChange} />    */}
                            <input type="text" name="name" onChange={this.handleChange} /> 
                            {/* <input type="text" name="name" placeholder="Username" ref={(input) => { this.userNameInput = input }}  value={this.state.userName} onChange={this.handleUserName} userName={this.state.userName} onChange={this.handleChange} /> */}
                            {/* <input type="name" name="name" className="form-control" id="exampleInputUsername" placeholder="Username" ref={(input) => { this.userNameInput = input }} ></input> */}
                            {/* <input type="name" name="name" className="form-control" id="exampleInputUsername" placeholder="Username" ref={(input) => { this.sendData() = input }}></input> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(input) => { this.emailInput = input }} onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="pass" className="form-control" id="exampleInputPassword1" placeholder="Password" ref={(input) => { this.passwordInput = input }} ></input>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary" onSubmit={this.props.handleSubmit} >Create User</button>

                        </div>
                    </form>
                </div>   
                <div>
                </div>
            </React.Fragment>
            );
    }
}
export default SignUp;

