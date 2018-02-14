import React, { Component } from 'react';
import './App.css';

class SignUp extends Component {
    validation = () => {
        var user = this.inputUser.value;
        var pass = this.inputPass.value;
        var passConf = this.inputPassConfirm.value;
        this.inputUser.value = null; this.inputPass.value = null; this.inputPassConfirm.value = null;
        fetch("/signup", { method: "POST", body: JSON.stringify({ username: user, password: pass, passwordConfirm: passConf }) })
            .then(x => x.text())
                .then(x => {
                    window.alert(x);
                    if (x === "Signup successful") { this.props.changePage("main"); this.props.userStatus(true, user); }
                });
    }
    render() {
        return (<div className="AppMain">
            <h1>Register</h1>
            <input ref={r => this.inputUser = r} type="text" placeholder="Username" required={true} size="50" />
            <div><input ref={r => this.inputPass = r} type="password" placeholder="Password" required={true} size="50" /></div>
            <div><input ref={r => this.inputPassConfirm = r} type="password" placeholder="Password Confirmation" required={true} size="50" /></div>
            <button onClick={this.validation} size="25">Submit</button>
            <button onClick={() => this.props.changePage("main")} size="25">Back</button>
        </div>);
    }
}

export default SignUp;