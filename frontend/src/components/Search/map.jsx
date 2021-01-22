// In order to make google.maps.LatLng visible it’s necessary to add this line of code at the top of the file:
/* global google */
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '70%'
};

class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
            name: "Brampton City Center",
            theLat: 43.716589,
            theLng: -79.723921,
            searchInput: 0
        };
    };

    search() {
        const searchValue = this.searchInput.value;
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
                    <h1 id="remove">Maps</h1>
                    <h5 style={{ marginTop: "3px", marginBottom: "6px" }}>Use the search bar to find locations or stores </h5>
                    <h3>Location: {this.state.name}</h3>

                    <nav class="navbar navbar-light bg-light ">
                        <label >Search for image of: </label>
                        <form method='POST' action="/" class="form-inline">
                            <input type="text" class="form-control" name="searchValue"id="searchValue" aria-describedby="search value" placeholder= "Enter title of image to search for" ref={(input) => { this.searchInput = input }} ></input>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </nav>
                </div>

                <div className="container">
                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{
                            lat: this.state.theLat,
                            lng: this.state.theLng
                        }} 
                         
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA'
})(MapContainer);
