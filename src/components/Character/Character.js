import React, {Component} from 'react'
import axios from 'axios'
import { getCharacterArr } from '../../redux/charReducer'
import { connect } from 'react-redux'
import AddChar from './AddChar'
import CharNav from './CharNav'

import '../trash.css'
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

  deleteChar = (char_id) => {
    axios.delete(`/api/sacrifice/${char_id}`)
    .then(res=> {
      this.getCharacter()
      console.log('hit')
    })
    .catch(err => console.log(err))
  }

  render() {

    const mappedCharArr = this.props.charReducer.character.map((ele,i) => (
      <section key={ele.char_id} className='char-container'>
        <section className='name-trash-container'>
          <h2 className='name-text'>{ele.name}</h2>
          <div className="icon-trash" onClick={() => this.deleteChar(ele.char_id)}>
            <div className="trash-lid"></div>
            <div className="trash-container"></div>
            <div className="trash-line-1"></div>
            <div className="trash-line-2"></div>
            <div className="trash-line-3"></div>
          </div>
        </section>

        <section className='char-info' >
          <section className='char-info-container' >
            <div className='char-info-block'>
              <h4>Race:</h4> 
              <span className='info-text'>{ele.race}</span>
            </div>

            <div className='char-info-block'>
              <h4>Class:</h4>
              <span className='info-text'>{ele.char_class}</span>
            </div>
            
            <div className='char-info-block'>
              <h4>Background:</h4> 
              <span className='info-text'>{ele.background}</span>
            </div>

          </section>
          
          <section className='hp-ac-speed'>
            

            <section className='char-info-stats'>
              <h4><div className='shield'></div> AC: </h4> 
              <span className='info-text'>{ele.armor_class}</span>
            </section>

            <section className='char-info-stats'>
              <h4>Speed</h4>
              <span className='info-text'>{ele.speed}</span>

            </section>

          </section>

        </section>

        <section className='health-container'>
          <section className='char-info-container'>
            <section className='char-info-block'>
              <h4>&#x2764; Health: </h4> 
              <span className='info-text'>{ele.current_hp}/{ele.max_hp}</span>
            </section>
          </section>

            <section className='health-change'>
              <div>
                <input className='number' placeholder={0}/>              
              </div>

              <div>
                <button className='health-button' >+</button>
                <button className='health-button' >Full Heal</button>
                <button className='health-button' >-</button>
              </div>
            </section>

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