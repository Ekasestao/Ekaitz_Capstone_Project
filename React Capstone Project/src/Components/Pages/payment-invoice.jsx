import React from "react";
import { Link } from "react-router-dom";

import navigateHook from "../Hooks/navigate";

function Invoice(props) {
  const invoiceObject = props.invoice;
  const fullName = `${invoiceObject.name} ${invoiceObject.lastname}`;
  return (
    <div className="content-wrapper">
      <div className="payment-invoice">
        {Object.keys(invoiceObject).length !== 0 ? (
          <div className="invoice-wrapper">
            <div className="invoice">
              <div className="invoice-top">
                <div className="invoice-id-date">
                  {invoiceObject.id ? (
                    <div className="invoice-id">
                      Nº Factura: {invoiceObject.id}
                    </div>
                  ) : null}

                  {invoiceObject.date ? (
                    <div className="invoice-date">
                      Fecha: {invoiceObject.date}
                    </div>
                  ) : null}
                </div>
              </div>

              {invoiceObject.name && invoiceObject.lastname ? (
                <div className="invoice-fullname">
                  Nombre Completo: {fullName}
                </div>
              ) : null}

              <div className="invoice-bottom">
                {props.invoice.products ? (
                  <div className="invoice-products">
                    Productos:
                    {props.invoice.products.map((product) => (
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

                {invoiceObject.total ? (
                  <div className="invoice-total">
                    <span>
                      Precio Total: {"  "}
                      {parseFloat(invoiceObject.total).toFixed(2)} €
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="invoice-button">
                <button className="btn" onClick={() => props.navigate("/")}>
                  Página principal
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-invoice">
            <h2>No se ha encontrado la factura</h2>
            <div className="invoice-button">
              <Link to="/">Volver a la página principal</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default navigateHook(Invoice);
