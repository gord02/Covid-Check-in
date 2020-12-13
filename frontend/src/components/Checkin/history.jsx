import React, { Component, setState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import Geocode from "react-geocode";
import { GoogleApiWrapper } from 'google-maps-react';

class History extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.printList = this.printList.bind(this);
        // this.address = this.address.bind(this);
        this.state = {
            allCheckins: [],
        };
    }
    // this will execute automactically when component is rendered 
    componentDidMount() {
        let thisKeyword=this;
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
              var user = app.auth().currentUser;
              const firebaseId = user.uid; 
              console.log("id: " + firebaseId);

              axios.get('/api/allCheckins', {
                params: {
                  firebaseId
                }
              })
              .then(function (response) {
                // ============================
                console.log(response);
                console.log(response.data);
                console.log(response.data["0"]);
                // ============================
                const allCheckins =response.data;
                let len= allCheckins.length;
                if (thisKeyword.state.allCheckins !== allCheckins) {
                    thisKeyword.setState({allCheckins : allCheckins}); 
                }
              });
            }
        }); 
    }

    printList() {
        let stores=this.state.allCheckins;
        return(
           <div>    
               {stores.map((i) => (
                    <div> 
                        <h1>All Checkins</h1>
                        {i.name}
                        {/* {this.address(i.lat, i.lng)} */}
                       {/* <button onClick={ () => this.settingObject(i)}> Check Into</button> */}
                       {}
                    </div>)

               )}
           </div> 
        );
    }

    render() {
        return (
            <React.Fragment>
                
                {/* Data that is dependent on authentication */}
              {this.state.statement === true
                ? (
                  //user is already checked into store
                  <React.Fragment>
                    <h4>You are already checked into a store </h4>
                  </React.Fragment>
                )
                :
                // user is checked into store so they can see stores
                <React.Fragment>
                  {/* <form>
                    <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                {this.printList()}
                </React.Fragment>

              }
                
               
            </React.Fragment>
        );
    }
}

export default History;