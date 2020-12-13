import React, { Component, setState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import Geocode from "react-geocode";
import { GoogleApiWrapper } from 'google-maps-react';

class SearchStore extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.printList = this.printList.bind(this);
        this.address = this.address.bind(this);
        this.state = {
            allStores: [ ],
            List:[],
            stores:[],
            object:[],
            test:"Johnny",
            id:'',
            statement: false
        };
    }
    // this will execute automactically when component is rendered 
    componentDidMount() {
        const thisKeyword=this;
        axios.get('/api/stores', {
            // params: {
            //   firebaseId
            // }
          })
        .then(function (response) {
            // ============================
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data["0"])
            // ============================
            const allStores =response.data;
            let len= allStores.length;
            let storeList= [];

            for(let i=0; i<len; i++) {
                storeList.push(allStores[i]);
            }
            if (thisKeyword.state.List !== storeList) {
                // console.log('yo ',thisKeyword.state.allStores)
                thisKeyword.setState({List : storeList});
            }
            if (thisKeyword.state.allStores !== allStores) {
                // console.log('yo ',thisKeyword.state.allStores)
                thisKeyword.setState({allStores : allStores}); 
            }
        });
    }

    isCheckedIn() {
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
              var user = app.auth().currentUser;
              const firebaseId = user.uid; 
              console.log("id: " + firebaseId);

              axios.get('/api/checkins', {
                params: {
                  firebaseId
                }
              })
              .then(function (response) {
                // ============================
                console.log(response);
                console.log(response.data);
                console.log(response.data["0"])
                // ============================
                let object =response.data["0"];
                // let bool= object["storeName"];
                // let timeIn= object["timeIn"];
                // if the current user is still checkined in somewhere the time out will be empty
                if('0' === object['timeOut']){
                    this.setState({statement: true});
                }
                // const username= object.name;
                // if (thisKeyword.state.username !== username) {
                //   // console.log("state username: ", thisKeyword.state.username);
                //   // console.log("username: ", username);
                //   thisKeyword.setState({username: username});
                // }
              });
            }
          });  
    }

    address(lat, lng) {
        // ===================
        //  ADDRESS
        // ===================
        Geocode.setApiKey("AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA");
        Geocode.enableDebug();

        Geocode.fromLatLng(lat, lng).then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
                return(address);
            },
            error => {
                console.error(error);
            },
        );
    }

    printList() {
        let stores=this.state.List;
        let newList= [];
        for(let i=0; i<stores.length; i++) {
            newList.push(stores[i]);
        }
        return(
           <div>
                <table style={{ marginBottom: "0px"}} class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th style={{ width: "323px"}} scope="col">Name</th>
                            <th style={{ width: "323px"}} scope="col">Location</th>
                            <th  style={{ width: "333px"}} scope="col">Current Capacity </th>
                            <th scope="col">Check Into</th>
                        </tr>
                    </thead>
                </table>
               {newList.map((i) => (
                    <div> 
                        {/* {this.address(i.lat, i.lng)} */}
                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    {/* <th scope="row">1</th> */}
                                    <td style={{ width: "323px"}}> {i.name}</td>
                                    <td>Pending</td>
                                    <td>Pending</td>
                                    <td>
                                        <Link in = {i} to="/checkIn/current"><button onClick={ () => this.settingObject(i)}> Check Into</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>)

               )}
           </div> 
        );
    }

   settingObject(i) {
        console.log("onlick atitvated");
        console.log("i: ", i);
        if(this.state.object !== i ) {
            let aSynced = async (i) => {  this.setState({object: i}) };
            aSynced().then(() => this.createChechkin(i));
            // async () => {  this.setState({object: i}); }; 
            // .then(this.createChechkin()); 
            // .then((value) => console.log(value))
        } 
    }

    createChechkin(i) {
        const thisKeyword =this;
        // let fid= '';
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                var user = app.auth().currentUser;
                const firebaseId = user.uid;  
                var d = new Date();
                let time= d.toLocaleTimeString();
                let storeId= i['_id'].$oid;
                // console.log(storeId);
                // let aSynced = async () => {   
                // console.log("firebaseId: ", firebaseId); 
                // };
                // aSynced().then(() =>  console.log("dine"), thisKeyword.setState({id: firebaseId}));
                axios({
                    method:'post',
                    url:'/api/checkInto',
                    // data to be passed to backend
                    data: {
                        time, firebaseId, i, storeId
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });  
            }
          });  
        // console.log("fid: ", fid)
        // let ted= this.state.test;
        // this.setState({test: "firebaseId"}, () => {
        //     console.log("ted: ", this.state.test);
        // }); 
        // let aSynceds = async () => {    thisKeyword.setState({test: "firebaseId"}); console.log("dine");  };
        // aSynceds().then(() =>  console.log(ted));
        // let id='';
        // let obj=[];
        // let aSynced = async () => {   
        // let id=  this.state.id; //!!!!!!!!!EMPTY
        // let obj= this.state.object; 
        // console.log("rertived");
        // };
       
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
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
                        <form>
                            <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {this.printList()}
                        <Link to="/search"><button> Back </button> </Link>
                        </React.Fragment>
                    } 
                </div> 
            </React.Fragment>
        );
    }
}
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDoSD0RfKO_FVMJ9I14kMkTowIkEUJYPyA'
// })(SearchStore);
export default SearchStore;