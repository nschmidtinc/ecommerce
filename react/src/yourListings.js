import React, { Component } from 'react';
import './App.css';

var list = {
    1: {
        "price": "100",
        "description": "DO"
    },
    2: {
        "price": "200",
        "description": "YA"
    },
    3: {
        "price": "300",
        "description": "KNOW"
    },
    4: {
        "price": "400",
        "description": "DAE"
    },
    0: {
        "price": "500",
        "description": "WAY"
    }
}

class YourItems extends Component {
    componentDidMount = () => {
        //fetch('/userListings', { method: "POST", body: JSON.stringify({ user: this.props.username }) }).then(x => x.text()).then(x => console.log(x));
    }
    render() {
        var x = list[Math.round(Math.random() * 4)]
        return (<div className="UserItemDisplay">
            <div className="SubItemDisplay"><img src="metaknight.png" alt="Run Coward" height="100" width="100" /></div>
            <button>Details</button><button>Remove It</button>
            <div><small>
                <p><strong><ins>Seller</ins> : </strong>{this.props.username}</p>
                <p><strong><ins>Item</ins> : </strong>GIVE ME A FANCY NAME</p>
                <p><strong><ins>Price</ins> : </strong>{x.price}.00$</p>
            </small></div>
            <div><small>
                <p><strong><ins>Description</ins> : </strong>{x.description}</p></small>
            </div>
        </div>);
    }
}

export default YourItems;