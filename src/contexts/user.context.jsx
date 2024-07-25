import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode, {jwtDecode} from 'jwt-decode';


// Utility functions
const getToken = () => localStorage.getItem('jwt');

const verifyToken = () => {
    const token = getToken();
    if (!token) {
        window.location.href = '/login';
        throw new Error('no token found');
    }
    return token;
};

const getUserId = () => {
    try {
        const token = verifyToken();
        const payload = jwtDecode(token);
        return payload.userId;
    } catch (error) {
        console.log('Error getting user ID:', error);
        return null;
    }
};

const getUserRole = () => {
    try {
        const token = verifyToken();
        const payload = jwtDecode(token);
        return payload.authorities || [];
    } catch (error) {
        console.log('Error getting user role:', error);
        return [];
    }
};

const verifyResponse = (response) => {
    if (response.status === 401) {
        window.location.href = '/login';
    }
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not okay');
    }
    return response;
};

const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    getToken: () => null,
    verifyToken: () => null,
    getUserId: () => null,
    getUserRole: () => null,
    verifyResponse: () => null,
    fetchCurrentUser: () => null,
    logout: () => null
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
        const token = getToken();
        if (token && !currentUser) {
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
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
