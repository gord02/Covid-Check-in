import React, { Component } from 'react';
import "./Styles/styles.css";
import { Link } from "react-router-dom";

class Search extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>Search</h1>
                    <div id="center">
                        <Link to="/search/map" id="buttons" className="btn btn-secondary ">Heat Map</Link>
                        <Link to="/search/filter" className="btn btn-secondary" id="buttons" >Filter</Link>
                        <Link to="/search/searchstore" className="btn btn-secondary" id="buttons">Search Stores</Link>
                    </div>

                    <div id="margins ">
                        <h1>To do</h1>
                        <ul>
                            <li>Heat Map </li>
                            <li>Filtering # of people</li>
                            <li>search by store(see # of people) </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;