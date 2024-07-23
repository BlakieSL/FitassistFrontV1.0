import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {UserContext} from './user.context';

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
    searchAll: () => null
});

export const ApiProvider = ({ children }) => {
    const { verifyToken, verifyResponse, fetchCurrentUser, logout, currentUser } = useContext(UserContext);

    const getRequestOptions = (token) => ({
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const register = async (userData) => {
        const response = await axios.post('http://localhost:8000/api/users/register', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        verifyResponse(response);
        window.location.href = '/login';
    };

    const login = async (credentials) => {
        const response = await axios.post('http://localhost:8000/api/users/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;
        localStorage.setItem('jwt', data.token);
        await fetchCurrentUser();
        window.location.href = '/foods'
    };

    const fetchFoods = async () => {
        const token = verifyToken();

        const url = 'http://localhost:8000/api/foods';
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    };

    const fetchFoodById = async (foodId) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/foods/${foodId}`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    };

    const calculateMacros = async (foodId, amount) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/foods/${foodId}/calculate-macros`;
        const payload = { amount: parseInt(amount) };
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        return response.data;
    };

    const addToCart = async (foodId, amount) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/cart/${currentUser.id}/add`;
        const payload = { id: foodId, amount: parseInt(amount) }
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        alert('Food added successfully');
    };

    const fetchActivities = async () => {
        const token = verifyToken();

        const url = 'http://localhost:8000/api/activities';
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const fetchActivityById = async (activityId) => {
        const token = verifyToken();

        const url =  `http://localhost:8000/api/activities/${activityId}`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url,requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const calculateCaloriesBurned = async (activityId, time) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/activities/${activityId}/calculate-calories`
        const payload = {userId: currentUser.id, time: parseInt(time) };
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const addToDailyActivities = async (activityId, time) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/daily-activities/${currentUser.id}/add`;
        const payload = {id: activityId, time: parseInt(time) };
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        alert('Activity added successfully');
    }

    const fetchCartFoods = async() => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/cart/${currentUser.id}`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const fetchDailyActivities = async() => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/daily-activities/${currentUser.id}`
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url,requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const updateUser = async(userData) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/users/${currentUser.id}`;
        const payload = userData;
        const requestOptions = getRequestOptions(token);

        const response = await axios.patch(url, payload,requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const deleteUser = async() => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/users/${currentUser.id}`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.delete(url,requestOptions);
        verifyResponse(response);
        alert('User deleted successfully');
        logout();
    }

    const fetchCategories = async() => {
        const token = verifyToken();

        const url = 'http://localhost:8000/api/activity-categories';
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const fetchActivitiesByCategory = async(categoryId) => {
        const token = verifyToken();

        const url = `http://localhost:8000/api/activity-categories/${categoryId}/activities`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const searchAll = async (query, type) => {
        const token = verifyToken();
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
                { name: query },
                getRequestOptions(token)
            );
            verifyResponse(response);
            return response.data;
        } catch (error) {
            console.error(`Error searching ${type}`, error);
            throw error;
        }
    };


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
        searchAll
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};
