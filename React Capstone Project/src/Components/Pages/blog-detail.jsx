import React, { Component } from "react";
import axios from "axios";

import slugIdHook from "../Hooks/slug-id";

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogItem: {},
    };
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
        </div>
      </div>
    );
  }
}

export default slugIdHook(BlogDetail);
