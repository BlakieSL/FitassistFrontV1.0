import { Link } from 'react-router-dom';

const NavItem = ({ to, iconClass, children }) => {
    return (
        <li className="navbar-item">
            <Link to={to} className="navbar-link">
                <i className={iconClass}></i>
                {children}
            </Link>
        </li>
    );
};

export default NavItem;
