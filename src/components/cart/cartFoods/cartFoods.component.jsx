import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextOutput from '../../textOutput/textOutput.component';
import TextOutputTitle from '../../textOutputTitle/textOutputTitle.component';

const CartFoods = ({ foods, editMode, handleUpdate, handleDelete }) => {
    const navigate = useNavigate();

    const handleFoodClick = (foodId) => {
        navigate(`/food/${foodId}`);
    };

    return (
        <div id="cartFoodList">
            <h2>Foods</h2>
            {foods.length > 0 ? (
                foods.map((food) => (
                    <div key={food.id} className="food-container">
                        <div
                            onClick={() => handleFoodClick(food.id)}
                            className="food-link"
                            style={{ cursor: 'pointer' }}
                        >
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
                        </div>
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
