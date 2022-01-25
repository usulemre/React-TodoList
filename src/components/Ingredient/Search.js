import React, { useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import "./Search.css";
const Search = (props) => {
  const [search, setSearch] = useState("");
  const titleText = useRef();
  const { onIngredient } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === titleText.current.value) {
        const query =
          search.length === 0 ? "" : `?orderBy="title"&equalTo="${search}"`;
        fetch(
          "https://todolist-af3b0-default-rtdb.firebaseio.com/ingredient.json" +
            query
        )
          .then((response) => response.json())
          .then((data) => {
            let transform = [];
            for (const key in data) {
              transform.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount,
              });
            }
            onIngredient(transform);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, onIngredient]);

  return (
    <section>
      <Card>
        <div className="search">
          <label htmlFor="search">Search</label>
          <input
            ref={titleText}
            type="text"
            id="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
};

export default Search;
