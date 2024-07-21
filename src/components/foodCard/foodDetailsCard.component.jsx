import TextOutput from '../textOutput/textOutput.component';

const FoodDetails = ({ food }) => {
    return (
        <div>
            <h1 id="foodName">{food.name}</h1>
            <TextOutput
                iconClass="fas fa-fire"
                id="foodCalories"
                value={`Calories: ${food.calories}`}
            />
            <TextOutput
                iconClass="fas fa-dumbbell"
                id="foodProtein"
                value={`Proteins: ${food.protein}`}
            />
            <TextOutput
                iconClass="fas fa-bacon"
                id="foodFats"
                value={`Fats: ${food.fat}`}
            />
            <TextOutput
                iconClass="fas fa-bread-slice"
                id="foodCarbs"
                value={`Carbs: ${food.carbohydrates}`}
            />
            <TextOutput
                iconClass="fas fa-tags"
                id="foodCategory"
                value={`Category: ${food.categoryName}`}
            />
        </div>
    );
};

export default FoodDetails;
