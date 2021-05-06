import React, {Component} from 'react'
import { connect } from 'react-redux'

import './IndividualCharacter.js'


class IndividualCharacter extends Component {
  constructor () {
    super() 
    this.state = {

    }
  }

  render () {

    return (
      <div>
        
      </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualCharacter)