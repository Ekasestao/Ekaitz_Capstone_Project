import React from "react";

import NavigateHook from "../Hooks/navigate";

function PaypalResume(props) {
  const cancelPayment = () => {
    event.preventDefault();
    props.navigate("/carro");
  };

  const acceptPayment = () => {
    props.navigate("/invoice");
    props.changePage();
  };

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
      <div className="paypal-resume">
        <div className="order-resume">
          <span style={{ fontSize: "1.3em" }}>Resumen de su pedido</span>
          <div className="paypal-columns">
            <span>Descripciones</span>
            <span>Importe</span>
          </div>
          <div className="paypal-products">{Products}</div>
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
    </div>
  );
}

export default NavigateHook(PaypalResume);
