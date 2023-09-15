import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function Product(props) {
  const {
    products_name,
    products_description,
    products_price,
    products_img_url,
  } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={products_img_url} alt={products_name} />
      </div>

      <div className="product-text">
        <div className="product-name">
          <h3>{products_name}</h3>
        </div>

        <div className="product-description">{products_description}</div>

        <div className="product-price-cart">
          <div className="product-price">{products_price} €</div>

          <div className="product-cart">
            <a className="add-cart">
              <FaShoppingCart /> Añadir al carro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
