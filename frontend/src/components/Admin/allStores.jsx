import React, { Component } from 'react';
import axios from 'axios';


class AllStoresNIU extends Component {
    // state={storeName, storeLng, storeLat};
    render(storeName, storeLng, storeLat) {
        // this is the individual items to be rendered therefore stores
        // const elements = ['one', 'two', 'three'];
        console.log({storeName});
        console.log({storeLng});
        console.log({storeLat});
        console.log(storeName);
        console.log(storeLng);
        console.log(storeLat);
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

class AllStores extends React.Component {
    state = {
      stores: []
    };
  
    componentDidMount() {
      axios.get('/api/stores')
        .then(res => {
          // sets array of JSON objects to the vairble name stores
          const stores = res.data;
          // console.log(stores);
          // console.log( typeof stores);
          this.setState({ stores });
        })
    }
  
    render() {
      return (
        <ul>
          { this.state.stores.map(store => <li>{store.name}</li>)}
        </ul>
      )
    }
}

export default AllStores;