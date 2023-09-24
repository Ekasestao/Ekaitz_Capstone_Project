import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement("#root"); // O pasar como prop al objeto: appElement={document.getElementById("root") || undefined}

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
        height: "400px",
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
        />
      </ReactModal>
    );
  }
}

export default BlogModal;
