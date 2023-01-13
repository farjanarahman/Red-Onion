import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart,removeFromDatabaseCart} from '../../utilities/databaseManager';
import './CartItems.css';

const CartItems = (props) => {

    const { name, price, quantity, img, key } = props.currentFood;
    const [quantityCount, setQuantityCount] = useState(quantity);

    const handleAdd = clickedId => {
        const foods = fakeData;
        console.log(foods)
        // const currentFood = fakeData.find()

        const currentFood = foods.find(food => clickedId === food.key);
        const currentQuantity = quantityCount + 1
        setQuantityCount(currentQuantity);
        currentFood.quantity = currentQuantity;
        console.log(currentFood);
        addToDatabaseCart(clickedId, currentQuantity);
        getDatabaseCart();
        props.cartPlusChange();
    }

    const handleSub = clickedId => {
        if (quantityCount > 0) {
            const foods = fakeData;
            const currentQuantity = quantityCount - 1;
            setQuantityCount(currentQuantity);
            const currentFood = foods.find(food => clickedId === key);
            currentFood.quantity = currentQuantity;
            addToDatabaseCart(clickedId, currentQuantity);
            getDatabaseCart();
            props.cartSubChange();

            if(quantityCount === 0) {
                removeFromDatabaseCart(clickedId);
            }
        }
    }
    return (
        <div>
            {
                quantityCount > 0 && <div className="cartItemContainer">
                    <div className="food-image">
                        <img src={img} alt="" />
                    </div>

                    <div className="food-info">
                        <h5>{name}</h5>
                        <h3>$ {price * quantityCount}</h3>
                    </div>

                    <div className='cart'>
                        <button onClick={() => { handleSub(key) }} className='cart-btn'>-</button>
                        <h3>  {quantityCount}  </h3>
                        <button onClick={() => { handleAdd(key) }} className='cart-btn' style={{ color: '#f91944' }}>+</button>
                    </div>

                </div>
            }
        </div>
    );
};

export default CartItems;