import React, { Component } from "react";
import "./App.scss";

class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Generate me!",
      textAlign: "center",
      shirtColor: "white",
      textColor: "black",
      shirtFont: "",
    };

    this.colorList = ["white", "black", "green", "blue", "red", "yellow"];
  }
  componentDidMount() {
    this.getClasses();
  }
  saveShirt() {
    const shirt = {
      text: this.state.text,
      textAlign: this.state.textAlign,
      shirtColor: this.state.shirtColor,
      textColor: this.state.textColor,
      shirtFont: this.state.shirtFont,
    };

    const myStorage = window.localStorage;
    const shirts = myStorage.getItem("saved-shirts");

    const newSavedShirts = [...JSON.parse(shirts), shirt];
    myStorage.setItem("saved-shirts", JSON.stringify(newSavedShirts));
  }

  changeColorOf(thing, color) {
    thing == "shirt"
      ? this.setState({ shirtColor: color })
      : this.setState({ textColor: color });
  }

  getClasses(textAlign, shirtColor, textColor) {
    var startTextAlign = "text-align--";
    var startTextColor = "text-color--";
    var startShirt = "shirt-color--";

    var newTextAlign = startTextAlign + textAlign;
    var newShirtColor = startShirt + shirtColor;
    var newTextColor = startTextColor + textColor;

    return [newTextAlign, newShirtColor, newTextColor].join(" ");
  }
  handleSubmit(event) {
    event.preventDefault();
    const inputField = document.querySelector("#word-count");
    const number = inputField.value;
    inputField.value < 9 ? fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const text = data.join(" ");
      this.setState({ text: text });
    }) : alert('For aesthetic reasons, you can only generate 8 words! :3 xD xD :33 UwU')
    
  }

  changeTextAlign(event) {
    console.log(event.target.value);
    this.setState({ textAlign: event.target.value });
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
    const shirtClasses = this.props.getClasses(
      this.state.textAlign,
      this.state.shirtColor,
      this.state.textColor
    );
    return (
      <main className="main--generator">
        <div className="form-container">
          <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
            <label for="word-count">Word count:</label>
            <input
              id="word-count"
              type="number"
              onChange={this.handleSubmit.bind(this)}
            />
          </form>

          <span>Shirt color:</span>
          {this.colorList.map((color) => {
            return this.renderColorButton("shirt", color);
          })}

          <span>Text color:</span>
          {this.colorList.map((color) => {
            return this.renderColorButton("text", color);
          })}

          <span>Align Text:</span>
          <select onChange={this.changeTextAlign.bind(this)}>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="left">Left</option>
          </select>
        </div>
        <div className={`tshirt-container ${shirtClasses}`}>
          <button className="add-btn" onClick={this.saveShirt.bind(this)}>
            +
          </button>
          <div className="tshirt">
            <p>{this.state.text}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Generator;