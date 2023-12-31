import React from "react";
import { Link } from "react-router-dom";

import Paypal from "../../Images/Payment/paypal.png";
import CreditCard from "../../Images/Payment/tarjetadecredito.png";

function PaymentChoice() {
  return (
    <div className="content-wrapper">
      <div className="payment-choice">
        <h2>Seleccione un método de pago</h2>
        <div className="payment-options">
          <div className="payment-option">
            <Link
              className="paypal-option"
              to="/pago"
              onClick={() => {
                localStorage.setItem("paymentMethod", JSON.stringify("paypal"));
              }}
            >
              <img className="paypal" src={Paypal} alt="PayPal" />
              PayPal
            </Link>
          </div>

          <div className="payment-option">
            <Link
              className="credit-card-option"
              to="/pago"
              onClick={() => {
                localStorage.setItem(
                  "paymentMethod",
                  JSON.stringify("creditCard")
                );
              }}
            >
              <img
                className="credit-card"
                src={CreditCard}
                alt="Tarjeta de Crédito"
              />
              Tarjeta de Crédito
            </Link>
          </div>
        </div>

        <div className="payment-cancel">
          <button className="btn">
            <Link to="/carro">Cancelar Pago</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentChoice;
