import React from "react";
import { Link } from "react-router-dom";

import ManageCart from "../Cart/manage-cart";

function Cart(props) {
  const products = props.cartItems.map((product) => {
    return (
      <div className="product" key={product.products_id}>
        <div className="product-img">
          <img src={product.products_img_url} alt={product.products_name} />
        </div>
        <div className="product-text">
          <div className="product-name">
            <Link to={`/products/${product.products_id}`}>
              <h3>{product.products_name}</h3>
            </Link>
          </div>
          <div className="product-price">{product.products_price} €</div>
          <ManageCart
            product={product}
            deleteCart={props.deleteCart}
            cartItems={props.cartItems}
            loggedInStatus={props.loggedInStatus}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="content-wrapper">
      <div className="cart-wrapper">
        {props.loggedInStatus === "LOGGED_IN" ? (
          products.length > 0 ? (
            <div className="logged-cart-products">
              <div className="pay-button">
                <button className="btn">Realizar pago</button>
              </div>
              <div className="cart-products">{products}</div>
            </div>
          ) : (
            <div className="empty-cart">
              <span>
                El carro esta vacío,{" "}
                <Link to="/productos">añada un producto</Link>
              </span>
            </div>
          )
        ) : (
          <div className="not-logged-cart">
            <span>
              <Link to="/auth">Inicie sesión</Link> para añadir productos al
              carro
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
