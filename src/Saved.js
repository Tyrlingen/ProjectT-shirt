import React, { Component } from "react";
import "./App.scss";

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedShirts: [],
    };
  }

  getShirts() {
    const myStorage = window.localStorage;
    const shirts = myStorage.getItem("saved-shirts");
    if (shirts && shirts.length) {
      this.setState({ savedShirts: JSON.parse(shirts) });
    }
  }

  componentDidMount() {
    this.getShirts();
  }
  render() {
    return (
      <>
        <p>HEJ</p>
        <div className="storage-container">
          {this.state.savedShirts.map((shirt) => {
            let newClasses = this.props.getClasses(
              shirt.textAlign,
              shirt.shirtColor,
              shirt.textColor
            );
            return (
              <div className={`tshirt-container card ${newClasses}`}>
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

export default Saved;
