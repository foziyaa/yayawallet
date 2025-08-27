import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <i className="fa fa-search"></i>
      <input
        type="text"
        placeholder="Press Enter to search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  );
};

export default SearchBar;