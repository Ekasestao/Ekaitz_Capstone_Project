import React from "react";

function PaymentDetails() {
  return (
    <div className="content-wrapper">
      <div className="paypal">Paypal</div>
      <div className="credit-card">Tarjeta De Crédito</div>
      <div className="total-price">
        {JSON.parse(localStorage.getItem("cartPrice"))} €
      </div>
    </div>
  );
}

export default PaymentDetails;
