import React, { Component } from 'react';

class SearchStore extends Component {
    render() {
        return (
            <React.Fragment>

                <form>
                    <input className="form-control mr-sm-2 container" id="search" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

            </React.Fragment>
        );
    }
}

export default SearchStore;