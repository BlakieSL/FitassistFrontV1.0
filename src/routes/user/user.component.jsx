import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { ApiContext } from '../../contexts/api.context';
import TextOutput from '../../components/textOutput/textOutput.component';
import TextOutputTitle from '../../components/textOutputTitle/textOutputTitle.component';
import UserUpdateModal from '../../components/userUpdateModal/userUpdateModal.component';

const User = () => {
    const { currentUser, logout, fetchCurrentUser } = useContext(UserContext);
    const { deleteUser, updateUser } = useContext(ApiContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteUser();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            await updateUser(updatedData);
            await fetchCurrentUser();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    return (
        <div id="userInfo">
            <TextOutputTitle id="userInfoTitle" value={"User Information"} />
            <TextOutput
                iconClass="fas fa-user"
                id="userName"
                value={`Name: ${currentUser.name}`}
            />
            <TextOutput
                iconClass="fas fa-user"
                id="userSurname"
                value={`Surname: ${currentUser.surname}`}
            />
            <TextOutput
                iconClass="fas fa-envelope"
                id="userEmail"
                value={`Email: ${currentUser.email}`}
            />
            <TextOutput
                iconClass="fas fa-venus-mars"
                id="userGender"
                value={`Gender: ${currentUser.gender}`}
            />
            <TextOutput
                iconClass="fas fa-birthday-cake"
                id="userAge"
                value={`Age: ${currentUser.age}`}
            />
            <TextOutput
                iconClass="fas fa-ruler-vertical"
                id="userHeight"
                value={`Height: ${currentUser.height}`}
            />
            <TextOutput
                iconClass="fas fa-weight"
                id="userWeight"
                value={`Weight: ${currentUser.weight}`}
            />
            <TextOutput
                iconClass="fas fa-running"
                id="userActivityLevel"
                value={`Activity Level: ${currentUser.activityLevel}`}
            />
            <TextOutput
                iconClass="fas fa-bullseye"
                id="userGoal"
                value={`Goal: ${currentUser.goal}`}
            />
            <TextOutput
                iconClass="fas fa-fire"
                id="userCalories"
                value={`Calculated Calories: ${currentUser.calculatedCalories}`}
            />
            <div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    Edit Info
                </button>
                <button className="btn btn-primary" onClick={logout}>
                    Logout
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
            <UserUpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                handleSubmit={handleUpdate}
                initialData={currentUser}
            />
        </div>
    );
};

export default User;
