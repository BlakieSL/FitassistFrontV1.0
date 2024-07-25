import React, { useState, useRef, useContext } from 'react';
import ModalComponent from '../../modalComponent/modal.component';
import TextInput from '../../textInput/textInput.component';
import { ApiContext } from '../../../contexts/api.context';

const AddPlanModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        text: ''
    });
    const formRef = useRef(null);
    const { addPlan } = useContext(ApiContext);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await addPlan(formData);
        } catch(error) {
            console.error('Error occurred during adding Plan:', error);
        }
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
            title="Add Plan"
            handleSubmit={triggerSubmit}
        >
            <form id="addPlanForm" onSubmit={handleSubmit} ref={formRef}>
                <TextInput
                    iconClass="fas fa-clipboard"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-align-left"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    value={formData.description}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-file-alt"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Text"
                    required
                    value={formData.text}
                    onChange={onInputChange}
                />
            </form>
        </ModalComponent>
    );
};

export default AddPlanModal;
