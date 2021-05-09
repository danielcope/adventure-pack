import React, { Component } from 'react'
import BackpackNav from './BackpackNav';

class Backpack extends Component {
  constructor (){
    super();
    this.state = {
}
}

  render(){

    console.log(this.props)

    return (
      <div>
        <BackpackNav id={this.props.match.params.id} />

      </div>
    )
  }
}

export default Backpack