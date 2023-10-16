import React, { Component } from "react";
import axios from "axios";

import ProductForm from "../Products/product-form";
import ProductList from "../Products/product-list";

class ProductManager extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      productToEdit: {},
      isLoading: true,
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearProductToEdit = this.clearProductToEdit.bind(this);
  }

  clearProductToEdit() {
    this.setState({
      productToEdit: {},
    });
  }

  handleEditClick(product) {
    this.setState({
      productToEdit: product,
    });
  }

  handleDeleteClick(product) {
    axios
      .delete(
        `https://ekasestao.pythonanywhere.com/products/${product.products_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          products: this.state.products.filter((item) => {
            return item.products_id !== product.products_id;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  handleEditFormSubmission() {
    this.getProducts();
  }

  handleNewFormSubmission(product) {
    this.setState({
      products: [product].concat(this.state.products),
    });
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError Error", error);
  }

  getProducts() {
    axios
      .get("https://ekasestao.pythonanywhere.com/products?direction=desc", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          products: [...response.data],
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getProducts ProductManager Error", error);
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="product-manager-wrapper">
          <div className="left-column">
            <ProductForm
              handleNewFormSubmission={this.handleNewFormSubmission}
              handleEditFormSubmission={this.handleEditFormSubmission}
              handleFormSubmissionError={this.handleFormSubmissionError}
              clearProductToEdit={this.clearProductToEdit}
              productToEdit={this.state.productToEdit}
            />
          </div>

          <div className="right-column">
            <ProductList
              handleDeleteClick={this.handleDeleteClick}
              data={this.state.products}
              handleEditClick={this.handleEditClick}
              isLoading={this.state.isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProductManager;
