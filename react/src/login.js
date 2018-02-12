import React, { Component } from 'react';
import './App.css';

class LogIn extends Component {
    validation = () => {
        var x = this.inputUser.value;
        var y = this.inputPass.value;
        this.inputUser.value = null;
        this.inputPass.value = null;
        if (this.inputPass[x] === y) { return window.alert("The username or password you entered is incorrect."); }
        else { return this.props.changePage("main") }
    }
    render() {
        return (<div className="App">
            <h1>Login</h1>
            <input ref={r => this.inputUser = r} type="text" placeholder="Username" required={true}  size="50"></input>
            <div><input ref={r => this.inputPass = r} type="password" placeholder="Password" required={true}  size="50"></input></div>
            <button onClick={this.validation}  size="50">Submit</button>
            <button onClick={() => this.props.changePage("main")}  size="50">Back</button>
        </div>);
    }
}

export default LogIn;