import React, { useContext, useState, useEffect } from 'react';
import TextOutput from '../../textOutput/textOutput.component';
import TextInput from '../../textInput/textInput.component';
import { ApiContext }  from "../../../contexts/api.context";
import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";

const FoodDetails = ({ food }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [updatedFood, setUpdatedFood] = useState(food);
    const { calculateMacros, addToCart, addFoodToUser } = useContext(ApiContext);


    useEffect(() => {
        setUpdatedFood(food);
    }, [food]);

    const handleCalculateMacros = async () => {
        if (!amount) {
            setError('Please enter the amount in grams.');
            return;
        }
        setError('');

        try{
            const updatedFoodData = await calculateMacros(food.id, amount);
            setUpdatedFood(updatedFoodData);
        } catch (error){
            console.log('Error occurred during calculating macros', error);
        }
    };

    const handleAddToCart = async () => {
        if (!amount) {
            setError('Please enter the amount in grams.');
            return;
        }
        setError('');

        try{
            await addToCart(food.id, amount);
        } catch (error){
            console.error('Error occurred during adding to carr:', error);
        }
    };

    const handleAddExercise = async () => {
        try{
            await addFoodToUser(food.id);
        } catch (error){
            console.error('Error occurred during saving food:',error);
        }
    }

    return (
        <div>
            <TextOutputTitle id="foodName" value={food.name} />
            <TextOutput
                iconClass="fas fa-fire"
                id="foodCalories"
                value={`Calories: ${updatedFood.calories}`}
            />
            <TextOutput
                iconClass="fas fa-dumbbell"
                id="foodProtein"
                value={`Proteins: ${updatedFood.protein}`}
            />
            <TextOutput
                iconClass="fas fa-bacon"
                id="foodFats"
                value={`Fats: ${updatedFood.fat}`}
            />
            <TextOutput
                iconClass="fas fa-bread-slice"
                id="foodCarbs"
                value={`Carbs: ${updatedFood.carbohydrates}`}
            />
            <TextOutput
                iconClass="fas fa-tags"
                id="foodCategory"
                value={`Category: ${updatedFood.categoryName}`}
            />
            <div id="foodDetailsButtons" className="foodDetailsButtons">
                <TextInput
                    iconClass="fas fa-weight"
                    type="number"
                    id="amountGrams"
                    name="amountGrams"
                    placeholder="Enter grams"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button id="calculateMacros" onClick={handleCalculateMacros}>Calculate</button>
                <button id="addToCart" onClick={handleAddToCart}>Add</button>
                <button id="addToSaved" onClick={handleAddExercise}>Save</button>
                <p id="buttonsError">{error}</p>
            </div>
        </div>
    );
};

export default FoodDetails;
