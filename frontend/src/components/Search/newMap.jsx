
import React, { Component, setState } from 'react';
import axios from 'axios';
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
            // clicked: false,
            stores: [],
            index: 0,
            areas: [
                {lat: 43.716589,lng: -79.723921, clicked: false},
                {lat: 43.683334, lng: -79.766670, clicked: false},
                {lat: 43.7076, lng: -79.7857,  clicked: false}
            ]    
        };
    };
    
    // static defaultProps = {
    //     center: {
    //         theLat: 43.716589,
    //         theLng: -79.723921,
    //     },
    //     zoom: 11
    // };
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
    componentDidUpdate() {
        // console.log(this.state.areas);
        // for (const lat in areas) {
        //     console.log(`${lat}: ${areas[lat]}`);
        // }
        // this.setState({})
    }
    getCounters() {

    }

    onInfoWindowClose() {
        // console.log(this);
        let index = this.state.index;
        if(this.state.areas[index].clicked === true) {
            // this.setState({ clicked : false});
            this.setState(prevState => {
                let areas = Object.assign({}, prevState.areas);  // creating copy of state variable areas
                areas[index].clicked = false;                     // update the name property, assign a new value                 
                return { areas };                                 // return new object areas object
            });
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
                lat: 43.716589,
                lng: -79.723921,
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
                {/* { this.state.stores.map((store, i) => 
                <div>
                    <Marker  
                        key={i} 
                        position={{lat: store.lat, lng: store.lng}} 
                        onClick={() => {
                            if(this.state.clicked === false) { 
                                this.setState({ clicked : true});
                            }
                        }}
                    />
                </div>
                )}    */}
                { Object.keys(this.state.areas).map((store, i) => 
                    <Marker  
                        key={i} 
                        position={{lat: this.state.areas[i].lat, lng: this.state.areas[i].lng}} 
                        onClick={() => {
                            this.setState({index: i}, () => {});
                            if(this.state.areas[i].clicked === false) { 
                                // this.setState({ clicked : true});
                                this.setState(prevState => {
                                    let areas = Object.assign({}, prevState.areas);  // creating copy of state variable areas
                                    areas[i].clicked = true;                     // update the name property, assign a new value 
                                    return { areas };                                 // return new object areas object
                                }, () => {});
                            }
                        }}
                    />
                )}  
                    <InfoWindow 
                        visible={this.state.areas[this.state.index].clicked} 
                        position={{lat:  this.state.areas[this.state.index].lat, lng:  this.state.areas[this.state.index].lng}} 
                        onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>"hello world!!!"</h1>
                        </div>
                    </InfoWindow>   
                {/* )}   */}

            </Map>
         </div>
        );
      }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA',
    LoadingContainer: LoadingContainer
})(SimpleMap);
 