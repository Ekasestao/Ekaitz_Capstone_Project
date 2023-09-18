import React from "react";

import Product from "../Products/product";

function Carro(props) {
  const products = props.cartItems.map((product) => {
    return (
      <Product
        key={product.products_id}
        product={product}
        addCart={props.addCart}
        deleteCart={props.deleteCart}
        cartItems={props.cartItems}
      />
    );
  });

  return (
    <div className="content-wrapper">
      {products.length > 0 ? products : "La cesta esta vacía"}
    </div>
  );
}

export default Carro;
