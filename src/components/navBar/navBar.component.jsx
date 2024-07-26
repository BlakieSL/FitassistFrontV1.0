import React, { useContext, useState } from 'react';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindModal from '../findModal/findModal.component';
import { UserContext } from '../../contexts/user.context';
import SavedItemsPopover from '../popovers/savedItemsPopover/savedItemsPopover.component';
import AdminItemPopover from '../popovers/adminPanelPopover/adminPanelPopover.component';
import NavigationPopover from '../popovers/listsPopover/listsPopover.component';

const Navbar = () => {
    const { getUserRole } = useContext(UserContext);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

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
                    <NavigationPopover />
                    <NavItem
                        to="/cart"
                        iconClass="fas fa-shopping-cart"
                    />
                    <SavedItemsPopover />
                    {isAdmin && (
                        <AdminItemPopover />
                    )}
                    <NavItem
                        to="/userInfo"
                        iconClass="fas fa-user"
                    />
                </ul>
            </nav>
            <FindModal show={isActivityModalOpen} handleClose={closeActivityModal} />
        </header>
    );
};

export default Navbar;
