import React, { useState, useContext } from 'react';
import TextInput from '../../components/textInput/textInput.component';
import axios from 'axios';
import { ApiContext} from "../../contexts/api.context";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(ApiContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            await login({ username: email, password });
        } catch (error){
            console.error('Error during login:', error);
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
        </main>
    );
};

export default LoginForm;
