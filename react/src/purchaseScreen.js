import React, { Component } from 'react';
import './App.css';

class PurchaseScreen extends Component {
    clickBuyButton = () => {
        fetch('/buy', { method: "POST", body: JSON.stringify({ buyerName: this.props.userInfo, sellerID: this.props.itemInfo.sellerID, listingID: this.props.itemInfo.listingID }) })
            .then(x => x.text())
            .then(x => {
                console.log(x);
                fetch('/globalListings').then(x => x.text()).then(x => { this.props.updateList(x) });
                window.alert("FOOL! You foolishly fooled yourself in a foolish manner into fooling your foolish fool of a fool that you foolishly are to foolishingly purchase this foolish item with your foolishness you foolish fool!");
                this.props.changePage("main");
            });
    }
    canBuyItem = () => {
        return (<button onClick={this.clickBuyButton}>Purchase</button>);
    }
    cannotBuyItem = () => {
        return (<div>
            <div>You must log-in or register if you wish to make purchases on this site!</div>
            <button onClick={() => this.props.changePage("log in")}>Log - In</button>
            <button onClick={() => this.props.changePage("sign up")}>Register</button>
        </div>);
    }
    render() {
        console.log("purchase");
        return (<div className="AppMain">
            <div>
                <h1>Purchase This Item!</h1>
                {this.props.userLogged ? this.canBuyItem() : this.cannotBuyItem()}
                <button className="AccountButton" onClick={() => this.props.changePage("main")}>Back</button>
            </div>
        </div>);
    }
}

export default PurchaseScreen;