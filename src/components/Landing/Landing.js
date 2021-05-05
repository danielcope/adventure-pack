import React, {Component} from 'react'
import Auth from '../Auth/Auth'
import { connect } from 'react-redux'

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
      <div className='landing-view'>

        <section className='landing-login'>
          <span  onClick={this.flipMenu}>Login &equiv;</span>
        </section>

        <section className={ this.state.menu ? 'auth-opened' : 'auth-closed' }>
          <Auth history={this.props.history}/>
        </section>
      </div>

    )
  }
}

const mapStateToProps = state => state

export default connect (mapStateToProps)(Landing)