const FoodCard = ({ name, calories }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Calories: {calories}</p>
        </div>
    );
};

export default FoodCard;