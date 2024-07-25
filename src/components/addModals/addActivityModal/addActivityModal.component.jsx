import React, { useState, useRef, useContext } from 'react';
import ModalComponent from '../../modalComponent/modal.component';
import TextInput from '../../textInput/textInput.component';
import { ApiContext } from '../../../contexts/api.context';

const AddActivityModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        met: '',
        categoryName: ''
    });
    const formRef = useRef(null);
    const { addActivity } = useContext(ApiContext);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await addActivity(formData);
        } catch(error) {
            console.error('Error occurred during adding Activity:', error);
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
            title="Add Activity"
            handleSubmit={triggerSubmit}
        >
            <form id="addActivityForm" onSubmit={handleSubmit} ref={formRef}>
                <TextInput
                    iconClass="fas fa-running"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-fire"
                    type="number"
                    step="0.1"
                    id="met"
                    name="met"
                    placeholder="MET"
                    required
                    value={formData.met}
                    onChange={onInputChange}
                />
                <select
                    id="categoryName"
                    name="categoryName"
                    className="form-control"
                    required
                    value={formData.categoryName}
                    onChange={onInputChange}
                >
                    <option value="">Select a category</option>
                    <option value="Walking">Walking</option>
                    <option value="Running">Running</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Hiking">Hiking</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Aerobics">Aerobics</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Sports">Sports</option>
                    <option value="Household Activities">Household Activities</option>
                    <option value="Yoga and Stretching">Yoga and Stretching</option>
                    <option value="Leisure and Recreation">Leisure and Recreation</option>
                    <option value="Occupational Activities">Occupational Activities</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            </form>
        </ModalComponent>
    );
};

export default AddActivityModal;
