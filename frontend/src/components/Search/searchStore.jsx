import React, { Component, setState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { app } from "../../firebase";


class SearchStore extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.printList = this.printList.bind(this);
        this.state = {
            allStores: [ ],
            List:[],
            stores:[],
            object:[],
            test:"Johnny",
            id:''
        };
    }
    // this will execute
    componentDidMount() {
        const thisKeyword=this;
        // let allStores='';
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

            // console.log("data[1]: ", response.data[1]);
            // console.log("data[1]: ", allStores[1]);
            // const stores = allStores.data;
            // console.log(allStores[0].name);

            if (thisKeyword.state.List !== storeList) {
                // console.log('yo ',thisKeyword.state.allStores)
                thisKeyword.setState({List : storeList});
            }

            if (thisKeyword.state.allStores !== allStores) {
                // console.log('yo ',thisKeyword.state.allStores)
                thisKeyword.setState({allStores : allStores});
                
            }
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


            // {stores.map((i) => (<div> {stores[i].name} </div>))} 
            // console.log("hello");
            // console.log("allstore type: ",typeof(allStores) )
            // console.log("stores type: ",typeof(stores) )
            
            return <React.Fragment>
            (
                <div>Hello</div>
                {/* {response.data.map((i) => (<div> {response.data[i]} </div>))}  */}
                {/* {stores.map((i) => (<div> {stores[i]} </div>))}  */}
            )
        </React.Fragment>;
        });

        // let stores = this.state.allStores;
        return (
            <React.Fragment>

            <table>
            <th>Stores</th>
            {/* {stores.map((i) => (<tr> {stores[i].name} </tr>))} */}
      {/* <tr> {this.state.allStores[0].name} </tr>  */}
          </table>

          <form>
            <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
            </React.Fragment>
         
        );
    }
    
    printList() {
        let stores=this.state.List;
        let newList= [];
        for(let i=0; i<stores.length; i++) {
            newList.push(stores[i]);
        }
        // console.log("newlist: ", newList, typeof(newList));
        return(
           <div>
            
               {newList.map((i) => (
                    <div> {i.name}
                     
                        <Link in = {i} to="/checkIn/current"><button onClick={ () => this.settingObject(i)}> Check Into</button>
                        </Link>
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
                let obj= thisKeyword.state.object; 
                // let aSynced = async () => {   
                // console.log("firebaseId: ", firebaseId); 
                // };
                // aSynced().then(() =>  console.log("dine"), thisKeyword.setState({id: firebaseId}));
                axios({
                    method:'post',
                    url:'/api/checkInto',
                    // data to be passed to backend
                    data: {
                        time, firebaseId, i
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
      
        // aSynced().then(() => console.log("obj: ", obj), console.log("id: ", id) );
        let id=  this.state.id; 
        // let obj= this.state.object; 
        // let time= Date().toLocaleTimeString(); 
    //    let obj2= this.state.object;
    //    console.log(obj2);
       
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {this.printList()}
            </React.Fragment>
        );
    }
}

export default SearchStore;