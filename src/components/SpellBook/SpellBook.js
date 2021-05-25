import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpellBookNav from './SpellBookNav'

import './SpellBook.css'
import { connect } from 'react-redux';

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
      mappedNineSpells: [],
      charName: ''
    }
  }

  componentDidMount = async () => {
    this.storeCharName()
    await this.getSpellbook()
  }
  
  storeCharName = () => {
    let name = ''
    
    for(let i = 0; i < this.props.charReducer.character.length; i++){
      if(this.props.charReducer.character[i].char_id === parseInt(this.props.match.params.id)) {
        name = this.props.charReducer.character[i].name
      }
    }
    
    this.setState({charName:name})
    
  }

  getSpellbook = async () => {
    const char_id = parseInt(this.props.match.params.id)
    
    await axios.get(`/getspells/${char_id}`)
    .then( async res=>{
      console.log(res)
      this.setState({ spells: res.data })
      this.orderSpells()
      this.mapZero()
      this.mapOne()
      this.mapTwo()
      this.mapThree()
      this.mapFour()
      this.mapFive()
      this.mapSix()
      this.mapSeven()
      this.mapEight()
      this.mapNine()
      
    })
    .catch(err=>{
      
      console.log('err')
      console.log(err)
    })
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
      alert('Spell was removed')
    })  
    .catch(err=>console.log(err))
    
    await this.getSpellbook()
  }

  mapZero = () => {
    this.setState({mappedZeroSpells:this.state.zeroSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapOne = () => {
    this.setState({mappedOneSpells:this.state.oneSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapTwo = () => {
    this.setState({mappedTwoSpells:this.state.twoSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapThree = () => {
    this.setState({mappedThreeSpells:this.state.threeSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapFour = () => {
    this.setState({mappedFourSpells:this.state.fourSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapFive = () => {
    this.setState({mappedFiveSpells:this.state.fiveSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapSix = () => {
    this.setState({mappedSixSpells:this.state.sixSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapSeven = () => {
    this.setState({mappedSevenSpells:this.state.sevenSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  mapEight = () => {
    this.setState({mappedEightSpells:this.state.eightSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        
      </section>
    ))})
  }

  mapNine = () => {
    this.setState({mappedNineSpells:this.state.nineSpells.map((ele,i)=>(
      <section className='text listed-spell' key={ele.spell_name}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`} className='learned-spell text' >{ele.spell_name}</Link>        </section>
    ))})
  }

  render(){
    
    console.log(this.props)
    console.log(this.state)

    return (
      <section className='spellbook-view'>
        <SpellBookNav id={this.props.match.params.id} />

        <h2>{this.state.charName}'s Spellbook</h2>


        <section className='mapped-spells-container'>
            <span className='text header'>Cantrips</span>
            {this.state.mappedZeroSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 1</span>
          {this.state.mappedOneSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 2</span>
          {this.state.mappedTwoSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 3</span>
          {this.state.mappedThreeSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 4</span>
          {this.state.mappedFourSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 5</span>
          {this.state.mappedFiveSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 6</span>
          {this.state.mappedSixSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 7</span>
          {this.state.mappedSevenSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 8</span>
          {this.state.mappedEightSpells}
        </section>
        <section className='mapped-spells-container'>
            <span className='text header'>Level 9</span>
          {this.state.mappedNineSpells}
        </section>

      </section>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (SpellBook)