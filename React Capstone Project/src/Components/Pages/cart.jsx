import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import ManageCart from "../Cart/manage-cart";

function Cart(props) {
  const officialPrice = props.cartItems
    .reduce((total, product) => {
      return total + product.products_price;
    }, 0)
    .toFixed(2);

  const discountPercentage = 0;

  const discountAmount = (officialPrice * discountPercentage) / 100;

  const totalPrice = officialPrice - discountAmount;

  localStorage.setItem("cartPrice", JSON.stringify(totalPrice));

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
              <div className="cart-products">{products}</div>
              <div className="cart-details">
                <div className="cart-price">
                  <div className="cart-oficial-price">
                    <span>Precio oficial</span>
                    <span>{officialPrice} €</span>
                  </div>
                  <div className="cart-discount">
                    <span>Descuento</span>
                    <span>{discountAmount} €</span>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>{totalPrice} €</span>
                  </div>
                </div>
                <div className="cart-button">
                  <button className="btn">
                    <Link to="/payment-details">
                      Realizar pago
                      <MdKeyboardArrowRight className="icon-arrow-right" />
                    </Link>
                  </button>
                </div>
                <span className="cart-choice">O</span>
                <div className="cart-link">
                  <Link to="/productos">
                    <MdKeyboardArrowLeft className="icon-arrow-left" />
                    Continuar comprando
                  </Link>
                </div>
              </div>
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
