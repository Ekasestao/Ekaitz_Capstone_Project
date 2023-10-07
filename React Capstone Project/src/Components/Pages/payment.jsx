import React from "react";

import PaypalPayment from "../PayPal/paypal-payment";
import CreditCardPayment from "../CreditCard/credit-card-payment";

function Payment(props) {
  const Products = props.cartItems.map((product) => {
    return (
      <div className="product" key={product.products_id}>
        <div className="product-description">
          <div className="product-name">{product.products_name}</div>
          <div className="product-id">
            Número de artículo: {product.products_id}
          </div>
          <div className="product-price">
            Precio del artículo: €{product.products_price}
          </div>
          <div className="product-quantity">Cantidad: 1</div>
        </div>
        <div className="product-amount">€{product.products_price}</div>
      </div>
    );
  });

  return (
    <div className="content-wrapper">
      {JSON.parse(localStorage.getItem("paymentMethod")) === "paypal" ? (
        <PaypalPayment
          products={Products}
          deleteAllCart={props.deleteAllCart}
        />
      ) : (
        <CreditCardPayment
          products={Products}
          deleteAllCart={props.deleteAllCart}
        />
      )}
    </div>
  );
}

export default Payment;
