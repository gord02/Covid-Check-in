import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="App body">
      <header className="App-header">
        <p>Welcome to the Covid Check-In Website!</p>
      </header>

      <div className="container">
        <div className="row" id="padding">
          <div className="col-sm">
            <h3 id="text">Information Section</h3>
            <p id="text">This is a website created to better apply social distancing in our regular day to day life outside of the home. Paticapants of the app would be able to checkin to stores upon arrival and be aware of how many people have checked into a particular store or area and plan accordingly.</p>
          </div>
          <div className="col-sm">
            <h3 id="text">About Us</h3>

            <p id="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, perspiciatis. Facilis, laboriosam. Doloremque voluptate sint, dolor, et laudantium ipsa minima hic repudiandae nisi tempore unde porro ex dignissimos saepe deserunt.</p>
          </div>
          <div className="col-sm">
            <h3 id="text">Our Vision</h3>
            <p id="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, perspiciatis. Facilis, laboriosam. Doloremque voluptate sint, dolor, et laudantium ipsa minima hic repudiandae nisi tempore unde porro ex dignissimos saepe deserunt.</p>
          </div>
        </div>
        <small style={{ color: "#FFFFFF" }}>Copyright @ Covid Check-In 2020 </small>
      </div>
    </div>
  );
}

export default Home;
