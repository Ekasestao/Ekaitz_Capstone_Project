import React from "react";

import NavigateHook from "../Hooks/navigate";

function PaypalResume(props) {
  const cancelPayment = () => {
    props.navigate("/carro");
  };

  const acceptPayment = () => {
    props.navigate("/invoice");
    props.changePagePaypal();
    props.deleteAllCart();
  };

  return (
    <div className="paypal-resume">
      <div className="paypal-order-resume">
        <span style={{ fontSize: "1.3em" }}>Resumen de su pedido</span>
        <div className="paypal-columns">
          <span>Descripciones</span>
          <span>Importe</span>
        </div>
        <div className="paypal-products">{props.products}</div>
        <div className="paypal-total">
          <span>Importe total a pagar</span>
          <span className="total">
            €{JSON.parse(localStorage.getItem("cartPrice"))}
          </span>
        </div>
        <div className="paypal-buttons">
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

export default NavigateHook(PaypalResume);
