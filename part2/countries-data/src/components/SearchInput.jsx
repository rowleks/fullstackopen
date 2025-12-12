const SearchInput = ({ searchQuery, handleSearch }) => {
  return (
    <section>
      <span>Find Countries </span>
      <input type="text" value={searchQuery} onChange={handleSearch} />
    </section>
  );
};

export default SearchInput;





