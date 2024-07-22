import TextOutput from "../textOutput/textOutput.component";
import TextOutputTitle from "../textOutputTitle/textOutputTitle.component";
const FoodCard = ({ name, calories }) => {
    return (
        <div>
            <TextOutputTitle id="foodCardTitle" value={name}/>
            <TextOutput
                iconClass="fas fa-fire"
                id="foodCalories"
                value={`Calories: ${calories}`}
            />
        </div>
    );
};

export default FoodCard;