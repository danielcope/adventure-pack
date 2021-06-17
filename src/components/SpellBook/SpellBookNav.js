import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/userReducer'
import { clearChar } from '../../redux/charReducer'

const SpellBookNav = (props) => {

  const [menu,flipMenu] = useState(false)

  return (
    <div className='nav spell-book-nav'>
      <span className='ham' onClick={() => flipMenu(!menu)}>&equiv;</span>

      <section className={ menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
          <div>
            <Link className='light-text text' to='/allspells'>All Spells</Link> 
          </div>
          <div>
            <Link className='light-text text' to={'/allcharacters'}>All Characters</Link>
          </div>
          <div>
            <Link className='light-text text' to={`/backpack/${props.id}`}>My backpack</Link>
          </div>
          <div>
            <Link className='light-text text' to={`/individualcharacter/${props.id}`}>My Stats</Link>
          </div>
          <div>
            <Link className='light-text text' to='/' onClick={() => {
              props.clearChar()
              props.logout()
            }}>Logout</Link>
          </div>

        </section>

    </div>

)
}

const mapStateToProps = state => state

export default connect (mapStateToProps, {logout,clearChar}) (SpellBookNav)