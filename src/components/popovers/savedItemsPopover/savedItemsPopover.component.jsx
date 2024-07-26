import React, {useState} from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SavedItemsPopover = () => {
    const navigate = useNavigate();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleViewSavedItems = (type) => {
        setIsPopoverOpen(false);
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
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={popover}
            rootClose
            onToggle={(nextShow) => setIsPopoverOpen(nextShow)}
            show={isPopoverOpen}
        >
            <li className="navbar-item">
                <i className="fas fa-save"></i>
            </li>
        </OverlayTrigger>
    );
};

export default SavedItemsPopover;
