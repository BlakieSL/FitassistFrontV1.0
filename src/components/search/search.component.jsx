import React, { useState, useContext } from 'react';
import { ApiContext } from '../../contexts/api.context';
import { useNavigate } from 'react-router-dom';


const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('foods');
    const [suggestions, setSuggestions] = useState([]);
    const { searchAll } = useContext(ApiContext);
    const navigate = useNavigate();

    const categoryIcons = {
        foods: <i className="fas fa-apple-alt"></i>,
        activities: <i className="fas fa-running"></i>,
        exercises: <i className="fas fa-dumbbell"></i>,
    };

    const categories = ['foods', 'activities', 'exercises'];

    const handleInputChange = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery) {
            try {
                const results = await searchAll(newQuery, category);
                setSuggestions(results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/searchResults?query=${query}&type=${category}`);
    };

    const handleSuggestionClick = (id) => {
        navigate(`/${category}/${id}`);
    };

    const toggleCategory = () => {
        const currentIndex = categories.indexOf(category);
        const nextIndex = (currentIndex + 1) % categories.length;
        setCategory(categories[nextIndex]);
    };

    return (
        <form id="searchForm" className="search-form" autoComplete="off" onSubmit={handleSubmit}>
            <button type="button" className="category-toggle-button" onClick={toggleCategory}>
                {categoryIcons[category]}
            </button>
            <input
                type="search"
                placeholder="Search..."
                id="searchInput"
                className="search-input"
                value={query}
                onChange={handleInputChange}
                required
            />
            <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
            </button>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(item.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchForm;
