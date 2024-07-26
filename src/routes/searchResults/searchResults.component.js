import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiContext } from '../../contexts/api.context';
import FoodList from "../../components/lists/foodList/foodList.component";
import ActivityList from "../../components/lists/activityList/activityList.component";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery();
    const searchQuery = query.get('query');
    const type = query.get('type');
    const { searchAll } = useContext(ApiContext);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await searchAll(searchQuery, type);
                setResults(data);
            } catch (err) {
                setError('Error fetching search results');
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchData();
        }
    }, [searchQuery, type, searchAll]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Search Results for "{searchQuery}"</h1>
            {type === 'foods' && results.length > 0 && (
                <FoodList foods={results} />
            )}
            {type === 'activities' && results.length > 0 && (
                 <ActivityList activities={results} />
            )}
            {type === 'exercises' && results.length > 0 && (
                <div>
                    <h2>Exercises</h2>
                    <ul>
                        {results.map(exercise => (
                            <li key={exercise.id}>{exercise.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
