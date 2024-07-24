import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindActivityModal from '../findActivityModal/findActivityModal.component';
import AddFoodModal from '../addFoodModal/addFoodModal.component';
import AddActivityModal from '../addActivityModal/addActivityModal.component';
import { UserContext } from '../../contexts/user.context';

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, getUserRole } = useContext(UserContext);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

    const openActivityModal = () => setIsActivityModalOpen(true);
    const closeActivityModal = () => setIsActivityModalOpen(false);

    const openAddFoodModal = () => setIsAddFoodModalOpen(true);
    const closeAddFoodModal = () => setIsAddFoodModalOpen(false);

    const openAddActivityModal = () => setIsAddActivityModalOpen(true);
    const closeAddActivityModal = () => setIsAddActivityModalOpen(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isAdmin = getUserRole().includes('ROLE_ADMIN');

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
                        onClick={openActivityModal}
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
                    {isAdmin && (
                        <>
                            <NavItem
                                to="#"
                                iconClass="fas fa-apple-alt"
                                onClick={openAddFoodModal}
                            />
                            <NavItem
                                to="#"
                                iconClass="fas fa-running"
                                onClick={openAddActivityModal}
                            />
                        </>
                    )}
                </ul>
            </nav>
            <FindActivityModal show={isActivityModalOpen} handleClose={closeActivityModal} />
            <AddFoodModal show={isAddFoodModalOpen} handleClose={closeAddFoodModal} />
            <AddActivityModal show={isAddActivityModalOpen} handleClose={closeAddActivityModal} />
        </header>
    );
};

export default Navbar;
