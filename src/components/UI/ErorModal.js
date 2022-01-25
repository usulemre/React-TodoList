import React, { Fragment } from "react";
import "./ErorModal.css";
const ErorModal = (props) => {
  return (
    <Fragment>
      <div className="backdrop"></div>
      <div className="content">
        <h2>Hata...</h2>
        <div className="btn-action">
          <button onClick={props.onCancel}>Close</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ErorModal;
