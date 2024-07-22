import React from 'react';
import TextOutput from "../textOutput/textOutput.component";
import TextOutputTitle from "../textOutputTitle/textOutputTitle.component";
const CartFoods = ({ foods }) => {
    return (
        <div id="cartFoodList">
            <h2>Foods</h2>
            {foods.length > 0 ? (
                foods.map(food => (
                    <a href={`/food/${food.id}`} className="food-link" key={food.id}>
                        <div className="food-item">
                            <TextOutputTitle id="title" value={food.name}/>
                            <TextOutput
                                iconClass="fas fa-fire"
                                id="foodCalories"
                                value={`Calories: ${food.calories}`}
                            />
                            <TextOutput
                                iconClass="fas fa-weight"
                                id="foodAmount"
                                value={`Amount: ${food.amount}`}
                            />
                        </div>
                    </a>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default CartFoods;
