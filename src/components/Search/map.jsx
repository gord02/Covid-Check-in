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
            theLng: -79.723921
        };
    };
    render() {
        return (
            <React.Fragment>
                <div style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
                    <h1 id="remove">Maps</h1>
                    <h5 style={{ marginTop: "3px", marginBottom: "6px" }}>Use the search bar to find locations or stores </h5>
                    <h3>Location: {this.state.name}</h3>
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