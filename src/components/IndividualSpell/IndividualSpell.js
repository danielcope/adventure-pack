import React, { Component } from 'react'
import axios from 'axios'

import './IndividualSpell.css'

class IndividualSpell extends Component {
  constructor(){
    super()
    this.state = {
      spell: {},
      mappedDesc:[],
      mappedClasses: []
    }
  }

  componentDidMount = async () => {
    await axios.get(`https://www.dnd5eapi.co/api/spells/${this.props.match.params.id}/`)
    .then(async (res)=> {
      await this.setState({spell:res.data})
      await this.mapDesc()
      await this.mapClasses()
    })
    .catch(err=>console.log(err))
  }

  mapDesc = () => {
    this.setState({mappedDesc:this.state.spell.desc.map((ele,i)=>(
      <section>{ele}</section>
    ))})
  }

  mapClasses = () => {
    this.setState({mappedClasses:this.state.spell.classes.map((ele,i)=>(
      <section>{ele.name}</section>
    ))})
  }

  render () {

    console.log(this.state)
    
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
          <span className='text'>Level {this.state.spell.level}</span>
          <span className='text'>Casting time: {this.state.spell.casting_time}</span>
          <span className='text'>Range: {this.state.spell.range}</span>
          <span className='text'>Duration: {this.state.spell.duration}</span>
          <section className='spell-classes text'>
            <span className='classes-section text'>Classes</span>
            <span className='spell-classes-mapped text'>{this.state.mappedClasses} </span>
          </section>
        </div>


        <section className='spell-desc text'>{this.state.mappedDesc}</section>
        

      </div>
  )
  }
}

export default IndividualSpell