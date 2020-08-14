import React, { Component } from 'react'
import Navbar from "./components/navbar";
import { app } from "./firebase";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logout from './components/logout';


class Apps extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true
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
                <div style={{ height: "100%" }}>
                    <h1 style={{ textAlign: "center" }}>One moment...</h1>
                </div>
            )
        }
        return (
            <React.Fragment>
                <Navbar authenticated={this.state.authenticated} />
                <Router>
                    <Route exact path="/logout" component={Logout} />
                </Router>

            </React.Fragment>
        );
    }
}

export default Apps;