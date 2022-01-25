import React from "react";
import Loading from "../UI/Loading";
import "./IngredientList.css";
const IngredientList = (props) => {
  return (
    <section>
      <h2>Loaded Ingredients</h2>
      <ul className="list">
        {props.onLoading && <Loading />}
        {props.ıngredients.map((ingredien) => (
          <li
            key={ingredien.id}
            className="list-item"
            onClick={props.onDelete.bind(this, ingredien.id)}
          >
            <h2>{ingredien.title}</h2>
            <p>{ingredien.amount}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
