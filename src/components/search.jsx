import React, { Component } from 'react'
import "./styles.css"

class Search extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <div className="d-flex justify-content-center " id="margins ">
                        <h1>To do</h1>
                        <ul>
                            <li>Heat Map </li>
                            <li>Filtering # of people </li>
                            <li>search by store(see # of people) </li>
                        </ul>
                    </div>
                    <div id="center">
                        <button type="button" className="btn btn-secondary justify-content-center" id="buttons" >Heat Map</button>
                        <button type="button" className="btn btn-secondary justify-content-center" id="buttons" >Filter</button>
                        <button className="btn btn-secondary justify-content-center" id="buttons" >Search Stores</button>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Search;