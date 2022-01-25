import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import IngredientList from "./IngredientList";
import Search from "./Search";
import IngredientForm from "./IngredientForm";
import ErorModal from "../UI/ErorModal";

const fetchReducer = (currentIngredient, action) => {
  switch (action.type) {
    case "SET":
      return action.ıngredients;
    case "ADD":
      return [...currentIngredient, action.ıngredients];
    case "DELETE":
      return currentIngredient.filter((prev) => prev.id !== action.id);
    default:
      throw new Error("Tekrar Deneyin...");
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

const Ingredients = () => {
  const [ıngredients, dispatch] = useReducer(fetchReducer, []);
  // const [ıngredients, setIngredients] = useState([]);
  const [httpState, dispatchHtpp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    dispatchHtpp({ type: "SEND" });
    fetch("https://todolist-af3b0-default-rtdb.firebaseio.com/ingredient.json")
      .then((response) => {
        dispatchHtpp({ type: "RESPONSE" });
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
        dispatch({ type: "SET", ıngredients: transform });
        // setIngredients(transform);
      });
  }, []);

  const addHandler = (currentData) => {
    dispatchHtpp({ type: "SEND" });
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
        dispatchHtpp({ type: "RESPONSE" });
        return respense.json();
      })
      .then((data) => {
        dispatch({
          type: "ADD",
          ıngredients: { id: data.name, ...currentData },
        });
        // setIngredients((prevState) => [
        //   ...prevState,
        //   { id: data.name, ...currentData },
        // ]);
      });
  };

  const filterIngredients = useCallback((currentData) => {
    dispatch({ type: "SET", ıngredients: currentData });
  }, []);

  const deleteHandler = (ıngredientId) => {
    dispatch({ type: "DELETE", id: ıngredientId });
  };

  const onCancel = () => {
    dispatchHtpp({ type: "CLEAR" });
  };
  return (
    <Fragment>
      {httpState.error && <ErorModal onCancel={onCancel} />}
      <IngredientForm onAdd={addHandler} />
      <Search onIngredient={filterIngredients} loading={httpState.loading} />
      <IngredientList
        ıngredients={ıngredients}
        onDelete={deleteHandler}
        onLoading={httpState.loading}
      />
    </Fragment>
  );
};

export default Ingredients;
