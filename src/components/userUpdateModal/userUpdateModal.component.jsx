import React, { useState, useEffect, useRef } from 'react';
import ModalComponent from '../modalComponent/modal.component';
import { activityLevelOptions, goalOptions } from '../../helper/options';
import TextInput from "../textInput/textInput.component";
import SelectInput from "../selectInput/selectInput.component";

const UserUpdateModal = ({ show, handleClose, handleSubmit, initialData }) => {
    const [height, setHeight] = useState(initialData.height || '');
    const [weight, setWeight] = useState(initialData.weight || '');
    const [activityLevel, setActivityLevel] = useState(initialData.activityLevel || '');
    const [goal, setGoal] = useState(initialData.goal || '');
    const formRef = useRef(null);

    useEffect(() => {
        setHeight(initialData.height || '');
        setWeight(initialData.weight || '');
        setActivityLevel(initialData.activityLevel || '');
        setGoal(initialData.goal || '');
    }, [initialData]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ height, weight, activityLevel, goal });
        handleClose();
    };

    const triggerSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            title="Update Information"
            handleSubmit={triggerSubmit}
        >
            <form id="updateForm" onSubmit={onSubmit} ref={formRef}>
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
            </form>
        </ModalComponent>
    );
};

export default UserUpdateModal;
