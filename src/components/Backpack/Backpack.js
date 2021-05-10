import React, { Component } from 'react'
import BackpackNav from './BackpackNav';
import { connect } from 'react-redux';

class Backpack extends Component {
  constructor () {
    super()
    this.state = {
      charInfo: {}
    }
  }

  componentDidMount = () => {

  }

  storeChar = () => {
    for (let i = 0; i < this.props.charReducer.character.length; i++) {
      if (parseInt(this.props.charReducer.character[i].char_id) === parseInt(this.props.match.params.id)) {
        this.setState({charInfo:this.props.charReducer.character[i]})
      }
    }
  }
  
  getItems = () => {
    // const { char_id } = 
  }
    
  render () {
    return (
      <div>
        <BackpackNav id={this.props.match.params.id} />

        <h1>sadfasdf</h1>


      </div>
    )
  }
}
  
const mapStateToProps = state => state

export default connect(mapStateToProps) (Backpack)