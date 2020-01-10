import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
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
      <main>
        <h1>StockTwits Search</h1>
        <form className='main_form'>
          <TextField id="outlined-basic" label="Enter Stock Abbrv" variant="outlined" type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}></TextField>
          <Button variant="contained" color="primary" 
            type="submit"
            onClick={e => this.fetchStockMentions(e)}
          > Submit
          </Button>
        </form>
        {this.state.searchResults && <div>{this.state.searchResults.messages.map(message => <Paper variant="outlined" square >{message.body}</Paper>)}</div>}
      </main>
    );
  }
}

export default App;
