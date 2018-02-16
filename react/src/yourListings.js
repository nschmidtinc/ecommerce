import React, { Component } from 'react';
import './App.css';

class YourListings extends Component {
    listingDeleted = () => {
        fetch('/deleteListing', { method: "POST", body: JSON.stringify({ listingID: this.props.obj[this.props.count].listingID }) })
            .then(x => x.text())
            .then(x => {
                window.alert(x);
                this.props.updateList('/userListings', "Items Listed by ");
            });
    }
    isDeletable = () => {
        console.log(this.props.currentList);
        if (this.props.currentList === "Items Listed by ") {
            return (<button onClick={this.listingDeleted}>Remove It</button>);
        }
    }
    render() {
        console.log("user listing");
        console.log(this.props.currentList);
        return (<div className="UserItemDisplay">
            {this.isDeletable()}
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
    }
}

export default YourListings;