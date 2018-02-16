import React, { Component } from 'react';
import './App.css';
import YourListings from './yourListings.js';

class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
            currentList: "Items Listed by ",
            userListings: []
        };
    }
    componentDidMount = () => {
        fetch('/globalListings').then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
        //fetch('/userListings', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
    }
    displayListedList = (newList) => {
        fetch('/userListings', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { console.log(x); this.setState({ userListings: JSON.parse(x) }); });
        this.setState({ currentList: newList });
    }
    displayBoughtList = (newList) => {
        fetch('/userBought', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
        this.setState({ currentList: newList });
    }
    displaySoldList = (newList) => {
        fetch('/userSold', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
        this.setState({ currentList: newList });
    }
    render() {
        console.log("account");
        console.log(this.state.userListings);
        return (<div className="AppMain">
            <h1>{this.props.userInfo}'s Account Information</h1>
            <div className="AccountButtons">
                <button className="AccountButton" onClick={() => this.props.changePage("list new item")}>List a New Item For Sale</button>
                <button className="AccountButton" onClick={() => { this.props.changePage("main"); this.props.updateList(); }}>Back</button>
            </div>
            <h4>{this.state.currentList + this.props.userInfo}</h4>
            <div>
                <div className="AccountInfo">
                    <ul>Username : {this.props.userInfo}</ul>
                    <ul>------------------------------------------------</ul>
                    <ul>Number of Items : {this.state.userListings.length}</ul>
                    <ul><button onClick={() => this.displayListedList("Items Listed by ")}>Display Items Listed</button></ul>
                    <ul><button onClick={() => this.displayBoughtList("Items purchased by ")}>Display Items Bought</button></ul>
                    <ul><button onClick={() => this.displaySoldList("Items sold by ")}>Display Items Sold</button></ul>
                </div>
                <div className="UserAccountList">
                    {this.state.userListings.map((x, i) => (<YourListings key={i} count={i} obj={this.state.userListings} />))}
                </div>
            </div>
        </div>);
    }
}

export default AccountPage;