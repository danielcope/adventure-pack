import React, {Component} from 'react'
import { connect } from 'react-redux'

import './IndividualCharacter.js'
import IndividualCharNav from './IndividualCharNav.js'


class IndividualCharacter extends Component {
  constructor () {
    super() 
    this.state = {
      charInfo: {}
    }
  }

  componentDidMount () {
    this.storeChar()
  }

  storeChar = () => {
    for (let i = 0; i < this.props.charReducer.character.length; i++) {
      if (parseInt(this.props.charReducer.character[i].char_id) === parseInt(this.props.match.params.id)) {
        this.setState({charInfo:this.props.charReducer.character[i]})
      }
    }
  }
  
  render () {

    console.log(this.state.charInfo)    

    return (
      <div>
        <IndividualCharNav id={this.props.match.params.id} />
        <h1>{this.state.charInfo.name}</h1>

      </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualCharacter)