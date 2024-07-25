import React, {useState, useRef, useContext} from 'react';
import ModalComponent from '../../modalComponent/modal.component';
import TextInput from '../../textInput/textInput.component';
import {ApiContext} from "../../../contexts/api.context";
import {add} from "react-modal/lib/helpers/classList";

const AddFoodModalComponent = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        calories: '',
        protein: '',
        fat: '',
        carbohydrates: '',
        categoryName: ''
    });
    const formRef = useRef(null);
    const { addFood } = useContext(ApiContext);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            await addFood(formData);
        } catch(error){
            console.error('Error occurred during adding Food:', error);
        }
        handleClose();
    };

    const triggerSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            title="Add Food"
            handleSubmit={triggerSubmit}
        >
            <form id="addFoodForm" onSubmit={handleSubmit} ref={formRef}>
                <TextInput
                    iconClass="fas fa-apple-alt"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-fire"
                    type="number"
                    id="calories"
                    name="calories"
                    placeholder="Calories"
                    required
                    value={formData.calories}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-drumstick-bite"
                    type="number"
                    id="protein"
                    name="protein"
                    placeholder="Protein"
                    required
                    value={formData.protein}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-bacon"
                    type="number"
                    id="fat"
                    name="fat"
                    placeholder="Fat"
                    required
                    value={formData.fat}
                    onChange={onInputChange}
                />
                <TextInput
                    iconClass="fas fa-bread-slice"
                    type="number"
                    id="carbohydrates"
                    name="carbohydrates"
                    placeholder="Carbohydrates"
                    required
                    value={formData.carbohydrates}
                    onChange={onInputChange}
                />
                <select
                    id="categoryName"
                    name="categoryName"
                    className="form-control"
                    required
                    value={formData.categoryName}
                    onChange={onInputChange}
                >
                    <option value="">Select a category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains and Cereals">Grains and Cereals</option>
                    <option value="Meat">Meat</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Nuts and Seeds">Nuts and Seeds</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Oils">Oils</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Sweets and Snacks">Sweets and Snacks</option>
                    <option value="Condiments and Sauces">Condiments and Sauces</option>
                    <option value="Prepared and Processed">Prepared and Processed</option>
                </select>
            </form>
        </ModalComponent>
    );
};

export default AddFoodModalComponent;
