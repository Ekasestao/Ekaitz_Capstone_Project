import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function ProductList(props) {
  const productList = props.data.map((product) => {
    return (
      <div key={product.products_id} className="product-thumb">
        <div className="product-thumb-img">
          <img src={product.thumb_img} />
        </div>

        <div className="text-content">
          <div className="title">{product.products_name}</div>

          <div className="actions">
            <a
              className="edit-icon"
              onClick={() => props.handleEditClick(product)}
            >
              <FaEdit />
            </a>

            <a
              className="delete-icon"
              onClick={() => props.handleDeleteClick(product)}
            >
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div className="product-list-wrapper">{productList}</div>;
}

export default ProductList;