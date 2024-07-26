import React, { useContext, useState, useRef } from 'react';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindActivityModal from '../findActivityModal/findActivityModal.component';
import { UserContext } from '../../contexts/user.context';
import SavedItemsPopover from '../savedItemsPopover/savedItemsPopover.component';
import AdminItemPopover from '../adminPanelPopover/adminPanelPopover.component';

const Navbar = () => {
    const { getUserRole } = useContext(UserContext);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const target = useRef(null);

    const openActivityModal = () => setIsActivityModalOpen(true);
    const closeActivityModal = () => setIsActivityModalOpen(false);

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
                        to="/foods"
                        iconClass="fas fa-apple-alt"
                    />
                    <NavItem
                        to="/activities"
                        iconClass="fas fa-running"
                    />
                    <NavItem
                        to="/exercises"
                        iconClass="fas fa-dumbbell"
                    />
                    <NavItem
                        to="/plans"
                        iconClass="fas fa-clipboard"
                    />
                    <NavItem
                        to="/recipes"
                        iconClass="fas fa-utensils"
                    />
                    <NavItem
                        to="/cart"
                        iconClass="fas fa-shopping-cart"
                    />
                    <NavItem
                        to="/userInfo"
                        iconClass="fas fa-user"
                    />
                    <SavedItemsPopover targetRef={target} />
                    {isAdmin && (
                        <AdminItemPopover />
                    )}
                </ul>
            </nav>
            <FindActivityModal show={isActivityModalOpen} handleClose={closeActivityModal} />
        </header>
    );
};

export default Navbar;
