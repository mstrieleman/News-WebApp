import React, { Component } from 'react';
// require('dotenv').config({ path: 'C:\Users\Mike\eleven\News-web-app\.env' });


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/// TODO: if (error) return console.warn(`ERROR(${error.code}): ${error.message}`);

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchText = formData.get('search')
    const temporaryRequest = 'https://jsonplaceholder.typicode.com/posts/1'
    //const request = `https://services.cnn.com/newsgraph/search/headline:${searchText}/section:/language:en/rows:10/start:0/lastPublishDate,desc?api_key=TEST`
    //not approved for api yet - fetch wont work until that happens
    fetch(temporaryRequest)
      .then(data => {
        console.log(data);
        return data.json()
      })
      .then(data => {
        console.log(data);
        this.setState({
          //temporary
          news: data
        })
      })
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search for news here..."
            name="search"
            id="search"
            ref="search"
          />
          <div>
            <button
              type="submit"
              name="standard"
            >
            Go!
            </button>
          </div>
      </form>
      </div>
    )
  }
}
