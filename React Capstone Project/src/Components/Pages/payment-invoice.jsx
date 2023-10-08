import React from "react";
import axios from "axios";

import NavigateHook from "../Hooks/navigate";

function Invoice(props) {
  const handleSubmit = () => {
    props.navigate("/");
  };

  const getInvoice = () => {};

  return (
    <div className="content-wrapper">
      payment-invoice
      <button className="btn" onClick={handleSubmit}>
        Volver a la página principal
      </button>
    </div>
  );
}

export default NavigateHook(Invoice);
