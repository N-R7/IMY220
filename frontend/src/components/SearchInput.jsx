const SearchInput = ({
    searchTerm,
    setSearchTerm
}) => {

    return (
        <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(e.target.value)
            }
        />
    );
};

export default SearchInput;