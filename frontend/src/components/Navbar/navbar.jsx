import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css";
import axios from 'axios';
import { app } from "../../firebase";

class Navbar extends Component {
  constructor(props) {
    super(props);
    // allows you to use this inside of function
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {
      redirect: false,
      username: ''
    }
  }

  componentDidUpdate() {
    var thisKeyword = this;
    // retirvers the id of the curently signed in user
    app.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log("user: ",user)
        var user = app.auth().currentUser;
        // console.log("user.uid:"+ user.uid);
        const firebaseId = user.uid; 
        // console.log("id: " + firebaseId);
        // console.log("id: " + firebaseId);

        // this sends firebaseid to backend as paramter
        axios.get('/api/getUser', {
          params: {
            firebaseId
          }
        })
        .then(function (response) {
          // ============================
          // console.log(response);
          // console.log(response.data);
          // console.log(response.data["0"])
          // ============================
          let object =response.data["0"];
          const username= object.name;
          if (thisKeyword.state.username !== username) {
            // console.log("state username: ", thisKeyword.state.username);
            // console.log("username: ", username);
            thisKeyword.setState({username: username});
          }
        });
      }
    });  
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-expand-lg navbar navbar-dark bg-dark " id="navbar nav">
          <Link to="/" className="navbar-brand"> Covid Check-In</Link>
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <ul className="nav navbar-nav mr-auto">
            </ul>
            <ul className="nav navbar-nav">

              {/* Data that is dependent on authentication */}
              {this.props.authenticated === false
                ? (
                  // when not autheticated
                  <React.Fragment>
                    <Link to="/" className="nav-link"><li>Home</li></Link>
                    <Link to="/login" className="nav-link"><li>Login</li></Link>
                    <Link to="/signup" className="nav-link"><li>SignUp</li></Link>
                  </React.Fragment>
                )
                :
                // when signed in
                <React.Fragment>
                  {this.componentDidUpdate()}
                  <div style={{paddingRight: '400px', paddingTop :"7px" }}>
                    {/* , paddingTop :"7px"} */}
                  <span style={{color: 'white'}}> You are signed in as,   </span>
                  <span style={{color: '#4ac6f7', fontWeight: "bold"}}> { this.state.username}</span>
                  </div>
                
                {/* <li>{username}</li> */}
                  <Link to="/" className="nav-link"><li>Home</li></Link>
                  <Link to="/checkin/checkin" className="nav-link"><li>CheckIn</li></Link>
                  <Link to="/search" className="nav-link"><li>Search</li></Link>
                  <Link to="/logout" className="nav-link ">Logout</Link>
                </React.Fragment>

              }
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
