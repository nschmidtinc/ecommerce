import React, { Component } from 'react';
import './App.css';

class AccountPage extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div className="App">
            <h1>Account Information</h1>
            <h1>{this.props.userInfo}</h1>
            <div>
                <button onClick={() => this.props.changePage("main")} size="25">Back</button>
            </div>
            <div className="List">
                <li>Username : {this.props.userInfo}</li>
                <li>---------------------------</li>
                <li>Number of Items Listed : 5</li>
                <li>Number of Items Sold : 10</li>
                <li>Number of Items Bought : 9</li>
                <li>Sexy pics link</li>
            </div>
        </div>);
    }
}

export default AccountPage;