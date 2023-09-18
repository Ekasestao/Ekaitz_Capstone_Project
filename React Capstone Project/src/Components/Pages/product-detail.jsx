import React, { Component } from "react";
import axios from "axios";

import Product from "../Products/product";
import slugIdHook from "../Hooks/slug-id";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      isLoading: true,
    };
  }

  getProduct() {
    axios
      .get(
        `http://ekasestao.pythonanywhere.com/products/${this.props.slug_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          product: response.data,
        });
      })
      .catch((error) => {
        console.log("getProduct Error", error);
      });
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const {
      products_name,
      products_description,
      products_price,
      products_img_url,
    } = this.state.product;

    return (
      <div className="content-wrapper">
        <div className="product-detail">
          <Product
            key={this.state.product.products_id}
            product={this.state.product}
            addCart={this.props.addCart}
            deleteCart={this.props.deleteCart}
            cartItems={this.props.cartItems}
          />
        </div>
      </div>
    );
  }
}

export default slugIdHook(ProductDetail);
