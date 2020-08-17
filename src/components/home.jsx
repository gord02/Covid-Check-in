import React from "react";
import logo from "../logo.svg";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p>Welcome to the Covid checkin Website!</p>

      <h3>Information Section</h3>
    </div>
  );
}

export default Home;
