import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li className="navbar-item">
                        <SearchForm />
                    </li>
                    <NavItem to="/foods" iconClass="fas fa-home" />
                    <NavItem to="/activities" iconClass="fas fa-running" />
                    <NavItem to="#" iconClass="fas fa-calculator" id="openCalculatorModal" />
                    <NavItem to="/cart" iconClass="fas fa-shopping-cart" />
                    <NavItem to="/userInfo" iconClass="fas fa-user" />
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
