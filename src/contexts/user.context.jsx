import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken, verifyToken, getUserId, getUserRole, verifyResponse, logout, refreshAccessToken } from '../helper/tokenUtils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    getAccessToken: () => null,
    verifyToken: () => null,
    getUserId: () => null,
    getUserRole: () => null,
    verifyResponse: () => null,
    fetchCurrentUser: () => null,
    logout: () => null,
    refreshAccessToken: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const fetchCurrentUser = () => {
        const token = verifyToken();
        axios.get(`http://localhost:8000/api/users/${getUserId()}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const user = response.data;
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
            });
    };

    useEffect(() => {
        const token = getAccessToken();
        if (token && !currentUser) {
            fetchCurrentUser();
        }
    }, [currentUser]);

    const value = {
        currentUser,
        setCurrentUser,
        getAccessToken,
        verifyToken,
        getUserId,
        getUserRole,
        verifyResponse,
        fetchCurrentUser,
        logout,
        refreshAccessToken
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
