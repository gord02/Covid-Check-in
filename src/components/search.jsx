import React, { Component } from 'react'
import "./Styles/styles.css"

class Search extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <h1>Search</h1>
                    <div id="center">
                        <button type="button" className="btn btn-secondary justify-content-center" id="buttons" >Heat Map</button>
                        <button type="button" className="btn btn-secondary justify-content-center" id="buttons" >Filter</button>
                        <button className="btn btn-secondary justify-content-center" id="buttons" >Search Stores</button>
                    </div>

                    <div id="margins ">
                        <h1>To do</h1>
                        <ul>
                            <li>Heat Map </li>
                            <li>Filtering # of people</li>
                            <li>search by store(see # of people) </li>
                        </ul>
                    </div>

                    <nav className="navbar navbar-light justify-content-between " id="padding">
                        <ul className="nav navbar-nav mr-auto">
                        </ul>
                        <ul className="nav navbar-nav mr-auto">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </ul>

                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;