import React from 'react';
import happyImage from './../../Image/giphy.gif';
import './OrderPlaced.css'

const OrderPlaced = () => {
    return (
        <div>
            <img src={happyImage} alt=""/>
            <h5 className="greetings">Your Order have been placed thank you !!!</h5>
        </div>
    );
};

export default OrderPlaced;