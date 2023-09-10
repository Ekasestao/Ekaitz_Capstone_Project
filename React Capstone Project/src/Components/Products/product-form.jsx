import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { uploadFile } from "../../Firebase/config";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      price: "",
      img: "",
      editMode: false,
      apiUrl: "http://ekasestao.pythonanywhere.com/products",
      apiAction: "post",
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
      .delete("", { withCredentials: true })
      .then(() => {
        this.setState({
          img: "",
        });
      })
      .catch((error) => {
        console.log("DeleteImage Error", error);
      });
  }

  componentDidUpdate() {
    if (Object.keys(this.props.productToEdit).length > 0) {
      const { id, name, description, price, img } = this.props.productToEdit;

      this.props.clearProductToEdit();

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        price: price || "",
        editMode: true,
        apiUrl: `http://ekasestao.pythonanywhere.com/products/${id}`,
        apiAction: "patch",
        img: img || "",
      });
    }
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await uploadFile(this.state.img);

      await axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: {
          products_name: this.state.name,
          products_description: this.state.description,
          products_price: this.state.price,
          products_img_url: result,
        },
        withCredentials: true,
      })
        .then((response) => {
          if (this.state.editMode) {
            this.props.handleEditFormSubmission();
          } else {
            this.props.handleNewFormSubmission(response.data);
          }

          this.setState({
            name: "",
            description: "",
            price: "",
            img: "",
            img_url: "",
            editMode: false,
            apiUrl: "http://ekasestao.pythonanywhere.com/products",
            apiAction: "post",
          });

          this.imgRef.current.dropzone.removeAllFiles();
        })
        .catch((error) => {
          console.log("Product Form HandleSubmit Error", error);
        });
    } catch (error) {
      console.log("uploadFile Error", error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="product-form-wrapper">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={this.state.name}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="price"
          placeholder="Precio"
          value={this.state.price}
          onChange={this.handleChange}
        />

        <textarea
          type="text"
          name="description"
          placeholder="Descripción"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <div className="image-uploader">
          {this.state.img && this.state.editMode ? (
            <div className="product-manager-image-wrapper">
              <img src={this.state.img} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("img")}>Eliminar Archivo</a>
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

        <button className="btn" type="submit">
          Guardar
        </button>
      </form>
    );
  }
}

export default ProductForm;
