import React, { Component } from 'react';
import './App.css';

class ListNewItem extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div className="App">
            <h1>Put Up a New Item For Sale</h1>
            <div className="ListNewItem">
                <p className="Tag">Username : {this.props.userInfo}</p>
                <div><p className="Tag">Price : <input type="number" placeholder="Price" required="true" />.00$</p></div>
                <div><input className="InputDescription" type="text" placeholder="Description" required="true" /></div>
                <div>
                    <button className="ListItemButton">Display It For Sale</button>
                    <button className="ListItemButton" onClick={() => this.props.changePage("account")} size="50">Back</button>
                </div>
            </div>
        </div>);
    }
}
// <div><input type="image" src="" /></div>
// <input type="checkbox"></input>
export default ListNewItem;