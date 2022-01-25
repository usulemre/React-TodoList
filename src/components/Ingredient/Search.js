import React from "react";
import Card from "../UI/Card";
import "./Search.css";
const Search = () => {
  return (
    <section>
      <Card>
        <div className="search">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" />
        </div>
      </Card>
    </section>
  );
};

export default Search;
