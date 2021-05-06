import React, {Component} from 'react'
import axios from 'axios'
import { getCharacterArr } from '../../redux/charReducer'
import { connect } from 'react-redux'
import AddChar from './AddChar'
import CharNav from './CharNav'
import { Link } from 'react-router-dom'

import '../trash.css'
import './Character.css'

class Character extends Component {
  constructor() {
    super();
    this.state = {
      healthAddSub: 0
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

  handleHealthAddSubChange = (val) => {
    this.setState({healthAddSub:val})
  }

  addHealth = async (char_id,current_hp) => {

    const { healthAddSub } = this.state
    const new_hp = parseInt(current_hp) + parseInt(healthAddSub);
    await axios.put(`/api/addhealth/${char_id}`,{new_hp:new_hp})
    .then(res=>{
      this.getCharacter()
    })
    .catch(err=>console.log(err))
  }

  subHealth = async (char_id,current_hp) => {
    const {healthAddSub} = this.state;
    const new_hp = parseInt(current_hp) - parseInt(healthAddSub);

    await axios.put(`/api/subhealth/${char_id}`, {new_hp:new_hp})
    .then(res=>{
      this.getCharacter()
    .catch(err => console.log(err))      
    })
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

        <Link to={`/individualcharacter/${ele.char_id}`}>Stats</Link>

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