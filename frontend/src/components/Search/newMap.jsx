
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
// const [selectedCenter, setSelectedCenter] = useState(null);


class SimpleMap extends React.Component { 
    constructor() {
        super();
        this.state = {
            markers: [],
            mouseIsOver : false
        };
    };
    
    static defaultProps = {
        center: {
        lat: 59.95,
        lng: 30.33
        },
        zoom: 11
    };

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
                   
            <Marker  key={2} 
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 59.955413, lng: 30.337844}} />

            {/* <Marker  key={3}  onMouseover={this.onMouseoverMarker}
                name={'Current location'} /> */}

            <Marker  
                key={4} 
                // onClick={this.onMarkerClick}
                name={'Current location'}  position={{lat: 59.955413, lng: 30.337844}} 
                onMouseover={() => {
                    // console.log("mouse over");
                    if(this.state.mouseIsOver===false) { 
                        this.setState({ mouseIsOver : true});
                    }
                    return (
                        <React.Fragment>
                            <h1>"hello world"</h1>

                        {console.log("here2")}
                        <InfoWindow visible={true} onOpen={() => {console.log("opened")}} position={{lat: 60.055413, lng: 30.337844}} maxWidth="200">
                            <h1>"hello world"</h1>
                        </InfoWindow>
                    </React.Fragment>
                    );
                }}
            />
        {/* {this.state.mouseIsOver === true 
            ?
                <React.Fragment>
                    {console.log("here")}
                    <InfoWindow position={{lat: 59.955413, lng: 30.337844}} >
                        <div>
                            <h1>"hello world"</h1>
                        </div>
                    </InfoWindow>
                </React.Fragment>
               
            :   <p></p>
        } */}
        <InfoWindow visible={true} onClose={this.onInfoWindowClose}>
            <div>
              <h1>"hello world"</h1>
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
 
// export default SimpleMap;

// import {React, Component, useState} from "react";
// import { Map, withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "google-maps-react";


// class MapContainer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             name: "Brampton City Center",
//             theLat: 43.716589,
//             theLng: -79.723921,
//             searchInput: 0
//         };
//     };

// // let Map = withScriptjs(withGoogleMap((props) =>{
//     // const [selectedCenter, setSelectedCenter] = useState(null);
//     // const recycleCenters = props.recycleCenters 
//     render() {
//     return (       
//         // <Map zoom={4.5} center={ { lat:  39.6693, lng: -98.3476 } }>  

//         // {/* {recycleCenters.map(center => (             */}
//         //     <Marker                               
//         //         position={{                     
//     //                 lat:59.955413,
//     //                 lng:30.337844             
//     //             }}
//     //             // onClick={() => {
//     //             //     setSelectedCenter({ lat:  59.955413, lng: 30.337844 });
//     //             // }}
//     //         />        
//     //         {/* ))}; */}
//     //         {/* {selectedCenter && ( */}
//     //         <InfoWindow
//     //             // onCloseClick={() => {
//     //             //     setSelectedCenter(null);
//     //             // }}
//     //             position={{
//     //                 lat:59.955413,
//     //                 lng:30.337844 
//     //             }}
//     //         >
//     //         </InfoWindow>

//     //         <Map google={this.props.google} zoom={14}>
//     //             <Marker onClick={this.onMarkerClick}
//     //                     name={'Current location'} />

//     //             <InfoWindow onClose={this.onInfoWindowClose}>
//     //                 <div>
//     //                 <h1>{this.state.selectedPlace.name}</h1>
//     //                 </div>
//     //             </InfoWindow>
//     //         </Map>
//     //         {/* )} */}
//     //    </Map>
//     <Map google={this.props.google} zoom={14}>
 
//     <Marker onClick={this.onMarkerClick}
//             name={'Current location'} />

//     <InfoWindow onClose={this.onInfoWindowClose}>
//         <div>
//           <h1>{this.state.selectedPlace.name}</h1>
//         </div>
//     </InfoWindow>
//   </Map>
//     );

//     }
// // }))
// }
// ==============
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// const mapStyles = {
//     width: '80%',
//     height: '70%'
// };
// export class MapContainer extends Component {
//     render() {
//       return (
//         <Map google={this.props.google} zoom={14} styles={{mapStyles}}
//         initialCenter={{
//             lat: this.state.theLat,
//             lng: this.state.theLng
//         }} 
//         >
   
//           {/* <Marker onClick={this.onMarkerClick}
//                   name={'Current location'} />
   
//           <InfoWindow onClose={this.onInfoWindowClose}>
//               <div>
//                 <h1>{this.state.selectedPlace.name}</h1>
//               </div>
//           </InfoWindow> */}
//         </Map>
//       );
//     }
// }
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA'
// })(MapContainer);

// // export default MapContainer;
