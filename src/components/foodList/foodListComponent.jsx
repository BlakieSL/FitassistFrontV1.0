import FoodCard from '../foodCard/foodCard.component';

const FoodList = ({ foods }) => {
    return (
        <div>
            {foods.length > 0 ? (
                foods.map(food => (
                    <a href={`/food/${food.id}`} className="food-link" key={food.id}>
                        <FoodCard name={food.name} calories={food.calories} />
                    </a>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default FoodList;
