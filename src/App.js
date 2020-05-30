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
  }

  changeShirtColor(color) {
    this.setState({ shirtColor: color });
  }

  getClasses() {
    var text = "text-align--";
    var shirt = "shirt-color--";

    var textAlign = text + this.state.textAlign;
    var shirtColor = shirt + this.state.shirtColor;
    var textColor = text;

    return [textAlign, shirtColor].join(" ");
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
    const shirtClasses = this.getClasses();
    return (
      <main>
        <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
          <label for="word-count">Word count:</label>
          <input id="word-count" type="number" />
          <input type="submit" />
        </form>
        <div className="shirt-color-options">
          <button
            className="color-btn color-btn--white"
            onClick={() => this.changeShirtColor("white")}
          ></button>
          <button
            className="color-btn color-btn--black "
            onClick={() => this.changeShirtColor("black")}
          ></button>
          <button
            className="color-btn color-btn--green"
            onClick={() => this.changeShirtColor("green")}
          ></button>
          <button
            className="color-btn color-btn--blue"
            onClick={() => this.changeShirtColor("blue")}
          ></button>
          <button
            className="color-btn color-btn--red"
            onClick={() => this.changeShirtColor("red")}
          ></button>
          <button
            className="color-btn color-btn--yellow"
            onClick={() => this.changeShirtColor("yellow")}
          ></button>
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
