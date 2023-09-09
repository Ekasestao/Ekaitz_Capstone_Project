import React from "react";

function Producto(props) {
  const { products_name, products_description, products_img_url } =
    props.product;
  return (
    <div className="producto">
      <div className="product-img">
        <img src={products_img_url} alt={products_name} />
      </div>

      <div className="product-text">
        <div className="product-name">{products_name}</div>

        <div className="product-description">{products_description}</div>
      </div>
    </div>
  );
}

export default Producto;
