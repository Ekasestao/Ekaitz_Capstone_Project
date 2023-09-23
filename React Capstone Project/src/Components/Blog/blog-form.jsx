import React from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const { id, title, content } = props.blogItem;

  return (
    <div>
      <Link to={`/blogs/${id}`}>
        <h1>{title}</h1>
      </Link>
      <div>{content}</div>
    </div>
  );
};

export default BlogItem;
