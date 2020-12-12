import React, { Component } from 'react';
import axios from 'axios';

class Filter extends Component {
    getAllStores() {
        axios.get('/api/stores', {
            // params: {
            //   firebaseId
            // }
          })
        .then(function (response) {
            // ============================
            console.log(response);
            console.log(response.data);
            // console.log(response.data["0"])
            // ============================
            let allStores =response.data;

            // ============
            // ADRESSS
            // var geocoder  = new google.maps.Geocoder();             // create a geocoder object
            // var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);    // turn coordinates into an object          
            // geocoder.geocode({'latLng': location}, function (results, status) {
            //     if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
            //     var add=results[0].formatted_address;  
            //     }
            // });
            // ==================
            // var column = {Title:response.data[0].name};
                return (
                    <React.Fragment>
              <div> {allStores[0].name} </div> 

                    <table>
                    <th>Stores</th>
                    {/* {allStores.map((i) => (<tr> {allStores[i].name} </tr>))} */}
              <tr> {allStores[0].name} </tr> 
                  </table>

                  <form>
                    <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                    </React.Fragment>
                 
                );
        });
    }
    render() {
        return (
            <React.Fragment>
    {this.getAllStores()}
            <div>Hello</div>
            </React.Fragment>
        
        );
    }
}

export default Filter;