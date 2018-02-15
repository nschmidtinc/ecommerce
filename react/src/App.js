import React, { Component } from 'react';
import './App.css';
import SignUp from './signup.js';
import LogIn from './login.js';
import AccountPage from './account.js';
import ListNewItem from './listNewItem.js';
import GlobalListings from './globalListing.js';
import PurchaseScreen from './purchaseScreen';
import SpecialPage from './special page.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "main",
      userKnown: false,
      username: "Guest",
      allListings: [],
      numberOfListings: []
    };
  }
  componentDidMount = () => {
    fetch('/globalListings').then(x => x.text()).then(x => { this.setState({ allListings: JSON.parse(x) }); });
  }
  searchResults = () => {
    if (this.searchInput.value === "") return;
    // var input = this.searchInput.value;
    this.searchInput.value = null;
  }
  clearSearch = () => {
    this.searchInput.value = null
    this.setState({ displayResult: [] });
  }
  clickAccountButton = () => { return this.setState({ currentPage: "account" }); }
  clickSignUpButton = () => { return this.setState({ currentPage: "sign up" }); }
  clickLogInButton = () => { return this.setState({ currentPage: "log in" }); }
  clickLogOutButton = () => { return this.setState({ userKnown: false, username: "Guest" }); }
  clickSpecialButton = () => { return this.setState({ currentPage: "special page" }); }
  loggedIn = () => {
    return (<div className="UserAccountButtons">
      <button onClick={this.clickAccountButton}>{this.state.username}</button>
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
    console.log("main");
    return (<div>
      {this.state.userKnown ? this.loggedIn() : this.notLoggedIn()}
      <div className="App">
        <div>
          <button type="button" onClick={this.searchResults}>Search!</button>
          <input className="SearchBox" type="search" name="q" ref={r => this.searchInput = r} placeholder={"Hello " + this.state.username + ", what are you looking to buy?"} />
          <button type="button" onClick={this.clearSearch} disabled="true">Clear Search</button>
        </div>
        <div className="GlobalItemList">
          {this.state.allListings.map((x, i) => (<GlobalListings key={i} changePage={this.switchPage} userLogged={this.state.userKnown} count={i} obj={this.state.allListings}  />))}
        </div>
        <button onClick={this.clickSpecialButton}></button>
      </div>
    </div>);
  }
  render() {
    switch (this.state.currentPage) {
      case "main": return this.getMainPage();
      case "account": return <AccountPage changePage={this.switchPage} userStatus={this.userStatus} userInfo={this.state.username} />;
      case "sign up": return <SignUp changePage={this.switchPage} userStatus={this.userStatus} />;
      case "log in": return <LogIn changePage={this.switchPage} userStatus={this.userStatus} />;
      case "list new item": return <ListNewItem changePage={this.switchPage} userInfo={this.state.username} />;
      case "purchase screen": return <PurchaseScreen changePage={this.switchPage} userInfo={this.state.username} />
      case "special page": return <SpecialPage />;
      default: return this.getMainPage();
    }
  }
  switchPage = (newPage) => { this.setState({ currentPage: newPage }); }
  userStatus = (userLog, username) => { this.setState({ userKnown: userLog, username: username }); }
}

export default App;