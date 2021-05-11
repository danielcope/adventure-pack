import React, { useState} from 'react'
import Auth from '../Auth/Auth'
import { connect } from 'react-redux'

import './Landing.css'

const Landing = (props) => {

  const [menu,flipMenu] = useState(false)

  
    return (
      <div className='landing-view'>

        <section className='landing-login'>
          <span  onClick={() => flipMenu(!menu)}>Login &equiv;</span>
        </section>

        <section className={ menu ? 'auth-opened' : 'auth-closed' }>
          <Auth history={props.history}/>
        </section>

        <span className='landing-greeting'>Adventure is out there!</span>

      </div>

    )
  }

const mapStateToProps = state => state

export default connect (mapStateToProps)(Landing)