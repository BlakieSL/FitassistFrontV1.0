import React, { useState, useEffect, useContext } from 'react';
import ModalComponent from '../modalComponent/modal.component';
import { ApiContext } from "../../contexts/api.context";

const FindActivityModal = ({ show, handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [activities, setActivities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const { fetchCategories, fetchActivitiesByCategory } = useContext(ApiContext);

    useEffect(() => {
        if (show) {
            fetchCategories().then(setCategories).catch(err => console.error('Error fetching categories:', err));
        }
    }, [show, fetchCategories]);

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        try {
            const activities = await fetchActivitiesByCategory(categoryId);
            setActivities(activities);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const handleActivityChange = (e) => {
        setSelectedActivity(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedActivity) {
            window.location.href = `/activity/${selectedActivity}`;
        }
    };

    return (
        <ModalComponent show={show} handleClose={handleClose} title="Select Activity" handleSubmit={handleSubmit}>
            <form id="updateForm">
                <div className="form-group">
                    <label htmlFor="categorySelect">Select Category</label>
                    <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange} required>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {selectedCategory && (
                    <div className="form-group">
                        <label htmlFor="activitySelect">Select Activity</label>
                        <select id="activitySelect" value={selectedActivity} onChange={handleActivityChange} required>
                            <option value="">Select an activity</option>
                            {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>{activity.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </form>
        </ModalComponent>
    );
};

export default FindActivityModal;
