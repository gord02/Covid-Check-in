import React from "react";
import "./App.css";
import Login from "./components/login";
import Home from "./components/home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        {/* Switch is used to prevent multipe compoeonts from running at once when using routing */}
        <Switch>
          {/* exact is used to define an absolute route, so only urls contain nothing or the slash will cause this page to render */}
          <Route path="/" exact component={Home} />

          {/* this only renders the login component when the url typed in is login */}
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
