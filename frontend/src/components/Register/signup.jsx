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
    // tracks changes on input value to username, paramter passed in is event from username input
      handleChange = event => {
        //   anything added in the name input of form is added to state
        this.setState({ name: event.target.value });
        // this.setState({ email: event.target.value });
        // this.setState({id: firebase.auth().currentUser});
      }

    authEmailPassword(event) {
        // Stops broswer from reloading the page
        event.preventDefault();
        console.log("authed with email");
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        console.log(email);
        const user = {
            name: this.state.name,
            email: this.state.email,
            id: this.state.id
        };
        let firbaseId= 5;
        // this will check if anyone has the email 
        app.auth().fetchSignInMethodsForEmail(email)
            .then((providers) => {
                // determines if person doesn't have an account
                if (providers.length === 0) {
                    // create user
                    app.auth().createUserWithEmailAndPassword(email, password);
                    this.props.history.push('/');
            
                    var user = firebase.auth().currentUser;
                    console.log("user: "+ user);
                    if (user != null) {
                        console.log("user.uid:"+ user.uid)
                        firbaseId = user.uid; 
                    }
                    // console.log('uid',data.user.uid)
                    // console.log('userid: '+ user.uid);
                    // let firbaseId= user.uid;
                    // firebase.auth().createUserWithEmailAndPassword(email, password)
                    // .then(function(user){
                    // });
                    // stackoverflow stuff and axios call , we will then have user id and name and email
                    axios({
                        method:'post',
                        url:'/api/createUser',
                        // data to be passed to backend
                        data: {
                            user: user,
                            firbaseId: firbaseId
                        }
                    }).then(function (response) {
                        //   console.log("response:" + response);
                        //   console.log("response.data:" + response.data);
                        })
                        .catch(function (error) {
                          console.log(error);
                        });  
                    console.log("here 1  ??");
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
                    console.log("here??");
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
                    <form onSubmit={(event) => { this.authEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
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
                            <button type="submit" className="btn btn-primary" >Create User</button>

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

