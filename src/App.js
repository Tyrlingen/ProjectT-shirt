import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: " "
    };
  }
  handleKeyPress(event){
    if (event.which === 13) {
      const inputField = document.querySelector("#word-count");
      const number = inputField.value;
      this.wordGetter(number);
  }
  }
  handleClick(){
    const inputField = document.querySelector("#word-count");
    const number = inputField.value;
    this.wordGetter(number);
  }
  wordGetter(number){

    fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      const text = data.join(" ")
      this.setState({text: text});
    })
    }

  render(){ 
    return(<main>
          <label for="word-count">Word count:</label>
          <input id="word-count" type="number"  onKeyPress = {this.handleKeyPress.bind(this)}></input>
        <button onClick={this.handleClick.bind(this)}>Klick me!</button>
        <div className="tshirt-container">
          <p>{this.state.text}</p>
        </div>
    </main>)
  }
}
    

export default App;
