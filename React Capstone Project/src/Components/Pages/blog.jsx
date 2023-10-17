import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import BlogItem from "../Blog/blog-item";
import BlogModal from "../Blog/blog-modal";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 1,
      isLoading: true,
      blogModalIsOpen: false,
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfullNewBlogSubmission =
      this.handleSuccessfullNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(blog) {
    axios
      .delete(`https://ekasestao.pythonanywhere.com/blog/${blog.blogs_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          blogItems: this.state.blogItems.filter((item) => {
            return item.blogs_id !== blog.blogs_id;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  handleSuccessfullNewBlogSubmission(blog) {
    this.setState({
      blogItems: [blog].concat(this.state.blogItems),
      blogModalIsOpen: false,
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false,
    });

    document.body.style.overflow = "unset";
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true,
    });

    document.body.style.overflow = "hidden";
  }

  onScroll() {
    if (
      this.state.isLoading ||
      this.state.blogItems.length === this.state.totalCount
    ) {
      return;
    }

    const windowHeight =
      "ontouchstart" in window
        ? window.innerHeight
        : document.documentElement.clientHeight;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop =
      "ontouchstart" in window
        ? window.scrollY
        : document.documentElement.scrollTop || document.body.scrollTop;

    if (documentHeight - (windowHeight + scrollTop) < 100) {
      this.getBlogItems();
    }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });

    axios
      .get(
        `https://ekasestao.pythonanywhere.com/blog?page=${this.state.currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.blogs),
          totalCount: response.data.total,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }

  componentDidMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return (
        <BlogItem
          key={blogItem.blogs_id}
          blogItem={blogItem}
          handleDelete={this.handleDeleteClick}
        />
      );
    });

    return (
      <div className="content-wrapper">
        <div className="blog-wrapper">
          <BlogModal
            handleSuccessfullNewBlogSubmission={
              this.handleSuccessfullNewBlogSubmission
            }
            handleModalClose={this.handleModalClose}
            modalIsOpen={this.state.blogModalIsOpen}
          />

          <div className="new-blog-link">
            {this.props.loggedInStatus === "LOGGED_IN" ? (
              <a onClick={this.handleNewBlogClick}>Crear nuevo blog</a>
            ) : null}
          </div>

          {blogRecords.length === 0 && this.state.isLoading === false ? (
            <div className="no-blog-wrapper">
              <span>No hay blogs</span>
            </div>
          ) : (
            <div className="blogs">{blogRecords}</div>
          )}

          {this.state.isLoading ? (
            <div className="content-loader">
              <span>
                Cargando <FaSpinner className="loading-icon" />
              </span>
              <span>Si tarda mucho, pruebe a refrescar la página.</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Blog;
