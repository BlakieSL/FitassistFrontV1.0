import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../contexts/api.context';
import PlanList from '../../components/lists/planList/planList.component';
import ExerciseList from '../../components/lists/exerciseList/exerciseList.component';
import RecipeList from '../../components/lists/recipeList/recipeList.component';
import FoodList from "../../components/lists/foodList/foodList.component";
import ActivityList from "../../components/lists/activityList/activityList.component";

const SavedItemsPage = () => {
    const { type } = useParams();
    const { fetchUserPlans, fetchUserExercises, fetchUserRecipes, fetchUserFoods, fetchUserActivities } = useContext(ApiContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedItems = async () => {
            setLoading(true);
            setError(null);
            console.log(type);
            try {
                let data;
                switch (type) {
                    case 'plans':
                        data = await fetchUserPlans();
                        break;
                    case 'exercises':
                        data = await fetchUserExercises();
                        break;
                    case 'recipes':
                        data = await fetchUserRecipes();
                        break;
                    case 'foods':
                        data = await fetchUserFoods();
                        break;
                    case 'activities':
                        data = await fetchUserActivities();
                        break;
                    default:
                        throw new Error('Invalid item type');
                }
                setItems(data);
            } catch (error) {
                console.error('Error fetching saved items:', error);
                setError('Error fetching saved items');
            } finally {
                setLoading(false);
            }
        };
        fetchSavedItems();
    }, [type, fetchUserPlans, fetchUserExercises, fetchUserRecipes, fetchUserFoods, fetchUserActivities]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Saved {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            {type === 'plans' && <PlanList plans={items} />}
            {type === 'exercises' && <ExerciseList exercises={items} />}
            {type === 'recipes' && <RecipeList recipes={items} />}
            {type === 'foods' && <FoodList foods={items} />}
            {type === 'activities' && <ActivityList activities={items} />}
        </div>
    );
};

export default SavedItemsPage;
