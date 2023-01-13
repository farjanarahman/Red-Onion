import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import { useState } from 'react';
import { useEffect } from 'react';
import FoodItems from '../FoodItems/FoodItems';


const Shop = () => {

    const meals = fakeData;
    const [foods, setFoods] = useState([]);
    const [category, setCategory] = useState("lunch");

    useEffect(() => {
        setFoods(meals);
    }, [meals]);

    const currentFood = foods.filter(food => food.category === category);



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="manageCategory me-5 pe-3">
                        <ul className="d-flex justify-content-center">
                            <li onClick={() => setCategory('breakfast')}>
                                <a href="#foodDetails"  className={category === 'breakfast' ? 'active h6' : 'h6'}> Breakfast</a>
                            </li>
                            <li onClick={() => setCategory('lunch')}>
                                <a href="#foodDetails" className={category === 'lunch' ? 'active h6' : 'h6'}> Lunch</a>
                            </li>
                            <li onClick={() => setCategory('dinner')}>
                                <a href="#foodDetails" className={category === 'dinner' ? 'active h6' : 'h6'}>Dinner</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row  ">
                {
                    currentFood.map(food => <FoodItems product={food} key={food.key}></FoodItems>)
                }

                {/* <button className="checkoutBtn btn-danger">Checkout Your Food</button> */}
            </div>


        </div>
    );
};

export default Shop;