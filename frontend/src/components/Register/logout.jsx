import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { app } from "../../firebase"

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        app.auth().signOut().then((user) => {
            this.setState({ redirect: true });
        });
    }

    render() {
        if (this.state.redirect === true) {
            console.log("logged out");
            return (<Redirect to="/" />);

        }
        return (
            <div style={{ height: "100%" }}>
                <h1 style={{ textAlign: "center" }}> Logging out</h1>
            </div>
        )
    }
}

export default Logout;