import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/userReducer'
import { clearChar } from '../../redux/charReducer'


class CharNav extends Component {
  constructor() {
    super() 
      this.state = {
        navMenu:false
      }
    }
  
    flipMenu = () => this.setState({navMenu:!this.state.navMenu})
    
    fullLogout = () => {
      this.props.clearChar()
      this.props.logout()
    }

  render() {


    return (
      <div className='nav'>
        <span className='ham' onClick={this.flipMenu}>&equiv;</span>

        <section className={ this.state.navMenu ? 'char-nav-opened' : 'char-nav-closed'}>
          <div>
            <Link className='light-text' to='/allspells'>Spells</Link> 
          </div>
          <div>
            <Link className='light-text' to='/' onClick={this.fullLogout}>Logout</Link>
          </div>

        </section>
      </div>

    )
  }
}



export default connect(null, {clearChar, logout})(CharNav)