import React from 'react';
import TextOutput from '../textOutput/textOutput.component';
import TextOutputTitle from '../textOutputTitle/textOutputTitle.component';

const CartFoods = ({ foods, editMode, handleUpdate, handleDelete }) => {
    return (
        <div id="cartFoodList">
            <h2>Foods</h2>
            {foods.length > 0 ? (
                foods.map((food) => (
                    <div key={food.id} className="food-container">
                        <a href={`/food/${food.id}`} className="food-link">
                            <div className="food-item">
                                <TextOutputTitle id="title" value={food.name} />
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
                        {editMode && (
                            <div className="edit-buttons">
                                <button onClick={() => handleUpdate(food)}>
                                    Modify
                                </button>
                                <button onClick={() => handleDelete(food.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default CartFoods;
