import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import SearchResultsList from './components/search-results-list/SearchResultsList';
import ItemDetail from './components/item-detail/ItemDetail';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route path="/items/:id" component={ItemDetail} exact={true} />
            <Route path="/items" component={SearchResultsList} exact={true} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
