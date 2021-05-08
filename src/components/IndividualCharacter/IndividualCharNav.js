import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { clearChar } from '../../redux/charReducer'
import { logout } from '../../redux/userReducer'
import { connect } from 'react-redux'
 
import './IndividualCharacter.css'

class IndividualCharNav extends Component {
  constructor () {
    super()
    this.state = {
      menu: false
    }
  }

  flipMenu = () => this.setState({menu:!this.state.menu})

  fullLogout = () => {
    this.props.clearChar()
    this.props.logout()
  }

  render () {

    return (
      <div className='nav'>
        
        <span className='ham' onClick={() => this.flipMenu()} >&equiv;</span>

        <div className={ this.state.menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
          <Link className='light-text' to='/allcharacters'>All Characters</Link>
          <Link className='light-text' to='/allspells'>All Spells</Link>
          <Link className='light-text' to={`/backpack/${this.props.id}`}>My backpack</Link>
          <Link className='light-text' to={`/spellbook/${this.props.id}`}>My Spells</Link>
          <Link className='light-text' to='/' onClick={this.fullLogout}>Logout</Link>
        </div>

      </div>

    )
  }
}

export default connect(null, { logout, clearChar } ) (IndividualCharNav)