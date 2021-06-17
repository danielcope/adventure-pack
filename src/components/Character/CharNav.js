import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/userReducer'
import { clearChar } from '../../redux/charReducer'


const CharNav = (props) => {
  
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

        <section className={ menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
          <div>
            <Link className='light-text text' to='/allspells'>Spells</Link> 
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

export default connect(null, {clearChar, logout})(CharNav)