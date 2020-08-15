import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-right">
          <Link to="/" className="navbar-brand"> Home</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav navbar-right">
              <Link to="/" className="nav-link">
                <li>Home</li>
              </Link>

              <Link to="/login" className="nav-link">
                <li id="nav">Login</li>
              </Link>

              {/* Data that is dependent on authentication */}
              {this.props.authenticated
                ? (
                  <React.Fragment>
                    <Router>
                      <Link to="/checkin" className="nav-link"><li id="nav">CheckIn</li></Link>

                      <Link to="/search" className="nav-link"><li id="nav">Search</li></Link>

                      <Link to="/logout" className="nav-link"><li id="nav" aria-label="log out">Logout</li></Link>
                      {/* <button>{this.props.emailInput.value} </button> */}
                    </Router>
                  </React.Fragment>

                )
                : null
              }
            </ul>
          </div>
        </nav>
      </Router>
    );
  }
}

export default Navbar;
