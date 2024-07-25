import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from "../../../contexts/api.context";
import TextOutput from "../../textOutput/textOutput.component";
import TextInput from "../../textInput/textInput.component";
import TextOutputTitle from "../../textOutputTitle/textOutputTitle.component";
const ActivityDetails = ({ activity }) => {
    const [time, setTime] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(null);
    const [error, setError] = useState('');
    const { calculateCaloriesBurned, addToDailyActivities } = useContext(ApiContext);

    useEffect(() => {
        setCaloriesBurned(null);
    }, [activity]);

    const handleCalculateCalories = async () => {
        if (!time) {
            setError('Please enter the time in minutes.');
            return;
        }
        setError('');

        try {
            const updatedActivity = await calculateCaloriesBurned(activity.id, time);
            setCaloriesBurned(updatedActivity.caloriesBurned);
        } catch (error) {
            console.log('Error occurred during calculating calories burned', error);
            setError('Failed to calculate calories burned.');
        }
    };

    const handleAddToDailyActivities = async () => {
        if (!time) {
            setError('Please enter the time in minutes.');
            return;
        }
        setError('');

        try {
            await addToDailyActivities(activity.id, time);
        } catch (error) {
            console.log('Error occurred during adding to daily activities:', error);
            setError('Failed to add activity to daily activities.');
        }
    };

    return (
        <div>
            <TextOutputTitle id="activityName" value={activity.name} />
            <TextOutput
                iconClass="fas fa-bolt"
                id="activityMet"
                value={`MET: ${activity.met}`}
            />
            <TextOutput
                iconClass="fas fa-tags"
                id="activityCategory"
                value={`Category: ${activity.categoryName}`}
            />
            {caloriesBurned !== null && (
                <TextOutput
                    iconClass="fas fa-fire"
                    id="caloriesBurn"
                    value={`Calories Burned: ${caloriesBurned}`}
                />
            )}
            <div id="activityDetailsButtons" className="activityDetailsButtons">
                <TextInput
                    iconClass="fas fa-clock"
                    type="number"
                    id="timeInput"
                    name="timeInput"
                    placeholder="Enter time in minutes"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button id="calculateCalories" onClick={handleCalculateCalories}>Calculate</button>
                <button id="addToDailyActivities" onClick={handleAddToDailyActivities}>Add</button>
                <p id="buttonsError">{error}</p>
            </div>
        </div>
    );
};

export default ActivityDetails;
