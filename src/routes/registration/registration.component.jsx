import React, { useContext, useState } from 'react';
import TextInput from '../../components/textInput/textInput.component';
import SelectInput from '../../components/selectInput/selectInput.component';
import { ApiContext } from "../../contexts/api.context";
import { genderOptions, activityLevelOptions, goalOptions} from "../../helper/options";


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

    const { register } = useContext(ApiContext);

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await register({name, surname, email, password, gender, birthday, height, weight, activityLevel, goal});
        } catch (error) {
            console.log('Error during registration:', error);
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
        </main>
    );
};

export default RegisterForm;
