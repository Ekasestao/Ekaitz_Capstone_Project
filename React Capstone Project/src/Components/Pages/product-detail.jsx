import React, { Component } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import slugIdHook from "../Hooks/slug-id";

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
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
        <div className="product-detail-wrapper">
          <div className="product-name">{products_name}</div>
          <div className="product-img">
            <img src={products_img_url} alt={products_name} />
          </div>
          <div className="product-description">{products_description}</div>
          <div className="product-price">{products_price}</div>

          <div className="product-cart">
            <Link className="add-cart">
              <FaShoppingCart /> Añadir al carro
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default slugIdHook(ProductDetail);
