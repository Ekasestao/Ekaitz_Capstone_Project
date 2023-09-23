import React from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const { blogs_id, blogs_title, blogs_content } = props.blogItem;

  return (
    <div className="blog">
      <Link to={`/blog/${blogs_id}`}>
        <h1>{blogs_title}</h1>
      </Link>
      <div>{blogs_content}</div>
    </div>
  );
};

export default BlogItem;
