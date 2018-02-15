import React, { Component } from 'react';
import './App.css';

var list = {
    1: {
        "username": "MEME",
        "name": "Meme 1",
        "price": "100",
        "description": "DO"
    },
    2: {
        "username": "MEME",
        "name": "Meme 2",
        "price": "200",
        "description": "YA"
    },
    3: {
        "username": "MEME",
        "name": "Meme 3",
        "price": "300",
        "description": "KNOW"
    },
    4: {
        "username": "MEME",
        "name": "Meme 4",
        "price": "400",
        "description": "DAE"
    },
    5: {
        "username": "MEME",
        "name": "Meme 5",
        "price": "500",
        "description": "WAY"
    },
    6: {
        "username": "Jacques",
        "name": "Meme 6",
        "price": "6",
        "description": "He's"
    },
    7: {
        "username": "Jacques",
        "name": "Meme 7",
        "price": "7",
        "description": "a"
    },
    8: {
        "username": "Jacques",
        "name": "Meme 8",
        "price": "8",
        "description": "lighthouse"
    },
    9: {
        "username": "Jacques",
        "name": "Meme 9",
        "price": "9",
        "description": "of"
    },
    10: {
        "username": "Jacques",
        "name": "Meme 10",
        "price": "10",
        "description": "knowledge"
    },
    0: {
        "username": "DA WAE",
        "name": "Meme 0",
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
                    <p><strong><ins>Item</ins> : </strong>{x.name}</p>
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