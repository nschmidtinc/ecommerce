import React, { Component } from 'react';
import './App.css';

class OtherListing extends Component {
    render() {
        return (<div className="ItemDisplay">
            <div className="SubItemDisplay"><img src="https://i.imgur.com/kjgSsc0.gif" alt="Run Coward" height="75" width="75" /></div>
            <div><small>
                <p><strong><ins>Seller</ins> : </strong>SINISTAR</p>
                <p><strong><ins>Item</ins> : </strong>{this.props.userInfo}</p>
                <p><strong><ins>Price</ins> : </strong>1000000000000.00$</p>
            </small></div>
            <div><small>
                <p><strong><ins>Description</ins> : </strong>IT WILL DESTROY US ALL! RUN!!!hdbddddddd ddddddddddddddddddddddddddddddh hdbhdbd dhbdhbd hdbhdbd hdbhdbdh hbdhdb</p></small>
            </div>
            <button>BUY NOW!</button>
        </div>);
    }
}

export default OtherListing;