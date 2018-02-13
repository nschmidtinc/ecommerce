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

class ListedItem extends Component {
    componentDidMount = () => {
        fetch('/listthing', { method: "POST", body: JSON.stringify({ user: this.props.username }) }).then(x => x.text());
    }
    render() {
        return (<div className="App">
            <p><strong><ins>Username</ins> : </strong>{this.props.userInfo}</p>
            <p><strong><ins>Price</ins> : </strong>{this.props.itemPrice}.00$</p>
            <p><strong><ins>Description</ins> : </strong><ins>{this.props.itemDesc}</ins></p>
            <div>
                <button className="ListItemButton" onClick={this.validation}>Display It For Sale</button>
                <button className="ListItemButton" onClick={() => this.props.changePage("account")} size="50">Back</button>
            </div>
        </div>);
    }
}

export default ListedItem;