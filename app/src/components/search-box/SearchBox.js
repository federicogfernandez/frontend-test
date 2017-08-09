import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './SearchBox.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.getQueryParam('search') || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getQueryParam(param) {
    let regex = new RegExp(`${param}=([\w\s]+)`);
    let query = this.props.location.search.match(regex);
    
    return query ? query[1] : query;
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/items?search=${this.state.search}`);
  }

  render() {
    return (
      <div className="search-box">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" value={this.state.search} placeholder="Nunca dejes de buscar" onChange={this.handleChange} />
          <input type="submit" value="" />
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBox);