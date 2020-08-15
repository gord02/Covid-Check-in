import React from "react";
import Login from "./components/login";
import Logout from "./components/logout";
import Home from "./components/home";
import CheckIn from "./components/checkin";
import Search from "./components/search";
import Apps from "./Apps"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar";
import { app } from "./firebase";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logout from './components/logout';

function App() {

  return (
    <Router>
      <div >
        {/* <Navbar /> */}
        <Apps />

        {/* Switch is used to prevent multiple components from running at once when using routing */}
        <Switch>
          {/* exact is used to define an absolute route, so only urls contain nothing or the slash will cause this page to render */}
          <Route path="/" exact component={Home} />

          {/* this only renders the login component when the url typed in is login */}
          <Route path="/login" component={Login} />
          <Route path="/checkin" component={CheckIn} />
          <Route path="/search" component={Search} />
          <Route path="logout" component={Logout} />
          {/* <Route path="/form" component={MyForm} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
