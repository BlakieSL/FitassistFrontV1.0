import React, { useState } from 'react';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindActivityModal from '../findActivityModal/findActivityModal.component';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li className="navbar-item">
                        <SearchForm />
                    </li>
                    <NavItem to="#" iconClass="fas fa-calculator" id="openCalculatorModal" onClick={openModal} />
                    <NavItem to="/foods" iconClass="fas fa-home" />
                    <NavItem to="/activities" iconClass="fas fa-running" />
                    <NavItem to="/cart" iconClass="fas fa-shopping-cart" />
                    <NavItem to="/userInfo" iconClass="fas fa-user" />
                </ul>
            </nav>
            <FindActivityModal show={isModalOpen} handleClose={closeModal} />
        </header>
    );
};

export default Navbar;