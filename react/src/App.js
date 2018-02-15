import React, { Component } from 'react';
import './App.css';
import SignUp from './signup.js';
import LogIn from './login.js';
import AccountPage from './account.js';
import ListNewItem from './listNewItem.js';
import GlobalListings from './globalListing.js';
import SpecialPage from './special page.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "main",
      userKnown: false,
      userName: "Guest",
      displayResult: ["", "", "", "", "", ""]
    };
  }
  // searchResults = () => {
  //   if (this.searchInput.value === "") return;
  //   var input = this.searchInput.value;
  //   this.searchInput.value = null;
  //   this.displayResults(input);
  // }
  displayResults = () => {
    if (this.searchInput.value === "") return;
    document.getElementById("SearchClearButton").disabled = false;
    var input = this.searchInput.value;
    this.searchInput.value = null;
    this.setState({ displayResult: this.state.displayResult.concat(input) });
  }
  clearSearch = () => {
    this.searchInput.value = null
    this.setState({ displayResult: ["1", "2", "3", "4", "5", "6"] });
    document.getElementById("SearchClearButton").disabled = true;
  }
  clickAccountButton = () => { return this.setState({ currentPage: "account" }); }
  clickSignUpButton = () => { return this.setState({ currentPage: "sign up" }); }
  clickLogInButton = () => { return this.setState({ currentPage: "log in" }); }
  clickLogOutButton = () => { return this.setState({ userKnown: false, userName: "Guest" }); }
  clickSpecialButton = () => { return this.setState({ currentPage: "special page" }); }
  loggedIn = () => {
    return (<div className="UserAccountButtons">
      <button onClick={this.clickAccountButton}>{this.state.userName}</button>
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
    return (<div>
      {this.state.userKnown ? this.loggedIn() : this.notLoggedIn()}
      <div className="App">
        <div>
          <button type="button" onClick={this.displayResults}>Search!</button>
          <input className="SearchBox" type="search" name="q" ref={r => this.searchInput = r} placeholder={"Hello " + this.state.userName + ", what are you looking to buy?"} />
          <button id="SearchClearButton" type="button" onClick={this.clearSearch} disabled>Clear Search</button>
        </div>
        <div>{this.state.displayResult.map((x, i) => <div key={i} className="ItemDiv">{<GlobalListings /*info={this.state.displayResult[x]}*/ />}</div>)}</div>
        <button onClick={this.clickSpecialButton}></button>
      </div>
    </div>);
  }
  render() {
    switch (this.state.currentPage) {
      case "main": return this.getMainPage();
      case "account": return <AccountPage changePage={this.switchPage} userStatus={this.userStatus} userInfo={this.state.userName} />;
      case "sign up": return <SignUp changePage={this.switchPage} userStatus={this.userStatus} />;
      case "log in": return <LogIn changePage={this.switchPage} userStatus={this.userStatus} />;
      case "list new item": return <ListNewItem changePage={this.switchPage} userInfo={this.state.userName} />;// addListing={this.addItem}
      case "special page": return <SpecialPage />
      default: return this.getMainPage();
    }
  }
  switchPage = (newPage) => { this.setState({ currentPage: newPage }); }
  userStatus = (userLog, username) => { this.setState({ userKnown: userLog, userName: username }); }
  // addItem = (username, itemPrice, itemDesc) => {
  //   var listing = {
  //     "username": username,
  //     "price": itemPrice,
  //     "description": itemDesc
  //   };
  //   var userList = {};
  //   userList[Math.floor(Math.random() * 100000000)] = listing;
  //   this.setState({ userListings: userList });
  // }
}

export default App;