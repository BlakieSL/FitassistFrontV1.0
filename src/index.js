import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./contexts/user.context";
import { ApiProvider } from "./contexts/api.context";
import { refreshAccessToken, getAccessToken} from "./helper/tokenUtils";
import axios from "axios";

axios.interceptors.request.use(
    async (config) => {
        const excludedEndpoints = ['/api/users/login', '/api/users/register', '/api/users/refresh-token'];
        if (!excludedEndpoints.some(endpoint => config.url.endsWith(endpoint))) {
            let token = getAccessToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <ApiProvider>
                <App />
            </ApiProvider>
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
