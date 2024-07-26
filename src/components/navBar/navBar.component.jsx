import React, { useContext, useState } from 'react';
import SearchForm from '../search/search.component';
import NavItem from '../navItem/navItem.component';
import FindActivityModal from '../findActivityModal/findActivityModal.component';
import AddFoodModal from '../addModals/addFoodModal/addFoodModal.component';
import AddActivityModal from '../addModals/addActivityModal/addActivityModal.component';
import AddExerciseModal from '../addModals/addExerciseModal/addExerciseModal.component';
import AddPlanModal from '../addModals/addPlanModal/addPlanModal.component';
import AddRecipeModal from '../addModals/addRecipeModal/addRecipeModal.component';
import { UserContext } from '../../contexts/user.context';
import SavedItemsModal from "../savedModal/savedModal.component";

const Navbar = () => {
    const { getUserRole } = useContext(UserContext);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
    const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
    const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
    const [isSavedItemsModalOpen, setIsSavedItemsModalOpen] = useState(false);

    const openActivityModal = () => setIsActivityModalOpen(true);
    const closeActivityModal = () => setIsActivityModalOpen(false);

    const openAddFoodModal = () => setIsAddFoodModalOpen(true);
    const closeAddFoodModal = () => setIsAddFoodModalOpen(false);

    const openAddActivityModal = () => setIsAddActivityModalOpen(true);
    const closeAddActivityModal = () => setIsAddActivityModalOpen(false);

    const openAddExerciseModal = () => setIsAddExerciseModalOpen(true);
    const closeAddExerciseModal = () => setIsAddExerciseModalOpen(false);

    const openAddPlanModal = () => setIsAddPlanModalOpen(true);
    const closeAddPlanModal = () => setIsAddPlanModalOpen(false);

    const openAddRecipeModal = () => setIsAddRecipeModalOpen(true);
    const closeAddRecipeModal = () => setIsAddRecipeModalOpen(false);

    const openSavedItemsModal = () => setIsSavedItemsModalOpen(true);
    const closeSavedItemsModal = () => setIsSavedItemsModalOpen(false);

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
                    <NavItem
                        to="#"
                        iconClass="fas fa-save"
                        onClick={openSavedItemsModal}
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
                            <NavItem
                                to="#"
                                iconClass="fas fa-dumbbell"
                                onClick={openAddExerciseModal}
                            />
                            <NavItem
                                to="#"
                                iconClass="fas fa-clipboard"
                                onClick={openAddPlanModal}
                            />
                            <NavItem
                                to="#"
                                iconClass="fas fa-utensils"
                                onClick={openAddRecipeModal}
                            />
                        </>
                    )}
                </ul>
            </nav>
            <FindActivityModal show={isActivityModalOpen} handleClose={closeActivityModal} />
            <AddFoodModal show={isAddFoodModalOpen} handleClose={closeAddFoodModal} />
            <AddActivityModal show={isAddActivityModalOpen} handleClose={closeAddActivityModal} />
            <AddExerciseModal show={isAddExerciseModalOpen} handleClose={closeAddExerciseModal} />
            <AddPlanModal show={isAddPlanModalOpen} handleClose={closeAddPlanModal} />
            <AddRecipeModal show={isAddRecipeModalOpen} handleClose={closeAddRecipeModal} />
            <SavedItemsModal show={isSavedItemsModalOpen} handleClose={closeSavedItemsModal} />
        </header>
    );
};

export default Navbar;
