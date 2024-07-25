import FoodCard from '../../cards/foodCard/foodCard.component';
import {useNavigate} from "react-router-dom";

const FoodList = ({ foods }) => {
    const navigate = useNavigate();

    const handleFoodClick = (foodId) => {
        navigate(`/food/${foodId}`);
    }

    return (
        <div>
            {foods.length > 0 ? (
                foods.map(food => (
                    <div
                        key={food.id}
                        className="food-link"
                        onClick={() => handleFoodClick(food.id)}
                        style={{ cursor: 'pointer'}}
                    >
                        <FoodCard name={food.name} calories={food.calories} />
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default FoodList;
