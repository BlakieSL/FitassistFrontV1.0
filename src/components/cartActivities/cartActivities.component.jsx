import React from 'react';
import TextOutput from "../textOutput/textOutput.component";
import TextOutputTitle from "../textOutputTitle/textOutputTitle.component";
const CartActivities = ({ activities }) => {
    return (
        <div id="cartActivityList">
            <h2>Activities</h2>
            {activities.length > 0 ? (
                activities.map(activity => (
                    <a href={`/activity/${activity.id}`} className="activity-link" key={activity.id}>
                        <div className="activity-item">
                            <TextOutputTitle id="title" value={activity.name}/>
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
                    </a>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default CartActivities;
