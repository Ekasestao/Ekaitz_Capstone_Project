import React, { Component } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

import Producto from "../Products/producto";

class Productos extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      totalCount: 0,
      currentPage: 1,
      isLoading: true,
    };

    this.getProducts = this.getProducts.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
  }

  onScroll() {
    if (
      this.state.isLoading ||
      this.state.data.length === this.state.totalCount
    ) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getProducts();
    }
  }

  getProducts() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });

    axios
      .get(
        `http://ekasestao.pythonanywhere.com/products?order_by=name&direction=asc&page=${this.state.currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          data: this.state.data.concat(response.data.products),
          totalCount: response.data.total,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getProducts Error", error);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const products = this.state.data.map((product) => {
      return <Producto key={product.products_id} product={product} />;
    });

    return (
      <div className="content-wrapper">
        <select name="order" id="order">
          <option value="name asc">Name Asc</option>
          <option value="name desc">Name Desc</option>
          <option value="id asc">Id Asc</option>
          <option value="id desc">Id Desc</option>
        </select>

        {products}

        {this.state.isLoading ? (
          <div className="content-loader">
            <span>Cargando</span>
            <FaSpinner className="loading-icon" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Productos;
