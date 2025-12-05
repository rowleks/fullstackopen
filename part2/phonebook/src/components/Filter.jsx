const Filter = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      Filter shown with {""}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;

