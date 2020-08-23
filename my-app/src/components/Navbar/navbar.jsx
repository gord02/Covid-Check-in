import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/styles.css";

class Navbar extends Component {
  render() {

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
                  <React.Fragment>
                    <Link to="/login" className="nav-link"><li>Login</li></Link>
                    <Link to="/signup" className="nav-link"><li>SignUp</li></Link>
                  </React.Fragment>
                )
                :
                <React.Fragment>
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
