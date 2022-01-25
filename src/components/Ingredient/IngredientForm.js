import React, { useState } from "react";
import Card from "../UI/Card";
import Loading from "../UI/Loading";
import "./IngredientForm.css";
const IngredientForm = (props) => {
  const [titleText, setTitleText] = useState("");
  const [amountText, setAmountText] = useState("");

  const addFormHandler = (event) => {
    event.preventDefault();
    if (titleText === "" && amountText === "") {
      return;
    }
    props.onAdd({ title: titleText, amount: amountText });
  };
  return (
    <section>
      <Card>
        <form className="formclas" onSubmit={addFormHandler}>
          <div className="control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={titleText}
              onChange={(event) => {
                setTitleText(event.target.value);
              }}
            />
          </div>
          <div className="control">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              value={amountText}
              onChange={(event) => {
                setAmountText(event.target.value);
              }}
            />
          </div>
          <div className="action">
            <button>Add</button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default IngredientForm;
