import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBar: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(value) {
    axios
      .get("https://ekasestao.pythonanywhere.com/products/search", {
        withCredentials: true,
      })
      .then((response) => {
        const results = response.data.filter((product) => {
          return (
            value &&
            product &&
            product.products_name.toLowerCase().includes(value)
          );
        });
        this.props.setResults(results);
      })
      .catch((error) => {
        console.log("fetchData Error", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.fetchData(event.target.value.toLowerCase());
  }

  render() {
    return (
      <div className="search-bar">
        <div className="search-icon">
          <FaSearch />
        </div>

        <input
          type="text"
          name="searchBar"
          placeholder="Buscar..."
          autoComplete="off"
          value={this.state.searchBar}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
