import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: []
    };
  }
  wordGetter(){
    fetch("https://random-word-api.herokuapp.com/word?number=10")
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      this.setState({currentText: data});
    })
    
  }
  render(){
    console.log(this.state.currentText); 
    return(<main>
        <p>"blabla"</p>
        <button onClick={this.wordGetter.bind(this)}>Klick me!</button>
    </main>)
  }
}
    

export default App;
