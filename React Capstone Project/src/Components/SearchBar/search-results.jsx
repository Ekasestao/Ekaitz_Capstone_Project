import React from "react";
import { NavLink } from "react-router-dom";

function SearchResults(props) {
  return (
    <div className="search-results">
      {props.results.map((result) => {
        return (
          <NavLink
            key={result.products_id}
            to={`/products/${result.products_id}`}
            onClick={window.location.reload}
          >
            <div className="result">{result.products_name}</div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SearchResults;
