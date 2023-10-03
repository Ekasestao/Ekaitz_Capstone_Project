import React from "react";

import NavigateHook from "../Hooks/navigate";

function PaypalResume(props) {
  const cancelPayment = () => {
    event.preventDefault();
    props.navigate("/payment");
  };

  const acceptPayment = () => {
    props.navigate("/invoice");
    props.changePage();
  };

  return (
    <div className="content-wrapper">
      paypal-resume
      <button type="submit" onClick={cancelPayment}>
        Cancelar pago
      </button>
      <button type="submit" onClick={acceptPayment}>
        Pagar
      </button>
    </div>
  );
}

export default NavigateHook(PaypalResume);
