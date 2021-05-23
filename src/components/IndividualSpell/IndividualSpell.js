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
      <section>{ele.name}  </section>
    ))})
  }

  render () {

    console.log(this.state)
    
    return (
      <div className='individual-spell-view'>

        <div className='back-nav'>
          <span className='back' onClick={() => this.props.history.goBack()}>{'<< Back'}</span>
        </div>


        <div>
          <h2>{this.state.spell.name}</h2>
        </div>



        <div className='spell-info'>
          <span>Level {this.state.spell.level}</span>
          <span>Casting time: {this.state.spell.casting_time}</span>
          <span>Range: {this.state.spell.range}</span>
          <span>Duration: {this.state.spell.duration}</span>
          {this.state.spell.concentration ? <span>Concentration Required</span> : <span>No Concentration Required</span>}
          <section className='spell-classes'>
            <span className='classes-section'>Classes</span>
            <span className='spell-classes-mapped'>{this.state.mappedClasses} </span>
          </section>
        </div>


        <section className='spell-desc'>{this.state.mappedDesc}</section>
        

      </div>
  )
  }
}

export default IndividualSpell