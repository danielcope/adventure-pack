import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SpellLevelsNav from './SpellLevelsNav'

import './AllSpells.css'


class SpellLevels extends Component {
  constructor() {
    super()
    this.state = {
      spells: []
    }
  }

  componentDidMount = async () => {
    await axios.get(`https://www.dnd5eapi.co/api/spells?level=${this.props.match.params.id}
    `)
    .then(res=>{
      this.setState({spells:res.data.results})
    })
    .catch(err=>console.log(err))
  }
  
  storeSpells = () => {
    
  }



  render() {
      
    const mappedSpells = this.state.spells.map((ele,i) => (
      <section className='all-mapped-spells-by-level' key={ele.index}>
        <Link className='spell-links text' to={`/individualspell/${ele.index}`}>{ele.name}</Link>        
      </section>
    ))

      console.log(this.props);
      console.log(this.state);

    return (
      <div>

        <SpellLevelsNav/>

        <section className='text spell-level-header'>
            {this.props.match.params.id === "0" ?
            <h2>Cantrips</h2>
            :
            <h2 className='text header'>
            Level {this.props.match.params.id}
          </h2>
          }
        </section>
        <section className='mapped-level-spells-container'>
          {mappedSpells}
        </section>


      </div>
      
      )
    }
  }

export default SpellLevels