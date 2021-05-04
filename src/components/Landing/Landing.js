import React, {Component} from 'react'
import Auth from '../Auth/Auth'

import './Landing.css'

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      menu: false
    }
  }

  flipMenu = () => this.setState({menu:!this.state.menu})

  render() {


    return (
      <div>

        <span className='landing-login' onClick={this.flipMenu}>Login &equiv;</span>

        <section className={ this.state.menu ? 'auth-opened' : 'auth-closed' }>
          <Auth history={this.props.history}/>
        </section>
      </div>

    )
  }
}

export default Landing