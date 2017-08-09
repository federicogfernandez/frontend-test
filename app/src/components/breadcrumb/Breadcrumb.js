import React, { Component } from 'react';

import './Breadcrumb.css';

function Categories(props) {
  let categories = props.categories;
  let categoriesElements = categories.map((category, i) => {
    if(i < categories.length-1) {
      return <li key={category}>{category}<span>></span></li>;
    }

    return <li key={category}>{category}</li>;
  });

  return <ul>{categoriesElements}</ul>;
}

class Breadcrumb extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="breadcrumb">
        <Categories categories={this.props.categories} />
      </div>
    )
  }
}

export default Breadcrumb;