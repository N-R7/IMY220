const SearchInput = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;