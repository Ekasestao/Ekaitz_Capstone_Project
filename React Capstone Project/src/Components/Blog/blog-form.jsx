import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { uploadFile } from "../../Firebase/config";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      img: "",
      img_url:
        "https://firebasestorage.googleapis.com/v0/b/capstone-project-react-fd52b.appspot.com/o/no-photo.png?alt=media&token=0a408421-4e47-4d8b-8ab4-3b4ce112692f",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImgDrop = this.handleImgDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.imgRef = React.createRef();
  }

  deleteImage() {
    axios
      .delete(`http://ekasestao.pythonanywhere.com/blog/img/${this.state.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.setState({
          img_url: "",
        });
      })
      .catch((error) => {
        console.log("DeleteImage Error", error);
      });
  }

  handleImgDrop() {
    return {
      addedfile: (file) => this.setState({ img: file }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "http://ekasestao.pythonanywhere.com/dropzone",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let img_url = this.state.img_url;

      if (this.state.img != "") {
        const result = await uploadFile(this.state.img);
        img_url = result;
      } else if (this.state.img_url == "") {
        img_url =
          "https://firebasestorage.googleapis.com/v0/b/capstone-project-react-fd52b.appspot.com/o/no-photo.png?alt=media&token=0a408421-4e47-4d8b-8ab4-3b4ce112692f";
      }

      await axios
        .post(
          "http://ekasestao.pythonanywhere.com/blog",
          {
            blogs_title: this.state.title,
            blogs_content: this.state.content,
            blogs_img_url: img_url,
          },
          { withCredentials: true }
        )
        .then((response) => {
          this.props.handleSuccessfullFormSubmission(response.data);
          this.props.handleModalClose();

          this.setState({
            title: "",
            content: "",
            img: "",
            img_url:
              "https://firebasestorage.googleapis.com/v0/b/capstone-project-react-fd52b.appspot.com/o/no-photo.png?alt=media&token=0a408421-4e47-4d8b-8ab4-3b4ce112692f",
          });

          window.location.reload();
        })
        .catch((error) => {
          console.log("blog handleSubmit error", error);
        });
    } catch (error) {
      console.log("uploadFile Error", error);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={this.state.title}
          onChange={this.handleChange}
          maxLength="50"
        />

        <textarea
          name="content"
          placeholder="Contenido"
          value={this.state.content}
          onChange={this.handleChange}
          maxLength="500"
        />

        <div className="image-uploader">
          {this.state.img_url && this.state.editMode ? (
            <div className="product-manager-image-wrapper">
              <img src={this.state.img_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage()}>Eliminar Archivo</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.imgRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleImgDrop()}
            >
              <div className="dz-message">Imagen</div>
            </DropzoneComponent>
          )}
        </div>

        <button type="submit" className="btn">
          Crear Blog
        </button>
      </form>
    );
  }
}

export default BlogForm;
