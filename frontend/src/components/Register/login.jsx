import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { app, googleProvider } from "../../firebase";

import "firebase/auth";

class Login extends Component {

  constructor(props) {
    super(props);
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authEmailPassword = this.authEmailPassword.bind(this);
    this.state = {
      redirect: false,
    }
  }

  authWithGoogle() {
    console.log("authed with google");
    app.auth().signInWithPopup(googleProvider)
      .then((result, error) => {
        if (error) {
          console.log(error);
        }
        else {
          this.setState({ redirect: true });
        }
      })
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
          alert("Try an alternative login, such as Google");
        }
        else {
          // sign user in
          console.log("user signed in");
          app.auth().signInWithEmailAndPassword(email, password);
          this.props.history.push('/');
          return (<Redirect to="/" />);

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

    // Un comment to aid in debugging
    // console.table([{
    //   email: this.emailInput.value,
    //   password: this.passwordInput.value
    // }])
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/' />);
    }
    return (
      <div className="loginPage">
        <h1>Login</h1>
        <div className="googleLogin">
          <button className="btn btn-success" onClick={() => { this.authWithGoogle() }} > Log in with Google</button>
        </div>

        <form className="ui form" onSubmit={(event) => { this.authEmailPassword(event) }} ref={(form) => { this.loginForm = form }} >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(input) => { this.emailInput = input }}></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="pass" className="form-control" id="exampleInputPassword1" placeholder="Password" ref={(input) => { this.passwordInput = input }}></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    );
  }
}
export default Login;
