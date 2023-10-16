import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const BlogItem = (props) => {
  const { blogs_id, blogs_title, blogs_content } = props.blogItem;

  return (
    <div className="blog">
      <Link to={`/blog/${blogs_id}`}>
        <h1>{blogs_title}</h1>
      </Link>
      <div className="blog-content">
        {blogs_content}
        {JSON.parse(localStorage.getItem("user")).admin === true ? (
          <div className="delete-blog">
            <FaTrashAlt onClick={() => props.handleDelete(props.blogItem)} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BlogItem;
