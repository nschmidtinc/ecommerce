import React, { Component } from 'react';
import './App.css';

class PurchaseScreen extends Component {
    constructor() {
        super();
        this.state = { invalidPurchase: false }
    }
    componentDidMount = () => {
        this.props.userInfo === this.props.itemInfo.sellerName ? this.setState({ invalidPurchase: true }) : this.setState({ invalidPurchase: false })
    }
    clickBuyButton = () => {
        console.log("buying");
        fetch('/buy', { method: "POST", body: JSON.stringify({ buyerName: this.props.userInfo, sellerName: this.props.itemInfo.sellerName, listingID: this.props.itemInfo.listingID }) })
            .then(x => x.text())
            .then(x => {
                window.alert("Item Purchased Successfully");
                this.props.changePage("main");
                this.props.updateList();
            });
    }
    canBuyItem = () => {
        return (<div>
            <h1>Purchase This Item!</h1>
            <div className="SubItemDisplay"><img src="metaknight.png" alt="Run Coward" height="200" width="200" /></div>
            <div className="CheckOutPage">
                <p><strong><ins>Seller</ins> : </strong>{this.props.itemInfo.sellerName}</p>
                <p><strong><ins>Item</ins> : </strong>{this.props.itemInfo.itemName}</p>
                <p><strong><ins>Price</ins> : </strong>${this.props.itemInfo.price}.00</p>
                <div><strong><ins>Description</ins> : </strong>{this.props.itemInfo.description}</div>
                <h1>Buy {this.props.itemInfo.itemName} from user {this.props.itemInfo.sellerName} for ${this.props.itemInfo.price}.00 ?</h1>
                <button onClick={this.clickBuyButton} disabled={this.state.invalidPurchase}>Purchase</button>
                <button onClick={() => this.props.changePage("main")}>Back</button>
            </div>
        </div>);
    }
    cannotBuyItem = () => {
        return (<div>
            <h1>Who are you again?</h1>
            <div>You must log-in or register if you wish to make purchases on this site!</div>
            <div>
                <img src="metaknight.png" alt="Meta Knight" height="200" width="200" />
            </div>
            <button className="AccountButton" onClick={() => this.props.changePage("main")}>Whoopsies!</button>
        </div>);
    }
    render() {
        console.log("purchase");
        return (<div className="App">
            <div>
                {this.props.userLogged ? this.canBuyItem() : this.cannotBuyItem()}
            </div>
        </div>);
    }
}

export default PurchaseScreen;