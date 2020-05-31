import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedShirts: [],
      text: " ",
      textAlign: "left",
      shirtColor: "",
      textColor: "",
      shirtFont: "",
    };

    this.colorList = ["white", "black", "green", "blue", "red", "yellow"];
  }

  componentDidMount() {
    this.getShirts();
  }

  getShirts() {
    const myStorage = window.localStorage;
    const shirts = myStorage.getItem("saved-shirts");
    if (shirts && shirts.length) {
      this.setState({ savedShirts: JSON.parse(shirts) });
    }
  }

  saveShirt() {
    const shirt = {
      text: this.state.text,
      textAlign: this.state.textAlign,
      shirtColor: this.state.shirtColor,
      textColor: this.state.textColor,
      shirtFont: this.state.shirtFont,
    };
    const newSavedShirts = [...this.state.savedShirts, shirt];
    this.setState({ savedShirts: newSavedShirts });
    const myStorage = window.localStorage;
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
    fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const text = data.join(" ");
        this.setState({ text: text });
      });
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
    const shirtClasses = this.getClasses(
      this.state.textAlign,
      this.state.shirtColor,
      this.state.textColor
    );
    return (
      <>
      <div className="column"> <div className="form-container">
          <h3>Create your t-shirt here!</h3>
          <form id="generate-words" onSubmit={this.handleSubmit.bind(this)}>
            <label for="word-count">Word count:</label>
            <input id="word-count" type="number" />
            <input type="submit" />
          </form>
          <div className="align-text-options">
            <span>Align Text:</span>
            <select className="pretty-buttons" onChange={this.changeTextAlign.bind(this)}>
              <option value="right">Right</option>
              <option value="center">Center</option>
              <option value="left">Left</option>
            </select>
          </div>
          <div className="change-font-options">
            <span>Change font:</span>
            <select className="pretty-buttons">
              <option value="right">Comic sans</option>
              <option value="center">BleepBloop</option>
            </select>
          </div>
          <div className="color-options">
            <span>Shirt color:</span>
            {this.colorList.map((color) => {
              return this.renderColorButton("shirt", color);
            })}
          </div>
          <div className="text-color-options">
            <span>Text color:</span>
            {this.colorList.map((color) => {
              return this.renderColorButton("text", color);
            })}
          </div>
        </div>

        <div className={`tshirt-container shirt-color--white ${shirtClasses}`}>
          <button className="add-btn" onClick={this.saveShirt.bind(this)}>
            +
          </button>
          <div className="tshirt">
            <p>{this.state.text}</p>
          </div>
        </div></div>
       
                 <div className="storage-container">
          {this.state.savedShirts.map((shirt) => {
            let newClasses = this.getClasses(
              shirt.textAlign,
              shirt.shirtColor,
              shirt.textColor
            );
            return (
              <div className={`tshirt-container card shirt-color--white ${newClasses}`}>
                <div className="tshirt">
                  <p>{shirt.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        </>
    );
  }
}

export default App;
