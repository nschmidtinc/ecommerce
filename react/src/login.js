import React, { Component } from 'react';
import './App.css';

class LogIn extends Component {
    validation = () => {
        var user = this.inputUser.value;
        var pass = this.inputPass.value;
        this.inputUser.value = null; this.inputPass.value = null;
        fetch("/login", { method: "POST", body: JSON.stringify({ username: user, password: pass }) })
            .then(x => x.text()
                .then(x => {
                    window.alert(x);
                    if (x === "Log in successful") { this.props.changePage("main"); this.props.userStatus(true, user); }
                }));
    }
    render() {
        return (<div className="App">
            <h1>Login</h1>
            <input ref={r => this.inputUser = r} type="text" placeholder="Username" required={true} size="50"></input>
            <div><input ref={r => this.inputPass = r} type="password" placeholder="Password" required={true} size="50"></input></div>
            <button onClick={this.validation} size="50">Submit</button>
            <button onClick={() => this.props.changePage("main")} size="50">Back</button>
        </div>);
    }
}

export default LogIn;