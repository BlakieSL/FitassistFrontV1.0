import React, { useEffect, useState, useContext } from 'react';
import FoodList from '../../components/foodList/foodListComponent';
import { UserContext } from '../../contexts/user.context';
import axios from 'axios';

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const { verifyToken, verifyResponse } = useContext(UserContext);

    useEffect(() => {
        const fetchFoods = () => {
            const token = verifyToken();

            axios.get('http://localhost:8000/api/foods', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                verifyResponse(response);
                setFoods(response.data);
            })
            .catch(error => {
                console.error('Error fetching foods:', error);
            });
        };

        fetchFoods();

    }, [verifyToken, verifyResponse]);

    return (
        <div>
            <h1>Food List</h1>
            <FoodList foods={foods} />
        </div>
    );
};

export default Foods;
