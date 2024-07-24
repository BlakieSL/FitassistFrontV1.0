import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextOutput from "../textOutput/textOutput.component";
import TextOutputTitle from "../textOutputTitle/textOutputTitle.component";

const CartActivities = ({ activities, editMode, handleUpdate, handleDelete }) => {
    const navigate = useNavigate();

    const handleActivityClick = (activityId) => {
        navigate(`/activity/${activityId}`);
    };

    return (
        <div id="cartActivityList">
            <h2>Activities</h2>
            {activities.length > 0 ? (
                activities.map(activity => (
                    <div key={activity.id} className="activity-container">
                        <div
                            onClick={() => handleActivityClick(activity.id)}
                            className="activity-link"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="activity-item">
                                <TextOutputTitle id="title" value={activity.name} />
                                <TextOutput
                                    iconClass="fas fa-fire"
                                    id="activityCaloriesBurned"
                                    value={`Calories Burned: ${activity.caloriesBurned}`}
                                />
                                <TextOutput
                                    iconClass="fas fa-clock"
                                    id="activityTime"
                                    value={`Time: ${activity.time}`}
                                />
                            </div>
                        </div>
                        {editMode && (
                            <div className="edit-buttons">
                                <button onClick={() => handleUpdate(activity)}>
                                    Modify
                                </button>
                                <button onClick={() => handleDelete(activity.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default CartActivities;
