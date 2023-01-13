import React from 'react';
import './FoodItems.css'
import { Link } from 'react-router-dom';

const FoodItems = (props) => {
    console.log(props.product)
    const { img, title, description, price,key } = props.product;
    return (

           <div className="foodDetails" id="foodDetails">
                <div className="foodImage">
                    <img src={img} alt=""/>
                </div>
                <div className="foodInfo">
                    <h6><Link to={'/product/'+key}>{title}</Link></h6>
                    <p>{description}</p>
                    <h4>${price}</h4>
                </div>
           </div>
        
    );
};

export default FoodItems;