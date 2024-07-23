import { Link } from 'react-router-dom';

const NavItem = ({ to, iconClass, id, onClick }) => {
    return (
        <li className="navbar-item" id={id}>
            {to === '#' ? (
                <a href={to} onClick={onClick}>
                    <i className={iconClass}></i>
                </a>
            ) : (
                <Link to={to}>
                    <i className={iconClass}></i>
                </Link>
            )}
        </li>
    );
};

export default NavItem;
