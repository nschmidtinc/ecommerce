import React, { Component } from 'react';
import './App.css';

class OtherListing extends Component {
    constructor() {
        super();
        this.state = {
            allListings: [],
            listing: [""]
        }
    }
    // componentDidMount = () => {
    //     fetch("/listAllItems").then(x => x.json(x)).then(x => { this.setState({ listing: x }) });
    // }
    // items = () => {
    //     fetch("/listAllItems").then(x => x.json(x)).then(x => { console.log(x); this.setState({ listing: x }) });
    // }
    /*itemDesc = (x) => {
        return (<div>
            <div>
                <p className="Tag">Username : </p><p>{}</p>
            </div>
            <div>
                <p className="Tag">Price : </p><p>{}</p>
            </div>
            <div>
                <p className="Tag">Description : </p><p>{}</p>
            </div>
        </div>);
    }*/
    render() {
        //this.items();
        return (<ul className="App">
            {/*this.state.listing.map((x, i) => <li className="List" key={i}>{x}</li>)*/}
        </ul>);
    }
}

export default OtherListing;