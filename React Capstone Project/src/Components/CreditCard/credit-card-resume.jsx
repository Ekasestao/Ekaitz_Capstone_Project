import React from "react";

import NavigateHook from "../Hooks/navigate";

function CreditCardResume(props) {
  const cancelPayment = () => {
    event.preventDefault();
    props.navigate("/carro");
  };

  const acceptPayment = () => {
    event.preventDefault();
    props.navigate("/invoice");
    props.changePage();
  };

  return (
    <div className="credit-card-resume">
      {props.products}
      <button type="submit" onClick={cancelPayment}>
        Cancelar pago
      </button>
      <button type="submit" onClick={acceptPayment}>
        Pagar
      </button>
    </div>
  );
}

export default NavigateHook(CreditCardResume);
