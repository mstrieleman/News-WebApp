import React, { Component } from 'react';
const dotenv = require('dotenv').config()

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');
    const url = 'https://newsapi.org/v2/everything?' +
          `q=${search}&` +
          'from=2018-05-29&' +
          'sortBy=popularity&' +
          `apiKey=${API}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          news: response.articles
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.news);
    const newsTitles = this.state.news.map(element => {
      return (
        <div key={element.title}>
          <div className="card border-dark mb-3">
            <div className="card-body">
              <h5 className="card-header">{element.title}</h5>
              <p className="card-text mt-3">{element.description}</p>
              <a href={element.url} className="btn btn-primary">View Article</a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="cover-container d-flex w-100 h-100 p-1 mx-auto flex-column text-center">
        <header className="masthead mb-auto">
          <h1 className="cover-heading mt-3">News Searcher</h1>
          <h5>Search for news articles from all around the globe!</h5>
          <div className="inner">
            <nav className="nav nav-masthead justify-content-center">
              <form onSubmit={this.handleSubmit} className="nav">
                <input
                  type="text"
                  placeholder="Search for news here..."
                  name="search"
                  id="search"
                  className="text-center mt-3"
                />
                <div>
                  <button type="submit" name="standard" className="btn btn-lg btn-secondary mt-3 ml-2">
                    Go
                  </button>
                </div>
              </form>
            </nav>
          </div>
        </header>
        <main role="main" className="inner cover mt-3">
          <p className="lead"/>
          {newsTitles}
        </main>
        <footer className="mastfoot mt-auto" />
        <a href="https://newsapi.org/">Powered by News API</a>
      </div>
    );
  }
}
