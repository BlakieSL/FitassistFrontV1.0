import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

// Utility functions
const getToken = () => localStorage.getItem('jwt');

const verifyToken = () => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

const getUserId = () => {
    const payload = jwtDecode(verifyToken());
    return payload.userId;
};

const getUserRole = () => {
    const payload = jwtDecode(verifyToken());
    return payload.authorities || [];
};

const verifyResponse =  (response) => {
    if (response.status === 401) {
        window.location.href = '/login';
    }
    if (response.status !== 200) {
        throw new Error('Network response was not okay');
    }
    return response;
};

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    getToken: () => null,
    verifyToken: () => null,
    getUserId: () => null,
    getUserRole: () => null,
    verifyResponse: () => null,
    fetchCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const fetchCurrentUser = () => {

            const token = verifyToken();
            axios.get(`http://localhost:8000/api/users/${getUserId()}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then( response=> {
                setCurrentUser(response.data);
            })
             .catch (error => {
                console.error('Error fetching current user:', error);
            });
    };

    useEffect(() => {
        if (!currentUser) {
            fetchCurrentUser();
        }
    }, [currentUser]);

    const value = {
        currentUser,
        setCurrentUser,
        getToken,
        verifyToken,
        getUserId,
        getUserRole,
        verifyResponse,
        fetchCurrentUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
