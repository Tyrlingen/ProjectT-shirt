import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: " ",
      savedShirts: [],
      currentShirtColor: "",
      currentTextColor: "",
      currentShirtFont: "",
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

  render() {
    return (
      <main>
        <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
          <label for="word-count">Word count:</label>
          <input id="word-count" type="number" />
          <input type="submit" />
        </form>
        <div className="tshirt-container text--center">
          <div className="tshirt">
            <p>{this.state.text}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
