import React, { useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListsPopover = () => {
    const navigate = useNavigate();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleNavigate = (path) => {
        setIsPopoverOpen(false);
        navigate(path);
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px' }}>
                <div className="d-flex flex-column text-center">
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate('/foods')}
                    >
                        Foods
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate('/activities')}
                    >
                        Activities
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate('/exercises')}
                    >
                        Exercises
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate('/plans')}
                    >
                        Plans
                    </div>
                    <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate('/recipes')}
                    >
                        Recipes
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
                <i className="fas fa-bars"></i>
            </li>
        </OverlayTrigger>
    );
};

export default ListsPopover;
