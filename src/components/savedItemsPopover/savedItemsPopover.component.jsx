import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SavedItemsPopover = ({ targetRef }) => {
    const navigate = useNavigate();

    const handleViewSavedItems = (type) => {
        navigate(`savedItems/${type}`);
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px' }}>
                <div className="d-flex flex-column text-center">
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewSavedItems('plans')}
                    >
                        Saved Plans
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewSavedItems('exercises')}
                    >
                        Saved Exercises
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewSavedItems('recipes')}
                    >
                        Saved Recipes
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewSavedItems('foods')}
                    >
                        Saved Foods
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewSavedItems('activities')}
                    >
                        Saved Activities
                    </div>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
            <li className="navbar-item" ref={targetRef}>
                <i className="fas fa-save"></i>
            </li>
        </OverlayTrigger>
    );
};

export default SavedItemsPopover;
