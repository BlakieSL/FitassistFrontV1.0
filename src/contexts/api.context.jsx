import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './user.context';

export const ApiContext = createContext({
    fetchFoods: () => null,
    calculateMacros: () => null,
    addToCart: () => null,
    register: () => null,
    login: () => null,
    fetchFoodById: () => null
});

export const ApiProvider = ({ children }) => {
    const { verifyToken, verifyResponse, getUserId, fetchCurrentUser } = useContext(UserContext);

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
        const response = await axios.get('http://localhost:8000/api/foods', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        verifyResponse(response);
        return response.data;
    };

    const fetchFoodById = async (foodId) => {
        const token = verifyToken();
        const response = await axios.get(`http://localhost:8000/api/foods/${foodId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        verifyResponse(response);
        return response.data;
    };

    const calculateMacros = async (foodId, amount) => {
        const token = verifyToken();
        const response = await axios.post(`http://localhost:8000/api/foods/${foodId}/calculate-macros`, { amount: parseInt(amount) }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        verifyResponse(response);
        return response.data;
    };

    const addToCart = async (foodId, amount) => {
        const token = verifyToken();
        const userId = getUserId();
        const response = await axios.post(`http://localhost:8000/api/cart/${userId}/add`, { id: foodId, amount: parseInt(amount) }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        verifyResponse(response);
        return response.data;
    };


    const value = {
        fetchFoods,
        calculateMacros,
        addToCart,
        register,
        login,
        fetchFoodById
    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};
