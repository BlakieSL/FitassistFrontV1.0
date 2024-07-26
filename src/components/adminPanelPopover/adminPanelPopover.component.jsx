import React, { useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import AddFoodModal from '../addModals/addFoodModal/addFoodModal.component';
import AddActivityModal from '../addModals/addActivityModal/addActivityModal.component';
import AddExerciseModal from '../addModals/addExerciseModal/addExerciseModal.component';
import AddPlanModal from '../addModals/addPlanModal/addPlanModal.component';
import AddRecipeModal from '../addModals/addRecipeModal/addRecipeModal.component';

const AdminItemPopover = () => {
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
    const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
    const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

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

    const popover = (
        <Popover id="popover-admin">
            <Popover.Body style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px' }}>
                <div className="d-flex flex-column text-center">
                    <div className="mb-2" style={{ cursor: 'pointer' }} onClick={openAddFoodModal}>
                        Add Food
                    </div>
                    <div className="mb-2" style={{ cursor: 'pointer' }} onClick={openAddActivityModal}>
                        Add Activity
                    </div>
                    <div className="mb-2" style={{ cursor: 'pointer' }} onClick={openAddExerciseModal}>
                        Add Exercise
                    </div>
                    <div className="mb-2" style={{ cursor: 'pointer' }} onClick={openAddPlanModal}>
                        Add Plan
                    </div>
                    <div className="mb-2" style={{ cursor: 'pointer' }} onClick={openAddRecipeModal}>
                        Add Recipe
                    </div>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
                <li className="navbar-item">
                    <i className="fas fa-tools"></i>
                </li>
            </OverlayTrigger>

            <AddFoodModal show={isAddFoodModalOpen} handleClose={closeAddFoodModal} />
            <AddActivityModal show={isAddActivityModalOpen} handleClose={closeAddActivityModal} />
            <AddExerciseModal show={isAddExerciseModalOpen} handleClose={closeAddExerciseModal} />
            <AddPlanModal show={isAddPlanModalOpen} handleClose={closeAddPlanModal} />
            <AddRecipeModal show={isAddRecipeModalOpen} handleClose={closeAddRecipeModal} />
        </>
    );
};

export default AdminItemPopover;
