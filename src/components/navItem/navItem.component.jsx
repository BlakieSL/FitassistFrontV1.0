import { useNavigate } from 'react-router-dom';

const NavItem = ({ to, iconClass, id, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(to);
        }
    };

    return (
        <li className="navbar-item" id={id} onClick={handleClick} >
                <i className={iconClass}></i>
        </li>
    );
};

export default NavItem;

