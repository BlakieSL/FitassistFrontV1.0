import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const verifyToken = () => {
    const token = getAccessToken();
    if (!token) {
        window.location.href = '/login';
        throw new Error('no token found');
    }
    return token;
};

export const getUserId = () => {
    try {
        const token = verifyToken();
        const payload = jwtDecode(token);
        return payload.userId;
    } catch (error) {
        console.log('Error getting user ID:', error);
        return null;
    }
};

export const getUserRole = () => {
    try {
        const token = verifyToken();
        const payload = jwtDecode(token);
        return payload.authorities || [];
    } catch (error) {
        console.log('Error getting user role:', error);
        return [];
    }
};

export const verifyResponse = (response) => {
    if (response.status === 401) {
        window.location.href = '/login';
    }
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not okay');
    }
    return response;
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        const response = await axios.post('http://localhost:8000/api/users/refresh-token', { refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        logout();
        throw error;
    }
};
