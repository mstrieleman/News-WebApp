import React, { Component } from 'react';
// const dotenv = require('dotenv').config()
const API = 'beb27522e5274d76b336ab8d88ebf31f';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      breaking: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newsType = this.newsType.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');
    let newsType = '';
    if (this.state.breaking === true) {
      newsType = 'everything?';
    }
    else {
      newsType = 'top-headlines?';
    }
    let url = 'https://newsapi.org/v2/' +
        `${newsType}` +
        `q=${search}&` +
        'from=2018-05-29&' +
        'sortBy=popularity&' +
        `apiKey=${API}`;

    console.log(this.state.breaking);
    console.log(newsType);

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

  newsType() {
    if (this.state.breaking === true) {
      this.setState({
        breaking: false
      });
    }
    else if (this.state.breaking === false) {
      this.setState({
        breaking: true
      });
    };
  };

  render() {
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
                <div>
                </div>
              </form>
            </nav>
            <div className="flex-column">
              <p className="mt-2 text-center"><input type="checkbox" className="mr-2" onClick={this.newsType}/>Breaking news only</p>
            </div>
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
