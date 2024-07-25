import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './user.context';

export const ApiContext = createContext({
    fetchFoods: () => null,
    calculateMacros: () => null,
    addToCart: () => null,
    register: () => null,
    login: () => null,
    fetchFoodById: () => null,
    fetchActivities: () => null,
    fetchActivityById: () => null,
    calculateCaloriesBurned: () => null,
    addToDailyActivities: () => null,
    fetchCartFoods: () => null,
    fetchDailyActivities: () => null,
    updateUser: () => null,
    deleteUser: () => null,
    fetchCategories: () => null,
    fetchActivitiesByCategory: () => null,
    searchAll: () => null,
    deleteFoodFromCart: () => null,
    deleteActivityFromCart: () => null,
    modifyCartFood: () => null,
    modifyCartActivity: () => null,
    addFood: () => null,
    addActivity: () => null,
    addExercise: () => null,
    addPlan: () => null,
    addRecipe: () => null,
    fetchExercises: () => null,
    fetchRecipes: () => null,
    fetchPlans: () => null,
    fetchExerciseById: () => null,
    fetchRecipeById: () => null,
    fetchPlanById: () => null,
});

export const ApiProvider = ({ children }) => {
    const { verifyResponse, fetchCurrentUser, logout, currentUser } = useContext(UserContext);

    const register = async (userData) => {
        const response = await axios.post(
            'http://localhost:8000/api/users/register',
            userData
        );
        verifyResponse(response);
        window.location.href = '/login';
    };

    const login = async (credentials) => {
        const response = await axios.post(
            'http://localhost:8000/api/users/login',
            credentials
        );
        const data = response.data;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        await fetchCurrentUser();
        window.location.href = '/foods';
    };

    const fetchFoods = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/foods'
        );
        verifyResponse(response);
        return response.data;
    };

    const fetchFoodById = async (foodId) => {
        const response = await axios.get(
            `http://localhost:8000/api/foods/${foodId}`
        );
        verifyResponse(response);
        return response.data;
    };

    const calculateMacros = async (foodId, amount) => {
        const response = await axios.post(
            `http://localhost:8000/api/foods/${foodId}/calculate-macros`,
            { amount: parseInt(amount) }
        );
        verifyResponse(response);
        return response.data;
    };

    const addToCart = async (foodId, amount) => {
        const response = await axios.post(
            `http://localhost:8000/api/cart/${currentUser.id}/add`,
            { id: foodId, amount: parseInt(amount) }
        );
        verifyResponse(response);
        alert('Food added successfully');
    };

    const fetchActivities = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/activities'
        );
        verifyResponse(response);
        return response.data;
    };

    const fetchActivityById = async (activityId) => {
        const response = await axios.get(
            `http://localhost:8000/api/activities/${activityId}`
        );
        verifyResponse(response);
        return response.data;
    };

    const calculateCaloriesBurned = async (activityId, time) => {
        const response = await axios.post(
            `http://localhost:8000/api/activities/${activityId}/calculate-calories`,
            { userId: currentUser.id, time: parseInt(time) }
        );
        verifyResponse(response);
        return response.data;
    };

    const addToDailyActivities = async (activityId, time) => {
        const response = await axios.post(
            `http://localhost:8000/api/daily-activities/${currentUser.id}/add`,
            { id: activityId, time: parseInt(time) }
        );
        verifyResponse(response);
        alert('Activity added successfully');
    };

    const fetchCartFoods = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/cart/${currentUser.id}`
        );
        verifyResponse(response);
        return response.data;
    };

    const fetchDailyActivities = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/daily-activities/${currentUser.id}`
        );
        verifyResponse(response);
        return response.data;
    };

    const updateUser = async (userData) => {
        const response = await axios.patch(
            `http://localhost:8000/api/users/${currentUser.id}`,
            userData
        );
        verifyResponse(response);
        return response.data;
    };

    const deleteUser = async () => {
        const response = await axios.delete(
            `http://localhost:8000/api/users/${currentUser.id}`
        );
        verifyResponse(response);
        alert('User deleted successfully');
        logout();
    };

    const fetchCategories = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/activity-categories'
        );
        verifyResponse(response);
        return response.data;
    };

    const fetchActivitiesByCategory = async (categoryId) => {
        const response = await axios.get(
            `http://localhost:8000/api/activity-categories/${categoryId}/activities`
        );
        verifyResponse(response);
        return response.data;
    };

    const searchAll = async (query, type) => {
        const urlMap = {
            foods: 'http://localhost:8000/api/foods/search',
            activities: 'http://localhost:8000/api/activities/search',
            exercises: 'http://localhost:8000/api/exercises/search'
        };

        if (!urlMap[type]) {
            throw new Error('Invalid search type');
        }

        try {
            const response = await axios.post(
                urlMap[type],
                { name: query }
            );
            verifyResponse(response);
            return response.data;
        } catch (error) {
            console.error(`Error searching ${type}`, error);
            throw error;
        }
    };

    const deleteFoodFromCart = async (foodId) => {
        const response = await axios.delete(
            `http://localhost:8000/api/cart/${currentUser.id}/remove/${foodId}`
        );
        verifyResponse(response);
        alert("food was successfully removed from cart");
    };

    const deleteActivityFromCart = async (activityId) => {
        const response = await axios.delete(
            `http://localhost:8000/api/daily-activities/${currentUser.id}/remove/${activityId}`
        );
        verifyResponse(response);
        alert("activity was successfully removed from cart");
    };

    const modifyCartFood = async (foodId, patch) => {
        const response = await axios.patch(
            `http://localhost:8000/api/cart/${currentUser.id}/modify-food/${foodId}`,
            patch
        );
        verifyResponse(response);
    };

    const modifyCartActivity = async (activityId, patch) => {
        const response = await axios.patch(
            `http://localhost:8000/api/daily-activities/${currentUser.id}/modify-activity/${activityId}`,
            patch
        );
        verifyResponse(response);
    };

    const addFood = async (foodData) => {
        const response = await axios.post(
            'http://localhost:8000/api/foods',
            foodData
        );
        verifyResponse(response);
        alert('food added successfully');
    };

    const addActivity = async (activityData) => {
        const response = await axios.post(
            'http://localhost:8000/api/activities',
            activityData
        );
        verifyResponse(response);
        alert('activity added successfully');
    };

    const addExercise = async (exerciseData) => {
        const response = await axios.post(
            'http://localhost:8000/api/exercises',
            exerciseData
        );
        verifyResponse(response);
        alert('exercise added successfully');
    }

    const addPlan = async (planData) => {
        const response = await axios.post(
            'http://localhost:8000/api/plans',
            planData
        );
        verifyResponse(response);
        alert('plan added successfully');
    }

    const addRecipe = async (recipeData) => {
        const response = await axios.post(
            'http://localhost:8000/api/recipes',
            recipeData
        );
        verifyResponse(response);
        alert('recipe added successfully')
    }

    const fetchExercises = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/exercises'
        );
        verifyResponse(response);
        return response.data;
    }

    const fetchRecipes = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/recipes'
        );
        verifyResponse(response);
        return response.data;
    }

    const fetchPlans = async () => {
        const response = await axios.get(
            'http://localhost:8000/api/plans'
        );
        verifyResponse(response);
        return response.data;
    }

    const fetchExerciseById = async (exerciseId) => {
        const response = await axios.get(
            `http://localhost:8000/api/exercises/${exerciseId}`
        );
        verifyResponse(response);
        return response.data;
    }

    const fetchRecipeById = async (recipeId) => {
        const response = await axios.get(
            `http://localhost:8000/api/recipes/${recipeId}`
        );
        verifyResponse(response);
        return response.data;
    }

    const fetchPlanById = async (planId) => {
        const response = await axios.get(
            `http://localhost:8000/api/plans/${planId}`
        );
        verifyResponse(response);
        return response.data;
    }

    const value = {
        fetchFoods,
        calculateMacros,
        addToCart,
        register,
        login,
        fetchFoodById,
        fetchActivities,
        fetchActivityById,
        calculateCaloriesBurned,
        addToDailyActivities,
        fetchCartFoods,
        fetchDailyActivities,
        updateUser,
        deleteUser,
        fetchCategories,
        fetchActivitiesByCategory,
        searchAll,
        deleteFoodFromCart,
        deleteActivityFromCart,
        modifyCartFood,
        modifyCartActivity,
        addFood,
        addActivity,
        addExercise,
        addPlan,
        addRecipe,
        fetchExercises,
        fetchRecipes,
        fetchPlans,
        fetchExerciseById,
        fetchRecipeById,
        fetchPlanById
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};
