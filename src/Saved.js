import React, { Component } from "react";
import "./App.scss";

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedShirts: [],
    };
  }

  componentDidMount() {
    this.getShirts();
  }

  getShirts() {
    const myStorage = window.localStorage;
    const shirts = myStorage.getItem("saved-shirts");
    if (shirts && shirts.length) {
      let currentList = [...this.state.savedShirts, shirts];
      this.setState({ savedShirts: JSON.parse(currentList) });
    }
  }
  render() {
    return (
      <div className="storage-container">
        {this.state.savedShirts.map((shirt, i) => {
          let newClasses = this.props.getClasses(
            shirt.textAlign,
            shirt.shirtColor,
            shirt.textColor
          );
          return (
            <div className={`tshirt-container card ${newClasses}`} key={i}>
              <div className="tshirt">
                <p>{shirt.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Saved;
