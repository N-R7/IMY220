const SearchInput = ({
    searchTerm,
    setSearchTerm
}) => {
    return (
        <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(e.target.value)
            }
            style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                border: '2px solid #d6c4b2',
                backgroundColor: '#fffaf2',
                marginBottom: '20px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
            }}
        />
    );
};

export default SearchInput;