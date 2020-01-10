import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchQuery: "",
      searchResults: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };
  clearInput = () => this.setState({ searchQuery: "" });

  fetchStockMentions = e => {
    e.preventDefault();
    fetch(
      `https://api.stocktwits.com/api/2/streams/symbols.json?access_token=a03893760cf2ec2d19cd2b665239ef0a1cbd2780&symbols=${this.state.searchQuery}`
    )
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ searchResults: myJson }, () => {
          console.log(this.state);
        });
      });
  };
  render() {
    return (
      <>
        <form>
          <input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          ></input>
          <input
            type="submit"
            onClick={e => this.fetchStockMentions(e)}
          ></input>
        </form>
        {this.state.searchResults && <div>{this.state.searchResults.messages.map(message => <div>{message.body}</div>)}</div>}
      </>
    );
  }
}

export default App;
