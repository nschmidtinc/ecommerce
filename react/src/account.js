import React, { Component } from 'react';
import './App.css';
import YourItems from './yourListings.js';

class AccountPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div className="App">
            <h1>{this.props.userInfo}'s Account Information</h1>
            <div className="AccountButtons">
                <button className="AccountButton" onClick={() => this.props.changePage("list new item")}>List a New Item For Sale</button>
                <button className="AccountButton" onClick={() => this.props.changePage("main")} size="25">Back</button>
            </div>
            <h4>Your Listed Items</h4>
            <div>
                <div className="AccountInfo">
                    <ul>Username : {this.props.userInfo}</ul>
                    <ul>---------------------------</ul>
                    <ul>Number of Items Listed : 5</ul>
                    <ul>Number of Items Sold : 10</ul>
                    <ul>Number of Items Bought : 9</ul>
                </div>
                <div className="AccountList">
                    <YourItems username={this.props.userInfo}/>
                </div>
            </div>
        </div>);
    }
}

export default AccountPage;