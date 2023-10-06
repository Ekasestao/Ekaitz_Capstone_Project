import React from "react";

import NavigateHook from "../Hooks/navigate";

function CreditCardResume(props) {
  const cancelPayment = () => {
    props.navigate("/carro");
  };

  const acceptPayment = () => {
    props.navigate("/invoice");
    props.changePageCreditCard();
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
