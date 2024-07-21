import React, { useState, useContext } from 'react';
import TextInput from '../../components/textInput/textInput.component';
import axios from 'axios';
import { UserContext } from '../../contexts/user.context';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { fetchCurrentUser } = useContext(UserContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', { username: email, password });
            const data = response.data;
            localStorage.setItem('jwt', data.token);

            await fetchCurrentUser();

            window.location.href = '/foods';
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || 'Please check your credentials and try again.'));
        }
    };

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <TextInput
                    iconClass="fas fa-envelope"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-lock"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {error && <p id="loginError">{error}</p>}
        </main>
    );
};

export default LoginForm;
