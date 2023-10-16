import React, { Component } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

import slugIdHook from "../Hooks/slug-id";
import navigateHook from "../Hooks/navigate";

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogItem: {},
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(blog) {
    axios
      .delete(`http://ekasestao.pythonanywhere.com/blog/${blog.blogs_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.props.navigate("/blog");

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  getBlogItem() {
    axios
      .get(`http://ekasestao.pythonanywhere.com/blog/${this.props.slug_id}`)
      .then((response) => {
        this.setState({
          blogItem: response.data,
        });
      })
      .catch((error) => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const { blogs_title, blogs_content, blogs_img_url } = this.state.blogItem;

    return (
      <div className="content-wrapper">
        <div className="blog-detail-wrapper">
          <h1>{blogs_title}</h1>

          <div className="img-wrapper">
            <img src={blogs_img_url} alt={blogs_title} />
          </div>

          <div className="content">{blogs_content}</div>

          {JSON.parse(localStorage.getItem("user")).admin === true ? (
            <div className="delete-blog">
              <FaTrashAlt
                onClick={() => this.handleDeleteClick(this.state.blogItem)}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default navigateHook(slugIdHook(BlogDetail));
