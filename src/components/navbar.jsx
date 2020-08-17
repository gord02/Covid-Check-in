import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-right">
          <Link to="/" className="navbar-brand"> Covid Check-In</Link>
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <ul className="nav navbar-nav navbar-right">
              <Link to="/" className="nav-link"><li>Home</li></Link>

              {/* {this.props.authenticated ? (style={{display: "none"}}): null} */}
              {/* Data that is dependent on authentication */}
              {this.props.authenticated === false
                ? (
                  <Link to="/login" className="nav-link"><li>Login</li></Link>
                )
                : null
              }

              {this.props.authenticated
                ? (
                  <React.Fragment>

                    <Link to="/checkin" className="nav-link"><li>CheckIn</li></Link>
                    <Link to="/search" className="nav-link"><li>Search</li></Link>
                    <Link to="/logout" className="nav-link">Logout</Link>
                    {/* <button>{this.props.emailInput.value} </button> */}

                  </React.Fragment>
                )
                : null
              }
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
