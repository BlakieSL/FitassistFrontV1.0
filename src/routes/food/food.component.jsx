import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import FoodDetails from '../../components/foodCard/foodDetailsCard.component';
import { ApiContext } from '../../contexts/api.context';

const Food = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const { fetchFoodById } = useContext(ApiContext);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const foodData = await fetchFoodById(id);
                setFood(foodData);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };
        fetchFood();
    }, [id, fetchFoodById]);

    if (!food) {
        return <p>Loading...</p>;
    }

    return <FoodDetails food={food} />;
};

export default Food;
