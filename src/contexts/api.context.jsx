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
    fetchDailyActivities: () => null
});

export const ApiProvider = ({ children }) => {
    const { verifyToken, verifyResponse, getUserId, fetchCurrentUser } = useContext(UserContext);

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
        const userId = getUserId();

        const url = `http://localhost:8000/api/cart/${userId}/add`;
        const payload = { id: foodId, amount: parseInt(amount) }
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        return response.data;
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
        const payload = {userId: getUserId(), time: parseInt(time) };
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const addToDailyActivities = async (activityId, time) => {
        const token = verifyToken();
        const userId = getUserId();

        const url = `http://localhost:8000/api/daily-activities/${userId}/add`;
        const payload = {id: activityId, time: parseInt(time) };
        const requestOptions = getRequestOptions(token);

        const response = await axios.post(url, payload, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const fetchCartFoods = async() => {
        const token = verifyToken();
        const userId = getUserId();

        const url = `http://localhost:8000/api/cart/${userId}`;
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url, requestOptions);
        verifyResponse(response);
        return response.data;
    }

    const fetchDailyActivities = async() => {
        const token = verifyToken();
        const userId = getUserId();

        const url = `http://localhost:8000/api/daily-activities/${userId}`
        const requestOptions = getRequestOptions(token);

        const response = await axios.get(url,requestOptions);
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
        fetchDailyActivities
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};
