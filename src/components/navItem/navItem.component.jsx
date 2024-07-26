import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NavItem = forwardRef(({ to, iconClass, id, onClick }, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(to);
        }
    };

    return (
        <li className="navbar-item" id={id} onClick={handleClick} ref={ref}>
            <i className={iconClass}></i>
        </li>
    );
});

export default NavItem;
