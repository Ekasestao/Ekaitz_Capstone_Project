import React from "react";
import { Link } from "react-router-dom";

import Cart from "../Cart/cart";

function Carro(props) {
  const products = props.cartItems.map((product) => {
    return (
      <div className="product" key={product.products_id}>
        <div className="product-image">
          <img src={product.products_img_url} alt={product.products_name} />
        </div>
        <div className="product-name">{product.products_name}</div>
        <div className="product-price">{product.products_price} €</div>
        <Cart
          product={product}
          deleteCart={props.deleteCart}
          cartItems={props.cartItems}
        />
      </div>
    );
  });

  return (
    <div className="content-wrapper">
      <div className="cart-wrapper">
        {products.length > 0 ? (
          <div className="cart-products">
            <button>Realizar pago</button>
            {products}
          </div>
        ) : (
          <div className="empty-cart">
            <span>
              La cesta esta vacía,{" "}
              <Link to="/productos">añada un producto</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carro;
