import React, { Component } from 'react';
import './App.css';

class ListNewItem extends Component {
    validation = () => {
        var user = this.props.userInfo;
        var itemName = this.inputName.value;
        var itemPrice = this.inputPrice.value;
        var itemDesc = this.inputDesc.value;
        //var itemImg = this.inputImg.value;
        this.inputName.value = null; this.inputPrice.value = null; this.inputDesc.value = null;
        if (itemName === "" || itemName === " ") return window.alert("Please enter a name for your listing");
        else if (itemPrice === "") { return window.alert("Please enter a price for your listing"); }
        else if (Math.round(parseInt(itemPrice, 10)) === 0) { return window.alert("You cannot list items for free!"); }
        else if (itemDesc === "" || itemDesc === " ") { return window.alert("Please enter a description for your listing"); }
        else {
            fetch("/newListing", { method: "POST", body: JSON.stringify({ username: user, itemname: itemName, price: itemPrice, description: itemDesc }) })
                .then(x => x.text())
                .then(x => {
                    this.props.itemInfo(x);
                    this.props.changePage("account");
                });
        }
    }
    render() {
        return (<div className="App">
            <h1>Put Up a New Item For Sale</h1>
            <div className="ListNewItem">
                <div className="ListItemName"><strong><ins>Username</ins> : </strong>{this.props.userInfo}</div>
                <div><input className="ListItemInfo" type="text" ref={r => this.inputName = r} placeholder="Item Name" required="true" /></div>
                <div><input className="ListItemInfo" type="number" ref={r => this.inputPrice = r} placeholder="Price" required="true" /></div>
                <div><input className="ListItemInfo" type="text" ref={r => this.inputDesc = r} placeholder="Description" required="true" /></div>
                <button className="ListItemButton" onClick={this.validation}>Display It For Sale</button>
                <button className="ListItemButton" onClick={() => this.props.changePage("account")} size="50">Back</button>
            </div>
        </div>);
    }
}
export default ListNewItem;