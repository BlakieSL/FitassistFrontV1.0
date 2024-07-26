import React, { useState, useEffect, useContext } from 'react';
import ModalComponent from '../modalComponent/modal.component';
import { ApiContext } from "../../contexts/api.context";
import { useNavigate } from "react-router-dom";

const FindModal = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step 1: Choose between calories burned or consumed
    const [choice, setChoice] = useState(''); // 'burned' or 'consumed'
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const { fetchActivityCategories, fetchActivitiesByCategory, fetchFoodCategories, fetchFoodsByCategory } = useContext(ApiContext);

    useEffect(() => {
        if (show && step === 2) {
            const fetchCategories = choice === 'burned' ? fetchActivityCategories : fetchFoodCategories;
            fetchCategories().then(setCategories).catch(err => console.error('Error fetching categories:', err));
        }
    }, [show, step, choice, fetchActivityCategories, fetchFoodCategories]);

    // Add this useEffect to reset state when the modal is closed
    useEffect(() => {
        if (!show) {
            setStep(1);
            setChoice('');
            setCategories([]);
            setItems([]);
            setSelectedCategory('');
            setSelectedItem('');
        }
    }, [show]);

    const handleChoiceChange = (choice) => {
        setChoice(choice);
        setStep(2);
    };

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        try {
            const fetchItems = choice === 'burned' ? fetchActivitiesByCategory : fetchFoodsByCategory;
            const items = await fetchItems(categoryId);
            setItems(items);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleItemChange = (e) => {
        setSelectedItem(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedItem) {
            handleClose();
            if (choice === 'burned') {
                navigate(`/activities/${selectedItem}`);
            } else if (choice === 'consumed') {
                navigate(`/foods/${selectedItem}`);
            }
        }
    };

    return (
        <ModalComponent show={show} handleClose={handleClose} title="Select Option" handleSubmit={handleSubmit}>
            <form id="updateForm">
                {step === 1 && (
                    <div className="form-group">
                        <label>What do you want to calculate?</label>
                        <div>
                            <button type="button" onClick={() => handleChoiceChange('burned')}>Calories Burned</button>
                            <button type="button" onClick={() => handleChoiceChange('consumed')}>Calories Consumed</button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <>
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
                                <label htmlFor="itemSelect">Select {choice === 'burned' ? 'Activity' : 'Food'}</label>
                                <select id="itemSelect" value={selectedItem} onChange={handleItemChange} required>
                                    <option value="">Select an {choice === 'burned' ? 'activity' : 'food'}</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}
            </form>
        </ModalComponent>
    );
};

export default FindModal;
