import React from "react";

import NavigateHook from "../Hooks/navigate";

function Invoice(props) {
  const handleSubmit = () => {
    props.navigate("/");
  };

  return (
    <div className="content-wrapper">
      payment-invoice
      <button onClick={handleSubmit}>Volver a la página principal</button>
    </div>
  );
}

export default NavigateHook(Invoice);
