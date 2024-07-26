import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SavedItemsModal = ({ show, handleClose }) => {
    const navigate = useNavigate();

    const handleViewSavedItems = (type) => {
        navigate(`savedItems/${type}`);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Saved Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column">
                    <Button className="mb-2" variant="primary" onClick={() => handleViewSavedItems('plans')}>Saved Plans</Button>
                    <Button className="mb-2" variant="primary" onClick={() => handleViewSavedItems('exercises')}>Saved Exercises</Button>
                    <Button className="mb-2" variant="primary" onClick={() => handleViewSavedItems('recipes')}>Saved Recipes</Button>
                    <Button className="mb-2" variant="primary" onClick={() => handleViewSavedItems('foods')}>Saved Foods</Button>
                    <Button className="mb-2" variant="primary" onClick={() => handleViewSavedItems('activities')}>Saved Activities</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SavedItemsModal;
