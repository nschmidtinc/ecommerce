import React, { Component } from 'react';
import './App.css';
import SignUp from './signup.js';
import LogIn from './login.js';
import AccountPage from './account.js';
import ListNewItem from './listNewItem.js';
import OtherListing from './otherListing.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "main",
      userKnown: false,
      userName: "guest",
      globalListings: [],
      //userListings: [],
      searchResult: ""
    };
  }
  searchResults = () => {
    if (this.searchInput.value === "") return;
    var input = this.searchInput.value;
    this.searchInput.value = null;
    this.setState({ searchResult: input });
  }
  clearSearch = () => {
    this.searchInput.value = null
    this.setState({ searchResult: "" });
  }

  // HEADER BUTTON FUNCTIONS
  clickAccountButton = () => { this.setState({ currentPage: "account" }); }
  clickSignUpButton = () => { this.setState({ currentPage: "sign up" }); }
  clickLogInButton = () => { this.setState({ currentPage: "log in" }); }
  clickLogOutButton = () => { this.setState({ userKnown: false, userName: "Guest" }); }
  loggedIn = () => {
    return (<div className="UserAccountButtons">
      <button onClick={this.clickAccountButton}>Account{" : " + this.state.userName}</button>
      <button onClick={this.clickLogOutButton}>Log - out</button>
    </div>)
  }
  notLoggedIn = () => {
    return (<div className="UserAccountButtons">
      <button onClick={this.clickLogInButton}>Log - In</button>
      <button onClick={this.clickSignUpButton}>Register</button>
    </div>);
  }
  getMainPage = () => {
    return (<div className="App">
      <h1>Alibuy</h1>
      <h1>{"Welcome " + this.state.userName}</h1>
      {this.state.userKnown ? this.loggedIn() : this.notLoggedIn()}
      <div>
        <button onClick={this.searchResults}>Search!</button>
        <input className="SearchBox" type="search" name="q" ref={r => this.searchInput = r} autoComplete="on" placeholder="What are you looking to buy?" />
        <button onClick={this.clearSearch}>Clear Search</button>
      </div>
      <div>{<OtherListing />}</div>
    </div>);
  }
  render() {
    switch (this.state.currentPage) {
      case "main": return this.getMainPage();
      case "account": return <AccountPage changePage={this.switchPage} userStatus={this.userStatus} userInfo={this.state.userName} />;
      case "sign up": return <SignUp changePage={this.switchPage} userStatus={this.userStatus} />;
      case "log in": return <LogIn changePage={this.switchPage} userStatus={this.userStatus} />;
      case "list new item": return <ListNewItem changePage={this.switchPage} userInfo={this.state.userName} addListing={this.addItem} />
      default: return this.getMainPage();
    }
  }
  switchPage = (newPage) => { this.setState({ currentPage: newPage }); }
  userStatus = (userLog, username) => { this.setState({ userKnown: userLog, userName: username }); }
  addItem = (username, itemName, itemPrice, itemDesc) => {
    var listing = {};
    listing["username"] = username;
    listing["item name"] = itemName;
    listing["price"] = itemPrice;
    listing["description"] = itemDesc;
    this.setState({ globalListings: listing[itemID] });
  }
}

export default App;