import React, { Component } from 'react';
import './App.css';

class LogIn extends Component {
    validation = () => {
        var user = this.inputUser.value;
        var pass = this.inputPass.value;
        this.inputUser.value = null; this.inputPass.value = null;
        fetch("/login", { method: "POST", body: JSON.stringify({ username: user, password: pass }) })
            .then(x => x.text())
            .then(x => {
                window.alert(x);
                if (x === "Log in successful") { this.props.changePage("main"); this.props.userStatus(true, user); this.props.updateList(); }
            });
    }
    render() {
        console.log("login");
        return (<div className="AppMain">
            <h1>Login</h1>
            <input className="UserLogInput" ref={r => this.inputUser = r} type="text" placeholder="Username" required={true} />
            <div><input className="UserLogInput" ref={r => this.inputPass = r} type="password" placeholder="Password" required={true} /></div>
            <button className="UserLogButton" onClick={this.validation}>Submit</button>
            <button className="UserLogButton" onClick={() => this.props.changePage("main")}>Back</button>
        </div>);
    }
}

export default LogIn;