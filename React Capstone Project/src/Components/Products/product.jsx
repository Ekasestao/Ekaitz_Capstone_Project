import React, { Component } from "react";
import { Link } from "react-router-dom";

import Cart from "../Cart/cart";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      products_id,
      products_name,
      products_description,
      products_price,
      products_img_url,
    } = this.props.product;

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

            <Cart
              product={this.props.product}
              addCart={this.props.addCart}
              deleteCart={this.props.deleteCart}
              cartItems={this.props.cartItems}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
