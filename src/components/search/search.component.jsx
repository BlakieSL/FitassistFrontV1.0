const SearchForm = () => {
    return (
        <form id="searchForm" className="search-form" autoComplete="off">
            <input
                type="search"
                placeholder="Search..."
                id="searchInput"
                className="search-input"
                required
            />
            <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
};

export default SearchForm;