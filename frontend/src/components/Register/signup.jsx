import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { app } from "../../firebase";
import { withRouter } from 'react-router';
import "firebase/auth";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.authEmailPassword = this.authEmailPassword.bind(this);
        this.state = {
            redirect: false,
        }
    }
    // tracks changes on input value to username, paramter passed in is event from username input
      handleChange = event => {
        //   anything added in the name input of form is added to state
        this.setState({ name: event.target.value });
      }

    authEmailPassword(event) {
        // Stops broswer from relo
        const { history } = this.props;
        event.preventDefault();
        console.log("authed with email");
        // const history = useHistory();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const name= this.usernameInput.value;
        // this.props.onSelectLanguage(name);   
        console.log(email);
       
        // this will check if anyone has the email 
        app.auth().fetchSignInMethodsForEmail(email)
            .then((providers) => {
                // determines if person doesn't have an account
                if (providers.length === 0) {
                    // create user
                    app.auth().createUserWithEmailAndPassword(email, password);
                    // this.props.history.push('/');
                    history.push('/');
                    // var user = app.auth().currentUser;
                    app.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            // console.log("user: ",user)
                            var user = app.auth().currentUser;
                            // console.log("user.uid:"+ user.uid);
                            const firebaseId = user.uid; 
                            console.log("id: " + firebaseId);
                            axios({
                                method:'post',
                                url:'/api/createUser',
                                // data to be passed to backend
                                data: {
                                    name, email, firebaseId
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });  
                        }
                    });   
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
                    // console.log("here?")
                    // var user = firebase.auth().currentUser;
                    // console.log("user: "+ user);
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
                            <input type="text" name="username" ref={(input) => { this.usernameInput = input }}/> 
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
export default withRouter(SignUp);

