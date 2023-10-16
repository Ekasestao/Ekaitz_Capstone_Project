import React, { Component } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

class ManageCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productInCart: "Añadir al carro",
      className: "add-cart",
    };

    this.manageCart = this.manageCart.bind(this);
  }

  productInCart() {
    const index = this.props.cartItems.findIndex(
      (key) => key.products_name === this.props.product.products_name
    );
    if (index > -1) {
      this.setState({
        productInCart: "Eliminar del carro",
        className: "delete-cart",
        icon: "FaTrashAlt",
      });
    } else {
      this.setState({
        productInCart: "Añadir al carro",
        className: "add-cart",
      });
    }
  }

  manageCart() {
    if (this.state.productInCart === "Eliminar del carro") {
      this.props.deleteCart(this.props.product);
      this.setState({
        productInCart: "Añadir al carro",
        className: "add-cart",
      });
    }
    if (this.state.productInCart === "Añadir al carro") {
      this.props.addCart(this.props.product);
      this.setState({
        productInCart: "Eliminar del carro",
        className: "delete-cart",
      });
    }
  }

  componentDidMount() {
    this.productInCart();
  }

  render() {
    return (
      <div className="product-cart">
        {this.props.loggedInStatus === "LOGGED_IN" ? (
          <Link className={`${this.state.className}`} onClick={this.manageCart}>
            <FaShoppingCart /> {this.state.productInCart}
          </Link>
        ) : (
          <Link to="/autenticación" className={`${this.state.className}`}>
            <FaShoppingCart /> {this.state.productInCart}
          </Link>
        )}
      </div>
    );
  }
}

export default ManageCart;
