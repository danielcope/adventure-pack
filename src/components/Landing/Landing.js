import React, {useState} from 'react'
import Auth from '../Auth/Auth'

import './Landing.css'

const Landing = () => {

  const [menu,flipMenu] = useState(false)

  return (
    <div>

      <span className='landing-login' onClick={() => flipMenu(!menu)}>Login &equiv;</span>

      <section className={ menu ? 'auth-opened' : 'auth-closed' }>
        <Auth />
      </section>
    </div>

)
}

export default Landing