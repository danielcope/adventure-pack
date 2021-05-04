import React, {Component} from 'react'
import axios from 'axios'
import { getCharacterArr } from '../../redux/charReducer'
import { connect } from 'react-redux'
import AddChar from './AddChar'
import CharNav from './CharNav'

import './Character.css'

class Character extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount = () => {
    this.getCharacter()
  }

  getCharacter = async () => {
    await axios.get('/api/character')
      .then(res => this.props.getCharacterArr(res.data))
      .catch(err => console.log(err))
  }

  render() {

    const mappedCharArr = this.props.charReducer.character.map((ele,i) => (
      <section key={ele.char_id} className='char-container'>
        <section>
          <span>{ele.name}</span>
        </section>
      </section>
    ))

    return (
      <div>
      <CharNav />
      <AddChar getCharacter={this.getCharacter}/>
      

      <section>
        {mappedCharArr}
      </section>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getCharacterArr} )(Character)