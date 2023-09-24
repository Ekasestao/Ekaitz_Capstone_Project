import React, { Component } from "react";
import axios from "axios";

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      img_url: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    axios
      .post(
        "https://eka.devcamp.space/portfolio/portfolio_blogs",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        this.props.handleSuccessfullFormSubmission(response.data);

        this.setState({
          title: "",
          content: "",
          img_url: "",
        });
      })
      .catch((error) => {
        console.log("blog handleSubmit error", error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            placeholder="Blog title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>

        <textarea
          name="content"
          placeholder="Content"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <button type="submit" className="btn">
          Save
        </button>
      </form>
    );
  }
}

export default BlogForm;
