import React, { Component } from 'react'

class createStore extends Component {

    

    render() {
        return (
            <div className="createStore container">
                <h1>Add Store</h1>
                {/*  onSubmit={(event) => { this.authEmailPassword(event) }} ref={(form) => { this.loginForm = form }}  */}
                <form method="POST" action="/api/newstore" >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Store/Location Name</label>
                        {/* ref={(input) => { this.emailInput = input }} */}
                        <input type="text" name="storeName" className="form-control" id="storeName" aria-describedby="storeName" placeholder=" store/Location Name" ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="number" step="0.0001" name="storeLng" className="form-control" id="storeLng" placeholder="Longitude of Store"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="number" step="0.0001" name="storeLat" className="form-control" id="storeLat" placeholder="Latitude of Store"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Store Location</button>
                </form>
            </div>
        );
    }
}

export default createStore;