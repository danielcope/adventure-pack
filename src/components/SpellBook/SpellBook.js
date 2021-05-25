import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpellBookNav from './SpellBookNav'

import './SpellBook.css'

class SpellBook extends Component {
  constructor (){
    super();
    this.state = {
      spells: [],
      zeroSpells: [],
      oneSpells: [],
      twoSpells: [],
      threeSpells: [],
      fourSpells: [],
      fiveSpells: [],
      sixSpells: [],
      sevenSpells: [],
      eightSpells: [],
      nineSpells: [],
      mappedZeroSpells: [],
      mappedOneSpells: [],
      mappedTwoSpells: [],
      mappedThreeSpells: [],
      mappedFourSpells: [],
      mappedFiveSpells: [],
      mappedSixSpells: [],
      mappedSevenSpells: [],
      mappedEightSpells: [],
      mappedNineSpells: []
    }
  }

  componentDidMount = async () => {
    await this.getSpellbook()
    await this.orderSpells()
    await this.mapZero()
    await this.mapSix()
  }

  getSpellbook = async () => {
    const char_id = this.props.match.params.id

    await axios.get(`/api/spell/${char_id}`)
    .then(res=>{
      this.setState({spells:res.data})
    })
    .catch(err=>console.log(err))
  } 

  orderSpells = () => {
    
    const newZeroSpells = []
    const newOneSpells = []
    const newTwoSpells = []
    const newThreeSpells = []
    const newFourSpells = []
    const newFiveSpells = []
    const newSixSpells = []
    const newSevenSpells = []
    const newEightSpells = []
    const newNineSpells = []
    

    for(let i = 0; i < this.state.spells.length; i++) {
      if(this.state.spells[i].spell_level === 0){
        newZeroSpells.push(this.state.spells[i])
        this.setState({zeroSpells:newZeroSpells})
      }
      if(this.state.spells[i].spell_level === 1){
        newOneSpells.push(this.state.spells[i])
        this.setState({oneSpells:newOneSpells})
      }
      if(this.state.spells[i].spell_level === 2){
        newTwoSpells.push(this.state.spells[i])
        this.setState({twoSpells:newTwoSpells})
      }
      if(this.state.spells[i].spell_level === 3){
        newThreeSpells.push(this.state.spells[i])
        this.setState({threeSpells:newThreeSpells})
      }
      if(this.state.spells[i].spell_level === 4){
        newFourSpells.push(this.state.spells[i])
        this.setState({fourSpells:newFourSpells})
      }
      if(this.state.spells[i].spell_level === 5){
        newFiveSpells.push(this.state.spells[i])
        this.setState({fiveSpells:newFiveSpells})
      }
      if(this.state.spells[i].spell_level === 6){
        newSixSpells.push(this.state.spells[i])
        this.setState({sixSpells:newSixSpells})
      }
      if(this.state.spells[i].spell_level === 7){
        newSevenSpells.push(this.state.spells[i])
        this.setState({sevenSpells:newSevenSpells})
      }
      if(this.state.spells[i].spell_level === 8){
        newEightSpells.push(this.state.spells[i])
        this.setState({eightSpells:newEightSpells})
      }
      if(this.state.spells[i].spell_level === 9){
        newNineSpells.push(this.state.spells[i])
        this.setState({nineSpells:newNineSpells})
      }
    }
  }

  unlearnSpell = async (spellbook_id) => {
    await axios.delete(`/api/spell/${spellbook_id}`)
    .then(async res =>{
      await this.getSpellbook()
    })  
    .catch(err=>console.log(err))
  }

  mapZero = () => {
    this.setState({mappedZeroSpells:this.state.zeroSpells.map((ele,i)=>(
      <section key={ele.spell_name}>{ele.spell_name}</section>
    ))})
  }

  mapOne = () => {}
  mapTwo = () => {}
  mapThree = () => {}
  mapFour = () => {}
  mapFive = () => {}
  mapSix = () => {
    this.setState({mappedSixSpells:this.state.sixSpells.map((ele,i)=>(
      <section className='text' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }
  mapSeven = () => {}
  mapEight = () => {}
  mapNine = () => {}

  render(){
    
    console.log(this.props)
    console.log(this.state)


    // const mappedSpells = this.state.spells.map((ele,i) => (
    //   <section key={ele.spellbook_id} >
    //     
    //     <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>
    //   </section>
    // ))


    return (
      <section className='spellbook-view'>
        <SpellBookNav id={this.props.match.params.id} />

        {/* <section className='mapped-spells-container'>
          {mappedSpells}
        </section> */}

        <section>
          {this.state.mappedZeroSpells}
        </section>

        <section className='mapped-spells-container'>
          {this.state.mappedSixSpells}
        </section>

      </section>
    )
  }
}

export default SpellBook