import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData'
import { getDatabaseCart } from '../../utilities/databaseManager';
import { useAuth } from '../Authentication/useAuth';
import CartItems from '../CartItems/CartItems';
import OrderForm from '../OrderForm/OrderForm';
import './Cart.css';

const Cart = () => {

    const auth = useAuth();

    const [cartFoods,setCartFoods] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null)
    const [cartPlusChange, setCartPlusChange] = useState(false);
	const [cartSubChange, setCartSubChange] = useState(false);

    
	const cartPlusChanges = () => {
		setCartPlusChange(!cartPlusChange);
	};

	const cartSubChanges = () => {
		setCartSubChange(!cartSubChange);
	};


    let previousCart = [];

    let subTotal = 0;

    const calculateSubTotal = () => {
        cartFoods.map( food => subTotal = subTotal + (food.quantity * food.price));
        return subTotal.toFixed(2);
    }

    let tax = 0 ;
    
    const calculateTax = () => {
        tax = subTotal * 0.15;

        return tax.toFixed(2);
    }

    let fee = 0;

    const deliveryFee = () => {
        if(subTotal < 10 && subTotal > 0) {fee = 0}
        else if(subTotal < 50 && subTotal > 10) {fee = 5}
        else if(subTotal < 100 && subTotal > 50) {fee = 10}
        else if(subTotal < 500 && subTotal > 100) {fee = 15}
        else fee = 0
        return fee;
    }

    
      useEffect( () => {
        previousCart = getDatabaseCart();
        console.log(previousCart);
        const foodKeys = Object.keys(previousCart);

        console.log(foodKeys);

        const foods = foodKeys.map( key => {
            const food = fakeData.find ( singleFood => singleFood.key === key  );
            food.quantity = previousCart[key];
        
           console.log(food);

           return(food);
        });

        calculateSubTotal();
        calculateTax();
        deliveryFee();

        setCartFoods(foods);
       
    },[previousCart.length,cartPlusChange, cartSubChange])


    const getCustomerInfo = data => {
        setCustomerInfo(data)
    }

    const orderConfirmation = (cart, customerInfo) => {
        if(cart && customerInfo){
           const orderData = { ...customerInfo, cart}
            fetch(`http://localhost:5000/placeOrder`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
            .then(res => {
                if(res.ok){
                    alert('Your order placed successfully! you will get your order shortly...')
                }
            } )
        }
        else{
            alert("Please provide your delivery information to process order")
        }
    }
    console.log(cartFoods);
    console.log(customerInfo)
    // console.log(subTotal);
    // console.log(tax);
    
    return (
        <div className="container main-cart">
               <div className="delivery-information">
                   <OrderForm getCustomerInfo={getCustomerInfo}/>
                </div>
                <div>

                </div>
                {
                    cartFoods.length > 0 ? <div className="review-cart">
                    <p>From <b>Gulshan Plaza</b></p>
                    <p>Arriving in 30-40 minutes</p>
                    <p>107 road no 8</p>

                    {cartFoods.map((currentFood) => (
                        <CartItems
                            cartPlusChange={cartPlusChanges}
                            cartSubChange={cartSubChanges}
                            key={currentFood.id}
                            currentFood={currentFood}
                        ></CartItems>
				    ))}

                    <div className="summary">
                    <div className="section-name">
                        <h4>Subtotal: </h4>
                        <h4>tax: </h4>
                        <h4>Delivery Fee: </h4>
                        <h4>Total: </h4>
                    </div>
                    <div className="amount">
                        <h4>{calculateSubTotal()}</h4>
                        <h4>{calculateTax()}</h4>
                        <h4>{deliveryFee()}</h4>
                        <h4>{(subTotal+tax+fee).toFixed(2)}</h4>
                    </div>
                </div>
                {auth.user ?  <button className="btn btn-danger marginTop10px" onClick={() => orderConfirmation(cartFoods, customerInfo)} > Confirm Order </button> : <a href="login" className="btn btn-danger marginTop10px" type="button">Login To Proceed</a>}
                </div> : <div>
                    <h2 className='my-5'>Shopping Cart is empty</h2>
                </div>
                }
               
        </div>
    );
};

export default Cart;
