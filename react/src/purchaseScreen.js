import React, { Component } from 'react';
import './App.css';

class PurchaseScreen extends Component {
    clickBuyButton = () => {
        fetch('/userBought', {method: "POST", body: JSON.stringify({username: this.props.userInfo })}).then(x => x.text()).then(x => console.log(x))
    }
    render() {
        console.log("purchase");
        return (<div className="AppMain">
            <div>
                <div>HELLO!</div>
                <button className="AccountButton" onClick={this.clickBuyButton}>BUY NOW!</button>
                <button className="AccountButton" onClick={() => this.props.changePage("main")}>Back</button>
            </div>
        </div>);
    }
}

export default PurchaseScreen;