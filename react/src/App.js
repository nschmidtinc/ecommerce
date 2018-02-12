import React, { Component } from 'react';
import './App.css';
import SignUp from './signup.js';
import LogIn from './login.js';
import AccountPage from './account.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "main",
      userKnown: false,
      searchResult: []
    };
  }
  searchResults = () => {
    if (this.searchInput.value === "") return;
    var input = this.searchInput.value;
    this.searchInput.value = null;
    this.setState({ searchResult: this.state.searchResult.concat(input) });
  }
  clearSearch = () => {
    this.searchInput.value = null
    this.setState({ searchResult: [] });
  }

  // HEADER BUTTON FUNCTIONS
  clickAccountButton = () => { this.setState({ currentPage: "account" }); }
  clickSignUpButton = () => { this.setState({ currentPage: "sign up" }); }
  clickLogInButton = () => { this.setState({ currentPage: "log in" }); }
  clickLogOutButton = () => {}
  loggedIn = () => {
    return (<div className="userAccountButtons">
      <button onClick={this.clickAccountButton}>Account{/*this.username*/}</button>
      <button onClick={this.userLogToggle}>Log - out</button>
    </div>)
  }
  notLoggedIn = () => {
    return (<div className="userAccountButtons">
      <button onClick={this.clickLogInButton}>Log - In</button>
      <button onClick={this.clickSignUpButton}>Register</button>
    </div>);
  }
  getMainPage = () => {
    return (<div className="App">
      <h1>Alibuy</h1>
      {this.props.usrknown ? this.loggedIn() : this.notLoggedIn()}
      <div>
        <button onClick={this.searchResults}>Search!</button>
        <input className="searchBox" type="search" name="q" ref={r => this.searchInput = r} autoComplete="on" placeholder="What are you looking to buy?"></input>
        <button onClick={this.clearSearch}>Clear Search</button>
      </div>
      <div>{this.state.searchResult.map((x, i) => <li key={i}>{x}</li>)}</div>
    </div>);
  }
  render() {
    switch (this.state.currentPage) {
      case "main": return this.getMainPage();
      case "account": return <AccountPage changePage={this.switchPage} />;
      case "sign up": return <SignUp changePage={this.switchPage} />;
      case "log in": return <LogIn changePage={this.switchPage} />;
      case "log out": return null;
      default: return null;
    }
  }
  switchPage = (x) => { this.setState({ currentPage: x }); }
}

export default App;