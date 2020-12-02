import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css";
import axios from 'axios';
import userNm from "../Register/signup";
import { app } from "../../firebase";

class Navbar extends Component {
  constructor(props) {
    super(props);
    // allows you to use this inside of function
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    // this.auth = this.auth().bind(this);
    this.state = {
      redirect: false,
      // userNm: ""
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
        console.log("id: " + firebaseId);
        // console.log("id: " + firebaseId);
        axios.get('/api/getUser', {
          params: {
            firebaseId
          }
        })
        .then(function (response) {
          // ============================
          // console.log(response);
          // console.log(response.data);
          console.log(response.data["0"])
          // ============================
          let object =response.data["0"];
          const username= object.name;
          // console.log('?????---------?????: ', response.data['name']);
          // const username= response.data["name"];
          console.log("username: ", username);
          // return username;

          if (thisKeyword.state.username !== username) {
            console.log("keyword", thisKeyword.state.username);
            console.log("keyword2nd", username);
            console.log("this casenario was triggered!");
            thisKeyword.setState({username: username});
          }
          // thisKeyword.setState({ username: thisKeyword.username});

        
          // if (thisKeyword.username == userNm) {
          //   console.log("this casenario was triggered!");
          //   return;
          // }
          // thisKeyword.setState({ userNm: thisKeyword.username});
          // console.log("this.userNm: ", thisKeyword.userNm)
        });
      }
    });  
  }

  verify() {
    // if (this.username==)
  }
  render() {
    // console.log(this.props.user);
    // console.log(this.props);
    // console.log("value: " + this.props.value)
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-expand-lg navbar navbar-dark bg-dark " id="navbar nav">
          <Link to="/" className="navbar-brand"> Covid Check-In</Link>
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <ul className="nav navbar-nav mr-auto">
            </ul>
            <ul className="nav navbar-nav">
              <Link to="/" className="nav-link"><li>Home</li></Link>

              {/* Data that is dependent on authentication */}
              {this.props.authenticated === false
                ? (
                  // when not autheticated
                  <React.Fragment>
                    <Link to="/login" className="nav-link"><li>Login</li></Link>
                    <Link to="/signup" className="nav-link"><li>SignUp</li></Link>
                  </React.Fragment>
                )
                :
                // when signed in
                <React.Fragment>
                  
                  {this.componentDidUpdate()}
                  {/* {this.componentDidMount()} */}
                  {/* {this.setState({username: this.componentDidMount()})} */}
                  {/* this prevents the inifinte loop that would be created from the calling of the function this. */}
                  
                  {/* { useEffect(()=>{  this.componentDidMount()  }, [])  } */}
                  {/* <li onClick={() => {  this.componentDidMount() }}></li> */}
                  
                  {/* <li> Here </li> */}
                  
                  <li> {this.state.username}</li>
                {/* <li>{username}</li> */}
                  <Link to="/checkin" className="nav-link"><li>CheckIn</li></Link>
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
