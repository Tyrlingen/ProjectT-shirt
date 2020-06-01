import React, { Component } from "react";
import Generator from "./Generator";
import Saved from "./Saved";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Router>
        <header>
          <h1 class="logo">T-Shirt Generator</h1>
          <div class="name">
            <p>Grupp 25</p>
            <p>Karl Hamnebo, Felicia Lindbäck, Sebastian Tyrling</p>
          </div>
        </header>
        <nav class="navbar">
          <NavLink to="/">Generate!</NavLink>
          <NavLink to="/saved">Saved Shirts</NavLink>
        </nav>

        <Switch>
          <Route path="/saved">
            <Saved getClasses={this.getClasses} />
          </Route>
          <Route path="/">
            <Generator getClasses={this.getClasses} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
