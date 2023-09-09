import React, { Component } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

import Producto from "../Products/producto";

class Productos extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: [],
    };
  }

  getProducts() {
    axios
      .get("http://ekasestao.pythonanywhere.com/products")
      .then((response) => {
        this.setState({
          data: response.data.products,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log("getProducts Productos Error", error);
      });
  }

  products() {
    return this.state.data.map((product) => {
      return <Producto key={product.products_id} product={product} />;
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="content-wrapper">
          <span>Cargando</span>
          <FaSpinner className="loading-icon" />
        </div>
      );
    }

    return <div className="content-wrapper">{this.products()}</div>;
  }
}

export default Productos;
