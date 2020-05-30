import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedShirts: [],
      text: " ",
      textAlign: "right",
      shirtColor: "",
      textColor: "",
      shirtFont: "",
    };

    this.colorList = ["white", "black", "green", "blue", "red", "yellow"];
  }

  changeColorOf(thing, color) {
    thing == "shirt"
      ? this.setState({ shirtColor: color })
      : this.setState({ textColor: color });
  }

  getClasses() {
    var textAlign = "text-align--";
    var textColor = "text-color--";
    var shirt = "shirt-color--";

    var newTextAlign = textAlign + this.state.textAlign;
    var shirtColor = shirt + this.state.shirtColor;
    var newTextColor = textColor + this.state.textColor;

    return [newTextAlign, shirtColor, newTextColor].join(" ");
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

  renderColorButton(thing, color) {
    return (
      <button
        className={`color-btn color-btn--${color}`}
        onClick={() => this.changeColorOf(thing, color)}
      ></button>
    );
  }

  render() {
    const shirtClasses = this.getClasses();
    return (
      <main>
        <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
          <label for="word-count">Word count:</label>
          <input id="word-count" type="number" />
          <input type="submit" />
        </form>
        <div className="color-options">
          <span>Shirt color:</span>
          {this.colorList.map((color) => {
            return this.renderColorButton("shirt", color);
          })}
        </div>
        <div className="text-color-options">
          {this.colorList.map((color) => {
            return this.renderColorButton("text", color);
          })}
        </div>
        <div className={`tshirt-container shirt-color--white ${shirtClasses}`}>
          <div className="tshirt">
            <p>{this.state.text}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
