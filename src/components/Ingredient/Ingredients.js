import React, { Fragment, useEffect, useState } from "react";
import IngredientList from "./IngredientList";
import Search from "./Search";
import IngredientForm from "./IngredientForm";
import ErorModal from "../UI/ErorModal";

const Ingredients = () => {
  const [ıngredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://todolist-af3b0-default-rtdb.firebaseio.com/ingredient.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let transform = [];
        for (const key in data) {
          transform.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        setLoading(false);
        setIngredients(transform);
      });
  }, []);

  const addHandler = (currentData) => {
    setLoading(true);
    fetch(
      "https://todolist-af3b0-default-rtdb.firebaseio.com/ingredient.json",
      {
        method: "POST",
        body: JSON.stringify(currentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((respense) => {
        return respense.json();
      })
      .then((data) => {
        setLoading(false);
        setIngredients((prevState) => [
          ...prevState,
          { id: data.name, ...currentData },
        ]);
      })
      .catch((error) => {
        setError(error.message || "Gönderme Hatası...");
      });
  };

  const deleteHandler = (ıngredientId) => {
    setIngredients((prevState) =>
      prevState.filter((prev) => prev.id !== ıngredientId)
    );
  };

  const onCancel = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && <ErorModal onCancel={onCancel} />}
      <IngredientForm onAdd={addHandler} onLoading={loading} />
      <Search />
      <IngredientList
        ıngredients={ıngredients}
        onDelete={deleteHandler}
        onLoading={loading}
      />
    </Fragment>
  );
};

export default Ingredients;
