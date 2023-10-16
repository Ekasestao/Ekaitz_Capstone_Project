import React, { Component } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

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
        `https://ekasestao.pythonanywhere.com/products/${this.props.slug_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          product: response.data,
          isLoading: false,
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
    return (
      <div className="content-wrapper">
        <div className="product-detail">
          {this.state.isLoading ? (
            <div className="content-loader">
              <span>
                Cargando <FaSpinner className="loading-icon" />
              </span>
              <span>Si tarda mucho, pruebe a refrescar la página.</span>
            </div>
          ) : (
            <div className="product-wrapper">
              <Product
                key={this.state.product.products_id}
                product={this.state.product}
                addCart={this.props.addCart}
                deleteCart={this.props.deleteCart}
                cartItems={this.props.cartItems}
                loggedInStatus={this.props.loggedInStatus}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default slugIdHook(ProductDetail);
