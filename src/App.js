
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
        // this.setState({
        //   isLoaded: true,
        //   items: res.data
        // });
        console.log(res.data)
      });
  }

  render() {
    // return(

      var { items, isLoaded } = this.state;
      // var itemInfo = items.map(item => <div key={item.id}>Hex:{item.name}</div>);
      // console.log(itemInfo)
      return(
              <table id="example" className="table table-striped table-bordered table-hover">
              <thead>
                  <tr>
                      <th>Username</th>
                  </tr>
              </thead>
              <tbody>
              {
                    items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                        </tr>
                        // console.log(item)
                    ))
                }
                
              </tbody>
          </table>
      )
      
    // ...
  }
}

export default App