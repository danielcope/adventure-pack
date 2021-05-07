import React, { Component } from 'react'
import { Link } from 'react-router-dom'
 
import './IndividualCharacter.css'

class IndividualCharNav extends Component {
  constructor () {
    super()
    this.state = {
      menu: false
    }
  }

  flipMenu = () => this.setState({menu:!this.state.menu})

  render () {

    console.log(this.props)

    return (
      <div className='nav'>
        
        <span className='individual-char-nav' onClick={() => this.flipMenu()} >&equiv;</span>

        <div className={ this.state.menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
          <Link to='/allcharacters'>All Characters</Link>
          <Link to='/allspells'>All Spells</Link>
          <Link to={`/backpack/${this.props.id}`}>My backpack</Link>
          <Link to={`/spellbook/${this.props.id}`}>My Spells</Link>
        </div>

      </div>

    )
  }
}

export default IndividualCharNav