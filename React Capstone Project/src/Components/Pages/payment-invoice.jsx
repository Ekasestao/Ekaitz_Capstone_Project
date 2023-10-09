import React, { Component } from "react";

import NavigateHook from "../Hooks/navigate";

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      lastname: "",
      products: [],
      total: "",
      date: "",
    };
  }

  render() {
    const invoiceObject = this.props.invoice;
    const fullName = `${invoiceObject.name} ${invoiceObject.lastname}`;
    return (
      <div className="content-wrapper">
        <div className="payment-invoice">
          <div className="invoice-wrapper">
            <div className="invoice">
              <div className="invoice-top">
                <div className="invoice-id">Nº Factura: {invoiceObject.id}</div>
                <div className="invoice-date">Fecha: {invoiceObject.date}</div>
              </div>
              <div className="invoice-fullname">
                Nombre Completo: {fullName}
              </div>
              <div className="invoice-bottom">
                {this.props.invoice.products ? (
                  <div className="invoice-products">
                    Productos:
                    {this.props.invoice.products.map((product) => (
                      <div
                        className="invoice-product"
                        key={product.products_id}
                      >
                        <span>Nº Producto: {product.products_id}</span>
                        <span>Nombre: {product.products_name}</span>
                        <span>Precio: {product.products_price} €</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="invoice-total">
                  Precio Total: {invoiceObject.total} €
                </div>
              </div>
              <div className="invoice-button">
                <button
                  className="btn"
                  onClick={() => this.props.navigate("/")}
                >
                  Volver a la página principal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigateHook(Invoice);
