import TextInput from '../../components/textInput/textInput.component';
import SelectInput from '../../components/selectInput/selectInput.component';
import { useState } from "react";
import axios from "axios";

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
];

const activityLevelOptions = [
    { value: 'sedentary', label: 'sedentary' },
    { value: 'lightly_active', label: 'lightly active' },
    { value: 'moderately_active', label: 'moderately active' },
    { value: 'very_active', label: 'very active' },
    { value: 'super_active', label: 'super active' }
];

const goalOptions = [
    { value: 'maintain', label: 'maintain weight' },
    { value: 'lose', label: 'lose weight' },
    { value: 'build', label: 'build muscle' }
];

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:8000/api/users/register', {
                name, surname, email, password, gender, birthday, height, weight, activityLevel, goal
            });
            window.location.href = '/login';
        } catch (err) {
            setError('Registration failed: ' + (err.response?.data?.message || 'Please check your details and try again.'));
        }
    };

    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <TextInput
                    iconClass="fas fa-user"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-user"
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-envelope"
                    type="email"
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
                <SelectInput
                    iconClass="fas fa-venus-mars"
                    id="gender"
                    name="gender"
                    options={genderOptions}
                    required
                    placeholder="Select Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-birthday-cake"
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-ruler-vertical"
                    type="number"
                    id="height"
                    name="height"
                    placeholder="Height (cm)"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <TextInput
                    iconClass="fas fa-weight"
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Weight (kg)"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <SelectInput
                    iconClass="fas fa-running"
                    id="activityLevel"
                    name="activityLevel"
                    options={activityLevelOptions}
                    required
                    placeholder="Select Activity Level"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                />
                <SelectInput
                    iconClass="fas fa-bullseye"
                    id="goal"
                    name="goal"
                    options={goalOptions}
                    required
                    placeholder="Select Goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {error && <p id="registerError">{error}</p>}
        </main>
    );
};

export default RegisterForm;
