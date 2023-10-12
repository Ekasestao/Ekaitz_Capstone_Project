import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement("#root");

class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "550px",
        width: "700px",
        backgroundColor: "#1e1f26",
        border: "none",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    };

    this.handleSuccessfullFormSubmission =
      this.handleSuccessfullFormSubmission.bind(this);
  }

  handleSuccessfullFormSubmission(blog) {
    this.props.handleSuccessfullNewBlogSubmission(blog);
  }

  render() {
    window.innerWidth <= 850
      ? (this.customStyles.content.width = "400px")
      : (this.customStyles.content.width = "700px");

    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <BlogForm
          handleSuccessfullFormSubmission={this.handleSuccessfullFormSubmission}
          handleModalClose={this.props.handleModalClose}
        />
      </ReactModal>
    );
  }
}

export default BlogModal;
