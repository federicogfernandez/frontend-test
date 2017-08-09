import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SearchResultsItem from '../search-results-item/SearchResultsItem';
import Breadcrumb from '../breadcrumb/Breadcrumb';

import './SearchResultsList.css';

const maxResults = 4;

function ResultsList(props) {
  const items = props.items;
  const listItems = items.slice(0, maxResults).map((item) =>
    <SearchResultsItem key={item.id} data={item} />
  );

  return <ul>{listItems}</ul>;
}

class SearchResultsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.getResults()
      .then((response) => {
        this.setState({
          items: response.items,
          categories: response.categories
        });
      })
      .catch((e) => {
        console.log('error fetching results', e);
      });
  }

  getResults() {
    let search = decodeURIComponent(this.props.location.search);
    let q = search.match(/search=([\w\s]+)/)[1];
    
    return fetch(`/api/items?q=${q}`).then((response) => response.json());
  }

  render() {
    return (
      <div>
        <Breadcrumb categories={this.state.categories} />
        <div className="search-results-list">
          <ResultsList items={this.state.items} />
        </div>
      </div>
    )
  }
}

export default withRouter(SearchResultsList);