import React, { Component } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

import Product from "../Products/product";

class Products extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      totalCount: 0,
      currentPage: 1,
      isLoading: true,
      order: "name",
      direction: "asc",
    };

    this.order = this.order.bind(this);
    this.direction = this.direction.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
  }

  order(event) {
    localStorage.setItem("order", JSON.stringify(event.target.value));
    this.setState({
      order: JSON.parse(localStorage.getItem("order")),
    });
    window.location.reload();
  }

  direction(event) {
    localStorage.setItem("direction", JSON.stringify(event.target.value));
    this.setState({
      direction: JSON.parse(localStorage.getItem("direction")),
    });
    window.location.reload();
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
      isLoading: true,
    });

    axios
      .get(
        `http://ekasestao.pythonanywhere.com/products?order_by=${JSON.parse(
          localStorage.getItem("order")
        )}&direction=${JSON.parse(localStorage.getItem("direction"))}&page=${
          this.state.currentPage
        }`,
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
    this.setState({
      order: JSON.parse(localStorage.getItem("order")),
      direction: JSON.parse(localStorage.getItem("direction")),
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const products = this.state.data.map((product) => {
      return <Product key={product.products_id} product={product} />;
    });

    return (
      <div className="content-wrapper">
        <div className="selects-wrapper">
          <select
            name="order"
            value={this.state.order}
            onChange={this.order}
            className="select-order"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>

          <select
            name="direction"
            value={this.state.direction}
            onChange={this.direction}
            className="select-direction"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div className="products-wrapper">
          {products}

          {this.state.isLoading ? (
            <div className="content-loader">
              <span>
                Cargando <FaSpinner className="loading-icon" />
              </span>
              <span>Si tarda mucho, pruebe a refrescar la página.</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Products;
