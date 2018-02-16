import React, { Component } from 'react';
import './App.css';

class GlobalListings extends Component {
    handleBuy = () => {
        this.props.setItemInfo(this.props.obj[this.props.count]);
        this.props.changePage("purchase screen");
    }
    render() {
        console.log("global");
        return (<div className="ItemDisplay">
            <button className="PurchaseButton" type="button" onClick={this.handleBuy}>BUY NOW!</button>
            <div>
                <div className="SubItemDisplay"><img src="kirby.png" alt="Run Coward" height="75" width="75" /></div>
                <div><small>
                    <p><strong><ins>Seller</ins> : </strong>{this.props.obj[this.props.count].sellerName}</p>
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

export default GlobalListings;