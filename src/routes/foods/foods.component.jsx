import React, { useEffect, useState, useContext } from 'react';
import FoodList from '../../components/foodList/foodList.component';
import { ApiContext } from '../../contexts/api.context';

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const { fetchFoods } = useContext(ApiContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foodsData = await fetchFoods();
                setFoods(foodsData);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };
        fetchData();

    }, [fetchFoods]);

    return (
        <div>
            <h1>Food List</h1>
            <FoodList foods={foods} />
        </div>
    );
};

export default Foods;
