import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindActivityModal from '../findActivityModal/findActivityModal.component';

const Navbar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li className="navbar-item">
                        <SearchForm />
                    </li>
                    <NavItem
                        to="#"
                        iconClass="fas fa-calculator"
                        id="openCalculatorModal"
                        onClick={openModal}
                    />
                    <NavItem
                        to="#"
                        iconClass="fas fa-home"
                        onClick={() => handleNavigation('/foods')}
                    />
                    <NavItem
                        to="#"
                        iconClass="fas fa-running"
                        onClick={() => handleNavigation('/activities')}
                    />
                    <NavItem
                        to="#"
                        iconClass="fas fa-shopping-cart"
                        onClick={() => handleNavigation('/cart')}
                    />
                    <NavItem
                        to="#"
                        iconClass="fas fa-user"
                        onClick={() => handleNavigation('/userInfo')}
                    />
                </ul>
            </nav>
            <FindActivityModal show={isModalOpen} handleClose={closeModal} />
        </header>
    );
};

export default Navbar;
