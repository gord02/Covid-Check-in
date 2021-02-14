import React, { Component } from 'react';
import { app } from "../../firebase";
import axios from 'axios';
import { Link } from "react-router-dom";


class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkOut = this.checkOut.bind(this);
        this.state = {
            storeName:'',
            timeIn: ''
        };
    }
    componentDidMount() {
        // const { history } = this.props;

        // FORCE REFRESH OF PAGE


        // history.push('/');
        let thisKeyword = this;
        // axios get reuquest to backend to get checkin from mongdb based on current user
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
                console.log(response.data["0"]);
                // ============================
                let object =response.data["0"];
                let storeName= object["name"];
                let timeIn= object["timeIn"];
                let timeOut= object["timeOut"];
                // if(thisKeyword.state.storeName !== storeName){
                //     thisKeyword.setState({storeName: storeName});
                //     thisKeyword.setState({timeIn: timeIn});
                // }
                // if(thisKeyword.state.timeIn !== timeIn){
                //     thisKeyword.setState({storeName: storeName});
                //     thisKeyword.setState({timeIn: timeIn});
                // }
                console.log("timeIn", timeIn, "timeOut", timeOut);
                if(timeOut === "0"){
                    thisKeyword.setState({storeName: storeName});
                    thisKeyword.setState({timeIn: timeIn});
                    thisKeyword.setState({timeOut: timeOut});
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

    checkOut() {
        const { history } = this.props;
        var thisKeyword = this;
        console.log("triggered?");
        // retirvers the id of the curently signed in user
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
                // console.log("user: ",user)
                var user = app.auth().currentUser;
                // console.log("user.uid:"+ user.uid);
                const firebaseId = user.uid; 
                var d = new Date();
                let timeOut= d.toLocaleTimeString();
                console.log("id: " + firebaseId);
                console.log("checked out");
                axios({
                    method:'post',
                    url:'/api/updateCheckin',
                    // data to be passed to backend
                    data: {
                        timeOut, firebaseId
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });  
            }
        }); 
        console.log("checked out");
        // history.push("/");
        // history.push("/checkin/checkin");
    }
    render() {
        return (
            <React.Fragment>
                {/* <div className="container center" id="checkin">
                    <h1>To do</h1>
                    <ul>
                        <li>
                            Displays Currently Checked in store
                            <p>- checkin or out button</p>
                            <p>- view # of people checked in</p>
                        </li>

                        <li>Displays previously checked in stores(password protected) </li>
                    </ul>
                </div> */}
               
                    {/* <table>
                        <tbody>
                        <tr id="row0">
                            <td id="cell0-2">  You are currently signed into: {this.state.storeName}  </td>
                        </tr>
                        </tbody>
                    </table> */}

                {'0' !== this.state.timeOut
                ? (
                  //user is not checked into store
                  <React.Fragment>
                        <div className="container">
                            <h2> No store currently signed into </h2>
                            <Link to="/checkin/history"><button>CheckIn History</button></Link>
                        </div>
                  </React.Fragment>
                )
                :
                // user is already checked into store 
                <React.Fragment>
                  <div className="container">
                    <h2> You are currently signed into: {this.state.storeName} </h2>
                    <Link to="/checkin/checkin"><button onClick= { () =>this.checkOut()}> Check out?</button></Link>
                    <div></div>
                    <Link to="/checkin/history"><button>CheckIn History</button></Link>
                  </div>
                  
                </React.Fragment>


              }

            </React.Fragment>
        );
    }
}

export default CheckIn;