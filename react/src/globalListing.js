import React, { Component } from 'react';
import './App.css';

var list = {
    1: {
        "username": "MEME",
        "price": "100",
        "description": "DO"
    },
    2: {
        "username": "MEME",
        "price": "200",
        "description": "YA"
    },
    3: {
        "username": "MEME",
        "price": "300",
        "description": "KNOW"
    },
    4: {
        "username": "MEME",
        "price": "400",
        "description": "DAE"
    },
    5: {
        "username": "MEME",
        "price": "500",
        "description": "WAY"
    },
    6: {
        "username": "Jacques",
        "price": "6",
        "description": "He's"
    },
    7: {
        "username": "Jacques",
        "price": "7",
        "description": "a"
    },
    8: {
        "username": "Jacques",
        "price": "8",
        "description": "lighthouse"
    },
    9: {
        "username": "Jacques",
        "price": "9",
        "description": "of"
    },
    10: {
        "username": "Jacques",
        "price": "10",
        "description": "knowledge"
    },
    0: {
        "username": "DA WAE",
        "price": "100000000000000000000000",
        "description": "Find the Surprise"
    }
}

class GlobalListings extends Component {
    componentDidMount = () => {
        //fetch('/globalListings', { method: "POST" }).then(x => x.text()).then(x => console.log(x));
    }
    render() {
        var x = list[Math.round(Math.random() * 10)]
        return (<div className="ItemDisplay">
            <button className="ItemDisplayButton">BUY NOW!</button>
            <div>
                <div className="SubItemDisplay"><img src="kirby.png" alt="Run Coward" height="75" width="75" /></div>
                <div><small>
                    <p><strong><ins>Seller</ins> : </strong>{x.username}</p>
                    <p><strong><ins>Item</ins> : </strong>GIVE ME A NAME</p>
                    <p><strong><ins>Price</ins> : </strong>${x.price}.00</p>
                </small></div>
                <div><small>
                    <p><strong><ins>Description</ins> : </strong>{x.description}</p></small>
                </div>
            </div>
        </div>);
    }
}

export default GlobalListings;