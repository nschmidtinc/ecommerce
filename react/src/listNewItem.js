import React, { Component } from 'react';
import './App.css';
var counter = 0;
class ListNewItem extends Component {
    constructor() {
        super();
        this.state = {}
    }
    validation = () => {
        var user = this.props.userInfo;
        //var itemName = this.inputName.value;
        var itemPrice = this.inputPrice.value;
        var description = this.inputDesc.value;
        /*this.inputName.value = null;*/ this.inputPrice.value = null; this.inputDesc.value = null;
        fetch("/newListing", { method: "POST", body: JSON.stringify({ userName: user, /*itemName: itemName,*/ price: itemPrice, desc: description }) })
            .then(x => x.text())
            .then(x => {
                window.alert(x);
                if (x === "New listing successful") { this.props.addListing(user, itemPrice, description); this.props.changePage("account"); }
            });
    }
    render() {
        return (<div className="App">
            <h1>Put Up a New Item For Sale</h1>
            <div className="ListNewItem">
                <p><strong><ins>Username</ins> : </strong>{this.props.userInfo}</p>
                {/*<p><strong><ins>Name</ins> : </strong><input type="text" ref={r => this.inputName = r} placeholder="Item Name" required="true" /></p>*/}
                <p><strong><ins>Price</ins> : </strong><input type="number" ref={r => this.inputPrice = r} placeholder="Price" required="true" />.00$</p>
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
// <div><input type="image" src="" /></div>
// <input type="checkbox"></input>
export default ListNewItem;