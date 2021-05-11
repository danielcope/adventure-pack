import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/userReducer'
import { clearChar } from '../../redux/charReducer'


const CharNav = (props) => {
  
  const [menu,flipMenu] = useState(false)
    
    
    return (
      <div className='nav'>
        <span className='ham' onClick={() => flipMenu(!menu)}>&equiv;</span>

        <section className={ menu ? 'char-nav-opened' : 'char-nav-closed'}>
          {/* <div>
            <Link className='light-text' to='/allspells'>Spells</Link> 
          </div> */}
          <div>
            <Link className='light-text' to='/' onClick={() => {
              props.clearChar()
              props.logout()
            }}>Logout</Link>
          </div>

        </section>
      </div>

    )
  }

export default connect(null, {clearChar, logout})(CharNav)