import React, { Component } from 'react'
import Navbar from "./components/Navbar/navbar";
import { app } from "./firebase";
import Login from "./components/Register/login";
import SignUp from "./components/Register/signup";
import Logout from "./components/Register/logout";
import Home from "./components/home";
import CheckIn from "./components/Checkin/checkin";
import Search from "./components/search";
// import Map from "./components/map";
import "./components/Styles/loadingStyles.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchStore from './components/Search/searchStore';
import Filter from './components/Search/filter';
import Map from './components/Search/map';
import initMaps from './components/Search/newMap';
import createStore from "./components/Admin/createStore";
import allStores from "./components/Admin/allStores";
import Current from "./components/Checkin/current";
import History from "./components/Checkin/history";
import axios from 'axios';
// import history from './history';
// import History  from 'history'

class Apps extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true,
            username: '' 
        };
 
    };
    getUserName() {
        axios.get('/api/createUser')
        .then((response) => {
            console.log("jello");
            const username = response.data;
            console.log("type of username: ", typeof(username), "username: ", username);
            // console.log("username: ", username);
            this.setState({ username });
          // console.log(response.data);
          // console.log(response.status);
          // console.log(response.statusText);
          // console.log(response.headers);
          // console.log(response.config);
        });
    }

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

    handleLanguage = (name) => {
        this.setState({username: name});
    }


    render() {
        // it takes time in-between getting user authentication therefore something is loaded in its place
        if (this.state.loading === true) {
            return (
                <div className="loading">Loading&#8230;</div>
            );
        }
        return (
            <React.Fragment>
            {/* <SignUp parentCallback = {this.callbackFunction}/> */}
            {/* <p> {this.state.userName} </p> */}
            <Router>
                {/* <p>My Token = {window.token}</p> */}
                {/* {this.getUserName()} */}
                <Navbar authenticated={this.state.authenticated} username={this.state.username}/>
                {/* Needs to be here so that state an ca be updated */}

                {/* Switch is used to prevent multiple components from running at once when using routing */}
                <Switch>
                    {/* exact is used to define an absolute route, so only urls contain nothing or the slash will cause this page to render */}
                    <Route exact path="/" component={Home} />

                    {/* this only renders the login component when the url typed in is login */}
                    <Route path="/login" component={() => <Login username={this.state.username}/>}/>
                    {/* <Route path="/signup" component={SignUp} handleChange={this.state.handleChange} handleSubmit={this.state.handleSubmit} value={this.state.value} var={"dog"}/> */}
                    {/* <Route path="/signup" component={SignUp} /> */}
                    {/* <Route path="/signup" render={props => <SignUp onSelectLanguage={this.handleLanguage} />} /> */}
                    {/* <Route exact path="/singup" onSelectLanguage={this.handleLanguage} component={SignUp} /> */}
                    <Route exact path="/signup" component={SignUp}  />
                    {/* onSelectLanguage={this.handleLanguage} component={() => <SignUp history={History}/>} */}
                    {/* <Route path="/signup" render={props => (<SignUp {...props} onSelectLanguage={this.handleLanguage}/>)}/> */}
                    {/* <Route exact path="/signup" render={props => <SignUp {...props} onSelectLanguage={this.handleLanguage}/>} /> */}
                    {/* <Route path="/signup" render={(props) => <SignUp {...props } onSelectLanguage={this.handleLanguage} vars={"dog"}/> }/> */}
                    {/* <Route path="/signup" render={(props) => (<SignUp {...props} handleChange={this.state.handleChange} handleSubmit={this.state.handleSubmit} value={this.state.value} var={"dog"}/> )}/> */}
                    
                    <Route  exact path="/checkin/checkin" component={CheckIn} />
                    <Route  exact path="/checkin/current" component={Current} />
                    <Route  exact path="/checkin/history" component={History} />
                    
                    <Route exact path="/logout" component={Logout} />

                    <Route exact path="/search/map" component={Map} />
                    <Route exact path="/search/newMap" component={initMaps} />
                    <Route exact path="/search/filter" component={Filter} />
                    <Route exact path="/search/searchstore" component={SearchStore} />
                    <Route path="/search" component={Search} />
                    <Route path="/api/newstore" component={createStore} />
                    <Route path="/admin/stores" component={allStores} />


                    {/* <Route path="/search/maps" component={Map} /> */}
                </Switch>
            </Router>
            </React.Fragment>
        );
    }
}

export default Apps;