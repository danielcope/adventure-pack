import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { clearChar } from '../../redux/charReducer'
import { logout } from '../../redux/userReducer'
import { connect } from 'react-redux'


const ItemNav = (props) => {

  const [menu,flipMenu] = useState(false)

  return (
    <div className='nav'>

        <span className='ham' onClick={() => flipMenu(!menu)} >&equiv;</span>

        <div className={ menu ? 'individual-char-nav-opened' : 'individual-char-nav-closed'}>
        <Link className='light-text' to='/allcharacters'>All Characters</Link>
        <Link className='light-text' to={`/individualcharacter/${props.id}`}>My Stats</Link>
        <Link className='light-text' to={`/backpack/${props.id}`}>My Backpack</Link>
        <Link className='light-text' to='/' onClick={()=>{
            props.logout()
            props.clearChar()
        }} >Logout</Link>
        </div>



    </div>

)
}

export default connect(null, {logout,clearChar}) (ItemNav)