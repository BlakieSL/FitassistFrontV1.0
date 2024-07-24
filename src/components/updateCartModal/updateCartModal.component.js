import React, { useState, useEffect, useRef } from 'react';
import ModalComponent from '../modalComponent/modal.component';
import TextInput from '../textInput/textInput.component';

const UpdateCartModal = ({ show, handleClose, handleSubmit, initialData, iconClass, placeholder, fieldName }) => {
    const [value, setValue] = useState(initialData[fieldName] || '');
    const formRef = useRef(null);

    useEffect(() => {
        setValue(initialData[fieldName] || '');
    }, [initialData, fieldName]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ [fieldName]: value });
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
                    iconClass={iconClass}
                    type="number"
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder}
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        </ModalComponent>
    );
};

export default UpdateCartModal;
