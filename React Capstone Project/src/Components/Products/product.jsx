import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Product(props) {
  const {
    products_id,
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
          <Link to={`/products/${products_id}`}>
            <h3>{products_name}</h3>
          </Link>
        </div>

        <div className="product-description">{products_description}</div>

        <div className="product-price-cart">
          <div className="product-price">{products_price} €</div>

          <div className="product-cart">
            <Link className="add-cart">
              <FaShoppingCart /> Añadir al carro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
