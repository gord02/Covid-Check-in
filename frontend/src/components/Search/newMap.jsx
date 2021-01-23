
import React, { Component, setState } from 'react';
import { Map, GoogleMapReact, GoogleApiWrapper, google, map, HeatMapLayer, InfoWindow, visualization, Marker } from 'google-maps-react';

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

// import HeatmapLayer from "react-google-maps/lib/visualization/HeatmapLayer";

const mapStyles = {
    width: '100%',
    height: '100%'
};

class SimpleMap extends React.Component { 
    constructor() {
        super();
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
        this.state = {
            markers: [],
            mouseIsOver : false,
            clicked: false,
            stores: []
        };
    };
    
    static defaultProps = {
        center: {
        lat: 59.95,
        lng: 30.33
        },
        zoom: 11
    };
    componentDidMount() {
        axios.get('/api/stores')
          .then(res => {
            // sets array of JSON objects to the vairble name stores
            const stores = res.data;
            // console.log(stores);
            // console.log( typeof stores);
            this.setState({ stores });
        })
    }

    getCounters() {

    }

    onInfoWindowClose() {
        if(this.state.clicked === true) {
            this.setState({ clicked : false});
        }
    }

    render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '500px', width: '100%' }}>
            <Map
               google={this.props.google}
              bootstrapURLKeys={{ key: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA'}}
              style={mapStyles}
              initialCenter={{
                lat: 59.95,
                lng: 30.33
              }} 
            //   defaultCenter={this.props.center}
            //   defaultZoom={this.props.zoom}
              heatmapLibrary={true}          
                heatmap={{    
                    positions: [
                      {lat: 59.955413, lng: 30.337844, weight: 6},
                    ],
                    options: {   
                        radius: 100,   
                        opacity: 0.7,
                        // gradient :  "rgba(0, 255, 255, 0)"
                        // gradient = [ "rgba(0, 255, 255, 0)"];
                  }}}  
            >
                {/* { this.state.stores.map((store, i) =>  <li>{store.name}</li>)} */}
                <Marker  
                    key={i} 
                    name={'Current location'} position={{lat: 59.955413, lng: 30.337844}} 
                    onClick={() => {
                        if(this.state.clicked === false) { 
                            this.setState({ clicked : true});
                        }
                    }}
                />
                <InfoWindow visible={this.state.clicked} position={{lat: 59.955413, lng: 30.337844}} onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>"hello world !!!"</h1>
                    </div>
                </InfoWindow>        
            </Map>
         </div>
        );
      }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA',
    LoadingContainer: LoadingContainer
})(SimpleMap);
 