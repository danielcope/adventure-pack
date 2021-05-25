import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpellBookNav from './SpellBookNav'

class SpellBook extends Component {
  constructor (){
    super();
    this.state = {
      spells: []
    
    }
  }

  componentDidMount = async () => {
    await this.getSpellbook()
  }

  getSpellbook = async () => {
    const char_id = this.props.match.params.id

    await axios.get(`/api/spell/${char_id}`)
    .then(res=>{
      this.setState({spells:res.data})
    })
    .catch(err=>console.log(err))
  } 

  unlearnSpell = async (spellbook_id) => {
    await axios.delete(`/api/spell/${spellbook_id}`)
    .then(async res =>{
      await this.getSpellbook()
    })  
    .catch(err=>console.log(err))
  }

  render(){
    
    console.log(this.props)
    console.log(this.state)


    const mappedSpells = this.state.spells.map((ele,i) => (
      <section key={ele.spellbook_id}>
        <button onClick={()=>this.unlearnSpell(ele.spellbook_id)}>X</button>
        <Link to={`/individualspell/${ele.spell_index}`}>{ele.spell_name}</Link>
      </section>
    ))


    return (
      <section>
        <SpellBookNav id={this.props.match.params.id} />




        {mappedSpells}
      </section>
    )
  }
}

export default SpellBook