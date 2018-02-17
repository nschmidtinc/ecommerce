import React, { Component } from 'react';
import './App.css';

class ListNewItem extends Component {
    validation = () => {
        var user = this.props.userInfo;
        var itemName = this.inputName.value;
        var itemPrice = this.inputPrice.value;
        var itemDesc = this.inputDesc.value;
        this.inputName.value = null; this.inputPrice.value = null; this.inputDesc.value = null;
        if (itemName === "" || itemName === " ") return window.alert("Please enter a name for your listing");
        else if (itemPrice === "") { return window.alert("Please enter a price for your listing"); }
        else if (parseInt(itemPrice, 10) === 0) { return window.alert("You cannot list items for free!"); }
        else if (itemDesc === "" || itemDesc === " ") { return window.alert("Please enter a description for your listing"); }
        else {
            fetch("/newListing", { method: "POST", body: JSON.stringify({ username: user, itemname: itemName, price: Math.round(itemPrice), description: itemDesc }) })
                .then(x => x.text())
                .then(x => {
                    this.props.itemInfo(x);
                    this.props.changePage("account");
                });
        }
    }
    render() {
        return (<div className="AppMain">
            <h1>Put Up a New Item For Sale</h1>
            <div className="ListNewItem">
                <p><strong><ins>Username</ins> : </strong>{this.props.userInfo}</p>
                {<p><strong><ins>Name</ins> : </strong><input type="text" ref={r => this.inputName = r} placeholder="Item Name" required="true" /></p>}
                <p><strong><ins>Price</ins> : </strong>$<input type="number" ref={r => this.inputPrice = r} placeholder="Price" required="true" />.00</p>
                <p><strong><ins>Description</ins> : </strong></p>
                <input className="InputDescription" type="text" ref={r => this.inputDesc = r} placeholder="Description" required="true" />
                <div>
                    <button className="ListItemButton" onClick={this.validation}>Display It For Sale</button>
                    <button className="ListItemButton" onClick={() => this.props.changePage("account")} size="50">Back</button>
                </div>
            </div>
        </div>);
    }
}
export default ListNewItem;