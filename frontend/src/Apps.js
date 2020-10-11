import React, { Component } from 'react'
import Navbar from "./components/Navbar/navbar";
import { app } from "./firebase";
import Login from "./components/Register/login";
import SignUp from "./components/Register/signup";
import Logout from "./components/Register/logout";
import Home from "./components/home";
import CheckIn from "./components/checkin";
import Search from "./components/search";
// import Map from "./components/map";
import "./components/Styles/loadingStyles.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchStore from './components/Search/searchStore';
import Filter from './components/Search/filter';
import Map from './components/Search/map';
import createStore from "./components/Admin/createStore";
import allStores from "./components/Admin/allStores";

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
                });
            }
            else {
                this.setState({
                    authenticated: false,
                    loading: false
                });
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
                <div className="loading">Loading&#8230;</div>
            );
        }
        return (
            <Router>
                {/* <p>My Token = {window.token}</p> */}
                <Navbar authenticated={this.state.authenticated} />
                {/* Needs to be here so that state an ca be updated */}

                {/* Switch is used to prevent multiple components from running at once when using routing */}
                <Switch>
                    {/* exact is used to define an absolute route, so only urls contain nothing or the slash will cause this page to render */}
                    <Route exact path="/" component={Home} />

                    {/* this only renders the login component when the url typed in is login */}
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/checkin" component={CheckIn} />
                    <Route exact path="/logout" component={Logout} />

                    <Route exact path="/search/map" component={Map} />
                    <Route exact path="/search/filter" component={Filter} />
                    <Route exact path="/search/searchstore" component={SearchStore} />
                    <Route path="/search" component={Search} />
                    <Route path="/admin/newstore" component={createStore} />
                    <Route path="/admin/stores" component={allStores} />


                    {/* <Route path="/search/maps" component={Map} /> */}
                </Switch>
            </Router>
        );
    }
}

export default Apps;