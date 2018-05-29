const dotenv = require('dotenv').config()
import React, { Component } from "react";

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
    const search = formData.get("search");
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
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const newsTitles = this.state.news.map(element => {
      return <li key={element.title} >{element.title}</li>
    })
    return (
      <div className="cover-container d-flex w-100 h-100 p-1 mx-auto flex-column text-center">
        <header className="masthead mb-auto">
          <h1 className="cover-heading">Search for news titles below!...</h1>
          <p className="lead">More to be added to this page soon!..</p>
          <div className="inner">
            <nav className="nav nav-masthead justify-content-center">
              <form onSubmit={this.handleSubmit} className="nav">
                <input
                  type="text"
                  placeholder="Search for news here..."
                  name="search"
                  id="search"
                  ref="search"
                  className="text-center"
                />
                <div>
                  <button type="submit" name="standard" className="btn btn-lg btn-secondary">
                    Go
                  </button>
                </div>
              </form>
            </nav>
          </div>
        </header>
        <main role="main" className="inner cover">
          <p className="lead">
          </p>
          <ul>{newsTitles}</ul>
        </main>
        <footer className="mastfoot mt-auto" />
        <a href="https://newsapi.org/">Powered by News API</a>
      </div>
    );
  }
}
