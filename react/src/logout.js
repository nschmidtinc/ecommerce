import './App.css';

class LogOut {
    loggedOut = () => {
        window.alert("You have logged out");
        this.props.userInfo(false, "guest");
    }
    render() {
        return (this.loggedOut);
    }
}
export default LogOut;