import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: " ",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputField = document.querySelector("#word-count");
    const number = inputField.value;
    fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const text = data.join(" ");
        this.setState({ text: text });
      });
  }
  handleKeyPress(event) {
    if (event.which === 13) {
      const inputField = document.querySelector("#word-count");
      const number = inputField.value;
      this.wordGetter(number);
    }
  }
  handleClick() {
    const inputField = document.querySelector("#word-count");
    const number = inputField.value;
    this.wordGetter(number);
  }
  wordGetter(number) {
    fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const text = data.join(" ");
        this.setState({ text: text });
      });
  }

  render() {
    return (
      <main>
        <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
          <label for="word-count">Word count:</label>
          <input id="word-count" type="number" />
          <input type="submit" />
        </form>
        <div className="tshirt-container">
          <p>{this.state.text}</p>
        </div>
      </main>
    );
  }
}

export default App;
