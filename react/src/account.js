import React, { Component } from 'react';
import './App.css';
import YourListings from './yourListings.js';

class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
            currentList: "listed",
            userListings: []//,
            // itemsBought: [],
            // itemsSold: []
        };
    }
    componentDidMount = () => {
        console.log(this.props.userInfo);
        switch (this.state.currentList) {
            case "listed":
                fetch('/userListings', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
                break;
            case "bought":
                fetch('/userBought', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
                break;
            case "sold":
                fetch('/userSold', { method: "POST", body: JSON.stringify({ username: this.props.userInfo }) }).then(x => x.text()).then(x => { this.setState({ userListings: JSON.parse(x) }); });
                break;
            default: break;
        }
    }
    switchList = (newList) => { this.setState({ currentList: newList }); }
    render() {
        console.log("account");
        return (<div className="AppMain">
            <h1>{this.props.userInfo}'s Account Information</h1>
            <div className="AccountButtons">
                <button className="AccountButton" onClick={() => this.props.changePage("list new item")}>List a New Item For Sale</button>
                <button className="AccountButton" onClick={() => this.props.changePage("main")} size="25">Back</button>
            </div>
            <h4>{this.state.currentList === "listed" ? "Items Listed by " + this.props.userInfo : this.state.currentList === "bought" ? "Items purchased by " + this.props.userInfo : this.state.currentList === "sold" ? "Items sold by " + this.props.userInfo : "You're not supposed to see this"}</h4>
            <div>
                <div className="AccountInfo">
                    <ul>Username : {this.props.userInfo}</ul>
                    <ul>------------------------------------------------</ul>
                    <ul><button onClick={() => this.switchList("listed")}>Display</button></ul>
                    <ul>Number of Items Listed : {this.state.userListings.length}</ul>
                    <ul><button onClick={() => this.switchList("bought")}>Display</button></ul>
                    <ul>Number of Items Bought : {this.state.userListings.length}</ul>
                    <ul><button onClick={() => this.switchList("sold")}>Display</button></ul>
                    <ul>Number of Items Sold : {this.state.userListings.length}</ul>
                </div>
                <div className="UserAccountList">
                    {this.state.userListings.map((x, i) => (<YourListings key={i} count={i} obj={this.state.userListings} />))}
                </div>
            </div>
        </div>);
    }
}

export default AccountPage;