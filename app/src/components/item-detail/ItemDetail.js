import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Breadcrumb from '../breadcrumb/Breadcrumb';

import './ItemDetail.css';

class ItemDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      categories: []
    };
  }

  componentDidMount() {
    this.getProduct()
      .then((response) => {
        this.setState({
          item: response.item,
          categories: response.categories
        });
      })
      .catch(() => {
        console.log('error fetching results');
      });
  }

  getProduct() {
    return fetch(`/api/items/${this.props.match.params.id}`).then((response) => response.json());
  }

  render() {
    if(this.state.item.id) {
      return (
        <div>
          <Breadcrumb categories={this.state.categories} />
          <div className="item-detail">
            <div className="item-detail__image">
              <img src={this.state.item.picture} alt={this.state.item.title} />
            </div>
            <div className="item-detail__content">
              <span className="sold-quantity">
                {this.state.item.condition === 'new' ? 'Nuevo' : 'Usado'} - {this.state.item.soldQuantity} vendidos
              </span>
              <h1>{this.state.item.title}</h1>
              <span className="price">$ {this.state.item.price.amount}</span>
              <button>Comprar</button>
            </div>
            <div className="item-detail__description">
              <h3>Descripción del Producto</h3>
              <p>{this.state.item.description || 'Sin Descripción en texto plano.'}</p>
            </div>
          </div>
        </div>
      )
    }

    return <div className="item-detail"></div>;
  }
}

export default withRouter(ItemDetail);