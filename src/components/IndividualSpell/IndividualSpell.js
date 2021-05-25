import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import './IndividualSpell.css'

class IndividualSpell extends Component {
  constructor(){
    super()
    this.state = {
      spell: {},
      mappedDesc:[],
      mappedClasses: [],
      mappedComponents: [],
      spellSchool: '',
      mappedChar: []
    }
  }

  componentDidMount = async () => {
    await axios.get(`https://www.dnd5eapi.co/api/spells/${this.props.match.params.id}/`)
    .then(async (res)=> {
      await this.setState({spell:res.data})
      await this.mapDesc()
      await this.mapClasses()
      await this.mapComp()
      await this.storeSchool()
      await this.mapChar()

      if (this.state.spell.higher_level) {
        this.mapHigherLvl()
      }
    })
    .catch(err=>console.log(err))
  }

  mapDesc = () => {
    this.setState({mappedDesc:this.state.spell.desc.map((ele,i)=>(
      <section key={ele}>{ele}</section>
    ))})
  }

  mapClasses = () => {
    this.setState({mappedClasses:this.state.spell.classes.map((ele,i)=>(
      <section key={ele.name}>{ele.name}</section>
    ))})
  }

  mapComp = () => {
    this.setState({mappedComponents:this.state.spell.components.map((ele,i)=>(
      <span key={ele}>{ele}</span>
    ))})
  }

  storeSchool = () => {
    this.setState({spellSchool:this.state.spell.school.name})
  }

  mapHigherLvl = () => {
    this.setState({mappedHigherLvl:this.state.spell.higher_level.map((ele,i)=>(
      <span key={ele}>{ele}</span>
    ))})
  }

  mapChar = () => {
    this.setState({mappedChar:this.props.charReducer.character.map((ele,i)=>(
      <section className='mapped-char-names' key={ele.char_id}>
        <span className='text'>{ele.name}</span>
        <button className='text add-to-spellbook' onClick={()=>this.learnSpell(ele.char_id,ele.name)}>Add to spellbook</button>
        <Link to={`/spellbook/${ele.char_id}`} className='spellbook-small' ><FontAwesomeIcon icon={faBook}/></Link>
      </section>
    ))})
  }

  learnSpell = async (char_id,char_name) => {
    const spell_name = this.state.spell.name
    const spell_index = this.state.spell.index

    await axios.post('/api/spell', {char_id:char_id,spell_name:spell_name,spell_index:spell_index})
    .then(res=>alert(`Spell added to ${char_name}'s spellbook!`))
    .catch(err=>console.log(err))
  }

  render () {

    return (
      <div className='individual-spell-view'>

        <div className='back-nav'>
          <span className='back text' onClick={() => this.props.history.goBack()}>{'<< Back'}</span>
        </div>


        <div>
          <h2 className='spell-name-bar text'>{this.state.spell.name + ' '} 
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Fire' ? <span className='damage-type-symbol'>&#128293;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Acid' ? <span className='damage-type-symbol'>&#9763;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Poison' ? <span className='damage-type-symbol'>&#9760;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Cold' ? <span className='damage-type-symbol'>&#10052;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Psychic' ? <span className='damage-type-symbol'>&#128065;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Radiant' ? <span className='damage-type-symbol'>&#9765;
            </span> : <span></span>}
            {this.state.spell.damage && this.state.spell.damage.damage_type.name === 'Lightning' ? <span className='damage-type-symbol'>&#9889;	
            </span> : <span></span>}
              {this.state.spell.concentration ? 
            <div className='con-border-yes'>
              <span className='concentration-symbol-yes' >C</span> 
            </div>
              :
              <div className='con-border-no'>
                <span className='con-line'>\</span>
                <span className='concentration-symbol-no' >C</span>
              </div> 
            }
              {this.state.spell.ritual ? 
            <div className='con-border-yes'>
              <span className='concentration-symbol-yes'>R</span> 
            </div>
              :
              <div className='con-border-no'>
                <span className='con-line'>\</span>
                <span className='concentration-symbol-no' >R</span>
              </div> 
            }
          </h2>
        </div>



        <div className='spell-info'>
          <section className='some-spell-info'>
            <span className='text bold'>Level {this.state.spell.level}</span>
            <span className='text'><span className='bold'>Casting time:</span> {this.state.spell.casting_time}</span>
            <span className='text'><span className='bold'>School:</span> {this.state.spellSchool}</span>
            <span className='text'><span className='bold'>Range:</span> {this.state.spell.range}</span>
            <span className='text'><span className='bold'>Duration:</span> {this.state.spell.duration}</span>
            <section className='spell-classes text'>
              <span className='classes-section text bold'>Classes</span>
              <span className='spell-classes-mapped text'>{this.state.mappedClasses} </span>
            </section>
          </section>

          <section className='component-container'>
            <h3 className='component-head header text bold'>Components</h3>
            <section className='component-list text'>
              {this.state.mappedComponents}
            </section>
          </section>

        </div>

        {this.state.spell.material ? 
          <section className='material-info text'>
            <h3 className='material-head header text bold'>Material Components</h3>
            {this.state.spell.material}
          </section>
        : <span></span>
        }

        {this.state.spell.dc ? 
          <section className='dc-info'>
            <section className='text bold'>{this.state.spell.dc.dc_type.name} Saving Throw &#9860; &#x2684; 
            </section> 
          </section>
        : <span></span>
        }

        <section className='spell-desc text'>
          <span className='text bold header'>Spell Description</span>
          {this.state.mappedDesc}
        </section>
        
        {this.state.spell.higher_level ? 
          <section className='higher-level-info text'>
            <span className='text bold header'>Higher Level</span>
            {this.state.mappedHigherLvl}</section>
          : <span></span>
        }

        <section className='learn-spell-section'>
          <span className='text bold header'>Add to spellbook</span>
          <div>
            {this.state.mappedChar}
          </div>
          

        </section>

      </div>
  )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualSpell)