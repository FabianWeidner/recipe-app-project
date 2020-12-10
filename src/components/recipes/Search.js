import React, { useState } from "react";

import PropTypes from "prop-types";

const Search = ({ searchRecipes, showClear, clearRecipes, setAlert }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter your recipe", "light");
    } else {
      searchRecipes(text);
      setText("");
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Recipes"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          claue="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearRecipes}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  clearRecipes: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
