import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../contexts/api.context';
import CartFoods from '../../components/cartFoods/cartFoods.component';
import CartActivities from '../../components/cartActivities/cartActivities.component';
import CartTotals from '../../components/cartTotals/cartTotals.component';

const Cart = () => {
    const { fetchCartFoods, fetchDailyActivities } = useContext(ApiContext);
    const [foods, setFoods] = useState([]);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const [foodsData, activitiesData] = await Promise.all([
                    fetchCartFoods(),
                    fetchDailyActivities(),
                ]);

                setFoods(foodsData);
                setActivities(activitiesData);
            } catch (error) {
                setError('Failed to fetch cart details.');
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCart();
    }, [fetchCartFoods, fetchDailyActivities]);

    return (
        <div>
            {error && <p>{error}</p>}
            <CartTotals foods={foods} activities={activities} />
            <CartFoods foods={foods} />
            <CartActivities activities={activities} />
        </div>
    );
};

export default Cart;
