
import React, { Component } from 'react'

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isLoaded: true
    };
  }

  componentDidMount() {
    fetch("/demi")
      .then(res => res.json())
      .then(res => {
        console.log(res.data)
      });
  }

  render() {

      var { items, isLoaded } = this.state;
      return(
          <div>
            Hello Makaveli
          </div>
      )
      
  }
}

export default App