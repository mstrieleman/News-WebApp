import React, { Component } from 'react';
const dotenv = require('dotenv').config();

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      breaking: false,
      country: 'all'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newsType = this.newsType.bind(this);
    this.country = this.country.bind(this);
    this.breakingNews = this.breakingNews.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');
    // TODO: Revise this to use a function;
    let newsType;
    let url = null;
    if (this.state.breaking === false) {
      newsType = 'everything?';
      url =
        'https://newsapi.org/v2/' +
        `${newsType}` +
        `q=${search}&` +
        'sortBy=popularity&' +
        `apiKey=${API}`;
    }
    else {
      newsType = 'top-headlines?';
      if (this.state.country !== 'all') {
        url =
          'https://newsapi.org/v2/' +
          `${newsType}` +
          `country=${this.state.country}&` +
          `q=${search}&` +
          `apiKey=${API}`;
      }
      else {
        url =
          'https://newsapi.org/v2/' +
          `${newsType}` +
          `q=${search}&` +
          `apiKey=${API}`;
      }
    }

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
    }
  }

  country(event) {
    this.setState({
      country: event.target.value
    });
  }

  breakingNews() {
    if (this.state.breaking === false) {
      return (
        <div>
          <p className="mt-2 text-center">
            <input
              type="checkbox"
              className="mr-2 mt-3"
              onClick={this.newsType}
            />Breaking news
          </p>
        </div>
      );
    }
    else {
      return (
        <div>
          <p className="mt-2 text-center">
            <input
              type="checkbox"
              className="mr-2 mt-3"
              onClick={this.newsType}
            />Breaking news
          </p>
          <select
            type="select"
            className="custom-select-sm btn btn-sm"
            onChange={this.country}
          >
            <option value="all">All Countries</option>
            <option value="us">United States - US</option>
            <option value="au">Australia - AU</option>
            <option value="be">Belgium - BE</option>
            <option value="cn">China - CN</option>
            <option value="il">Israel - IL</option>
            <option value="jp">Japan - JP</option>
            <option value="kr">Korea - KR</option>
            <option value="mx">Mexico - MX</option>
            <option value="ph">Philippines - PH</option>
            <option value="ru">Russia - RU</option>
            <option value="se">Sweden - SE</option>
            <option value="za">South Africa - ZA</option>
          </select>
        </div>
      );
    }
  }

  render() {
    const newsTitles = this.state.news.map(element => {
      return (
        <div key={element.title}>
          <div className="card border-dark mb-3">
            <div className="card-body">
              <h5 className="card-header">{element.title}</h5>
              <p className="card-text mt-3">{element.description}</p>
              <a href={element.url} className="btn btn-primary">
                View Article
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="cover-container d-flex h-100 p-1 mx-auto flex-column text-center">
        <header className="masthead mb-auto">
          <h1 className="cover-heading mt-3">News Searcher</h1>
          <h5 className="mb-3">
            Search for news articles from all around the globe!
          </h5>
          <div className="inner">
            <nav className="nav nav-masthead justify-content-center">
              <form onSubmit={this.handleSubmit} className="nav">
                <input
                  type="text"
                  placeholder="Search for news here..."
                  name="search"
                  id="search"
                  className="text-center"
                />
                <div>
                  <button
                    type="submit"
                    name="standard"
                    className="btn btn-primary btn-lg active"
                  >
                    Go
                  </button>
                </div>
              </form>
            </nav>
            {this.breakingNews()}
          </div>
        </header>
        <main role="main" className="inner cover mt-3">
          <p className="lead" />
          {newsTitles}
        </main>
        <footer className="mastfoot mt-auto" />
        <a href="https://newsapi.org/">Powered by News API</a>
      </div>
    );
  }
}
