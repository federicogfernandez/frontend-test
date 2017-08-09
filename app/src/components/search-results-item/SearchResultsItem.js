import React, { Component } from 'react';

import './SearchResultsItem.css';

class SearchResultsItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    return (
      <li className="search-results-item">
        <div className="search-results-item__image">
          <a href={`/items/${this.state.data.id}`}>
            <img src={this.state.data.picture} alt={this.state.data.title} />
          </a>
        </div>
        <div className="search-results-item__content">
          <div className="price-container">
            <span className="price-container__amount">$ {this.state.data.price.amount}</span>
            {this.state.data.free_shipping && <span className="price-container__free-shipping"></span>}
          </div>
          <p><a href={`/items/${this.state.data.id}`}>{this.state.data.title}</a></p>
        </div>
        <div className="search-results-item__spacer"></div>
        <div className="search-results-item__address">
          <address>{this.state.data.address}</address>
        </div>
      </li>
    )
  }
}

export default SearchResultsItem;