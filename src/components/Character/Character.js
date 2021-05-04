import React, {Component} from 'react'
import axios from 'axios'
import { getCharacterArr } from '../../redux/charReducer'
import { connect } from 'react-redux'

import './Character.css'

class Character extends Component {
  constructor() {
    super();
    this.state = {
      addMenu:false
    }
  }

  componentDidMount = () => {
    axios.get('/api/character')
    .then(res => this.props.getCharacterArr(res.data))
    .catch(err => console.log(err))
  }

  flipAddMenu = () => this.setState({menu:!this.state.menu})

  render() {

    const mappedCharArr = this.props.charReducer.character.map((ele,i) => (
      <section key={ele.char_id} className='char-container'>
        <section>
          <span>{ele.name}</span>
        </section>
      </section>
    ))

    console.log(this.props)

    return (
      <div>
      { !this.state.menu ? 
      <span onClick={this.flipAddMenu}>Add Char &#43;</span>
      : <span onClick={this.flipAddMenu}>Close X</span>
      }
      <section className={ this.state.menu ? 'add-form-opened' : 'add-form-closed'}>
        <div>
          <label className='long-input'>Name:</label>
          <input />
          <span >AC:</span>
          <input  className='small-input'/>
        </div>
        <div>
          <span className='long-input'>Race:</span>
          <input />
          <span >Max Hp:</span>
          <input className='small-input' />
        </div>
        <div>
          <span className='long-input'>Class:</span>
          <input  />
          <span>Total Hit Dice:</span>
          <input className='small-input'/>
        </div>
        <div>
          <span className='long-input'>Background:</span>
          <input />
          <span>Initiative:</span>
          <input className='small-input'/>
        </div>
        <div>
          <span>Speed:</span>
          <input className='small-input' />
          <span>Passive Insight:</span>
          <input className='small-input'/>
        </div>
        <div>
          <span>Passive Perception:</span>
          <input className='small-input' />
          <span>Inspiration:</span>
          <input className='small-input' />
        </div>
      </section>

      <section>
        {mappedCharArr}
      </section>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getCharacterArr} )(Character)