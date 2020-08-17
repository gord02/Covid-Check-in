import React, { Component } from 'react'
import Navbar from "./components/navbar";
import { app } from "./firebase";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Logout from './components/logout';

import Login from "./components/login";
import Logout from "./components/logout";
import Home from "./components/home";
import CheckIn from "./components/checkin";
import Search from "./components/search";
// import Apps from "./Apps"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class Apps extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true,
        };
    };

    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false
                })
            }
            else {
                this.setState({
                    authenticated: false,
                    loading: false
                })
            }
        })
    }
    componentWillUnmount() {
        this.removeAuthListener();
    }

    render() {
        // it takes time in-between getting user authentication therefore something is loaded in its place
        if (this.state.loading === true) {
            return (
                <div style={{ height: "100%", marginTop: "15%" }}>
                    <h1 style={{ textAlign: "center" }}>One moment...</h1>
                </div>
            )
        }
        return (
            <Router>
                {/* <Navbar /> */}
                <Navbar authenticated={this.state.authenticated} />
                {/* Needs to be here so that state an ca be updated */}


                {/* Switch is used to prevent multiple components from running at once when using routing */}
                <Switch>
                    {/* exact is used to define an absolute route, so only urls contain nothing or the slash will cause this page to render */}
                    <Route exact path="/" component={Home} />

                    {/* this only renders the login component when the url typed in is login */}
                    <Route path="/login" component={Login} />
                    <Route path="/checkin" component={CheckIn} />
                    <Route path="/search" component={Search} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </Router>
        );
    }
}

export default Apps;