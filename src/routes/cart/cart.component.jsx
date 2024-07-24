import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../contexts/api.context';
import CartFoods from '../../components/cartFoods/cartFoods.component';
import CartActivities from '../../components/cartActivities/cartActivities.component';
import CartTotals from '../../components/cartTotals/cartTotals.component';
import UpdateCartModal from '../../components/updateCartModal/updateCartModal.component';

const Cart = () => {
    const { fetchCartFoods, fetchDailyActivities, deleteFoodFromCart, modifyCartFood, deleteActivityFromCart, modifyCartActivity } = useContext(ApiContext);
    const [foods, setFoods] = useState([]);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);

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

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleDeleteFood = async (foodId) => {
        try {
            await deleteFoodFromCart(foodId);
            const updatedFoods = await fetchCartFoods();
            setFoods(updatedFoods);
        } catch (error) {
            console.error('Error during deleting food from cart', error);
        }
    };

    const handleUpdateFood = (food) => {
        setCurrentFood(food);
        setIsFoodModalOpen(true);
    };

    const handleUpdateFoodSubmit = async (updatedData) => {
        try {
            const patch = { amount: updatedData.amount };
            await modifyCartFood(currentFood.id, patch);
            const updatedFoods = await fetchCartFoods();
            setFoods(updatedFoods);
            setIsFoodModalOpen(false);
        } catch (error) {
            console.error('Error during updating food in cart', error);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            await deleteActivityFromCart(activityId);
            const updatedActivities = await fetchDailyActivities();
            setActivities(updatedActivities);
        } catch (error) {
            console.error('Error during deleting activity from cart', error);
        }
    };

    const handleUpdateActivity = (activity) => {
        setCurrentActivity(activity);
        setIsActivityModalOpen(true);
    };

    const handleUpdateActivitySubmit = async (updatedData) => {
        try {
            const patch = { time: updatedData.time };
            await modifyCartActivity(currentActivity.id, patch);
            const updatedActivities = await fetchDailyActivities();
            setActivities(updatedActivities);
            setIsActivityModalOpen(false);
        } catch (error) {
            console.error('Error during updating activity in cart', error);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <CartTotals foods={foods} activities={activities} />
            <button onClick={toggleEditMode}>
                {editMode ? 'Exit Edit Mode' : 'Edit Mode'}
            </button>
            <CartFoods
                foods={foods}
                editMode={editMode}
                handleUpdate={handleUpdateFood}
                handleDelete={handleDeleteFood}
            />
            <CartActivities
                activities={activities}
                editMode={editMode}
                handleUpdate={handleUpdateActivity}
                handleDelete={handleDeleteActivity}
            />
            {isFoodModalOpen && (
                <UpdateCartModal
                    show={isFoodModalOpen}
                    handleClose={() => setIsFoodModalOpen(false)}
                    handleSubmit={handleUpdateFoodSubmit}
                    initialData={currentFood}
                    iconClass="fas fa-weight"
                    placeholder="Amount"
                    fieldName="amount"
                />
            )}
            {isActivityModalOpen && (
                <UpdateCartModal
                    show={isActivityModalOpen}
                    handleClose={() => setIsActivityModalOpen(false)}
                    handleSubmit={handleUpdateActivitySubmit}
                    initialData={currentActivity}
                    iconClass="fas fa-clock"
                    placeholder="Time"
                    fieldName="time"
                />
            )}
        </div>
    );
};

export default Cart;
