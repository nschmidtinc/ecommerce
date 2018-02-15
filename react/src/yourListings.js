import React, { Component } from 'react';
import './App.css';

class YourListings extends Component {
    render() {
        console.log("user listing");
        try {
            return (<div className="UserItemDisplay">
                <button>Details</button><button>Remove It</button>
                <div>
                    <div className="SubItemDisplay"><img src="metaknight.png" alt="Run Coward" height="100" width="100" /></div>
                    <div><small>
                        <p><strong><ins>Item</ins> : </strong>{this.props.obj[this.props.count].itemName}</p>
                        <p><strong><ins>Price</ins> : </strong>${this.props.obj[this.props.count].price}.00</p>
                    </small></div>
                    <div><small>
                        <p><strong><ins>Description</ins> : </strong>{this.props.obj[this.props.count].description}</p></small>
                    </div>
                </div>
            </div>);
        } catch (err) { console.log(err); return null; }
    }
}

export default YourListings;