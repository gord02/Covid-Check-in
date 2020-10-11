import React, { Component } from 'react'

class AllStores extends Component {

    render(storeName, storeLng, storeLat) {
        // this is the individual items to be rendered therefore stores
        // const elements = ['one', 'two', 'three'];
        const elements = [storeName, storeLng, storeLat];

        // array that renders the stores
        const items = []
      
        // for loop to render each store
        for (const [index, value] of elements.entries()) {
            // puts components into array, therefore divs will be rendered for each store
            items.push(
                // value is the infomration to be placed in div, therefore stores
                <div key={index}>{value}</div>
                )
        }
      
        return (
            <React.Fragment>
            <div>
            <h1>all stores</h1>
                <div>
                    {/* <h1>storeName</h1>
                    <h1>storeLng</h1>
                    <h1>storeLat</h1> */}
                    <div>
                        <h1>Store: </h1>
                        {items}
                    </div>
                </div>
            </div>
        
            </React.Fragment>

        );
    }
}

export default AllStores;