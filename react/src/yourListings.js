import React, { Component } from 'react';
import './App.css';

var list = {
    "name1": {
        "item1": {
            "element1": "1",
            "element2": "2"
        },
        "item2": {
            "element3": "3",
            "element4": "4",
            "element5": "5"
        }
    },
    "name2": {
        "item1": {
            "element1": "1",
            "element2": "2",
            "element3": "3",
            "element4": "4"
        },
        "item2": {
            "element5": "5",
            "element6": "6",
            "element7": "7"
        },
        "item3": {
            "element8": "8",
            "element9": "9",
            "element10": "10"
        }
    }
}

class YourItems extends Component {
    componentDidMount = () => {
        fetch('/listthing', { method: "POST", body: JSON.stringify({ user: this.props.userInfo }) }).then(x => x.text());
    }
    render() {
        return (<div className="ItemDisplay">
            <div className="SubItemDisplay"><img src="https://i.imgur.com/kjgSsc0.gif" alt="Run Coward" height="200" width="200"/></div>
            <div className="SubItemDisplay">
                <p><strong><ins>Username</ins> : </strong>{this.props.username}</p>
                <p><strong><ins>Price</ins> : </strong>10000000000000000000000.00$</p>
                <p><strong><ins>Description</ins> : </strong><ins>IT WILL DESTROY US ALL! RUN!!!</ins></p>
                <button>Details</button><button>Remove It</button>
            </div>
        </div>);
    }
}

export default YourItems;