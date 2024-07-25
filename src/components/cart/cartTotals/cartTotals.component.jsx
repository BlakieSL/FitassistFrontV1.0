import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/user.context';
import TextOutput from "../../textOutput/textOutput.component";
import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
const CartTotals = ({ foods, activities }) => {
    const { currentUser } = useContext(UserContext);

    const calculateTotals = () => {
        let totalCalories = 0;
        let totalProteins = 0;
        let totalFats = 0;
        let totalCarbs = 0;
        let totalCaloriesBurned = 0;

        foods.forEach(food => {
            totalCalories += food.calories;
            totalProteins += food.protein;
            totalFats += food.fat;
            totalCarbs += food.carbohydrates;
        });

        activities.forEach(activity => {
            totalCaloriesBurned += activity.caloriesBurned;
        });

        return { totalCalories, totalProteins, totalFats, totalCarbs, totalCaloriesBurned };
    };

    const { totalCalories, totalProteins, totalFats, totalCarbs, totalCaloriesBurned } = calculateTotals();

    return (
        <div>
            <h2>Totals</h2>
            <TextOutput
                iconClass="fas fa-fire"
                id="totalCalories"
                value={`Total Calories: ${totalCalories}/${currentUser?.calculatedCalories}`}
            />
            <TextOutput
                iconClass="fas fa-dumbbell"
                id="totalProteins"
                value={`Total Proteins: ${totalProteins}`}
            />
            <TextOutput
                iconClass="fas fa-bacon"
                id="totalFats"
                value={`Total Fats: ${totalFats}`}
            />
            <TextOutput
                iconClass="fas fa-bread-slice"
                id="totalCarbs"
                value={`Total Carbs: ${totalCarbs}`}
            />
            <TextOutput
                iconClass="fas fa-bolt"
                id="totalCaloriesBurned"
                value={`Total Calories Burned: ${totalCaloriesBurned}`}
            />
        </div>
    );
};

export default CartTotals;
