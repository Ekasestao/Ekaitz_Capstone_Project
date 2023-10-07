import React from "react";

import NavigateHook from "../Hooks/navigate";

function CreditCardResume(props) {
  const cancelPayment = () => {
    props.navigate("/carro");
  };

  const acceptPayment = () => {
    props.navigate("/invoice");
    props.changePageCreditCard();
    props.deleteAllCart();
  };

  return (
    <div className="credit-card-resume">
      <div className="credit-card-order-resume">
        <span style={{ fontSize: "1.3em" }}>Resumen de su pedido</span>
        <div className="credit-card-columns">
          <span>Descripciones</span>
          <span>Importe</span>
        </div>
        <div className="credit-card-products">{props.products}</div>
        <div className="credit-card-total">
          <span>Importe total a pagar</span>
          <span className="total">
            €{JSON.parse(localStorage.getItem("cartPrice"))}
          </span>
        </div>
        <div className="credit-card-buttons">
          <button type="submit" onClick={cancelPayment}>
            Cancelar pago
          </button>
          <button type="submit" onClick={acceptPayment}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigateHook(CreditCardResume);
