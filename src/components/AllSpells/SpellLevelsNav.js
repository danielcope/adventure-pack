import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { clearChar } from '../../redux/charReducer'
import { logout } from '../../redux/userReducer'
import { connect } from 'react-redux'
 
const SpellLevelsNav = (props) => {
  const [menu,flipMenu] = useState(false)
    return (
      <div className='nav'>
        <section className='ham-container'>
          <section className='ham text' onClick={() => flipMenu(!menu)}>
            <div className='ham-line top'></div>
            <div className='ham-line mid'></div>
            <div className='ham-line bot'></div>
          </section>
        </section>
        <div className={ menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
          <Link className='light-text text' to='/allcharacters'>All Characters</Link>
          <Link className='text light-text' to='/allspells'>All Spells</Link>          
          <Link className='light-text text' to='/' onClick={() => {
            props.logout()
            props.clearChar()
          }}>Logout</Link>
        </div>
      </div>
    )
  }

export default connect(null, { logout, clearChar } ) (SpellLevelsNav)