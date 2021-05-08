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

    return (
      <div>
        <IndividualCharNav id={this.props.match.params.id} />
    
        <div className='name-bar'>
          <h1 className='name'>{this.state.charInfo.name} </h1>
          <div className='edit-pencil'>&#x270E;</div>
        </div>



      </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualCharacter)