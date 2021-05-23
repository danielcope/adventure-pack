import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
      <section key={ele.index}>
        <section className='individual-spell-links'>
          <div>
            <Link className='spell-links' to={`/individualspell/${ele.index}`}>{ele.name}</Link>        
          </div>
        </section>
      </section>
    ))

    return (
      <div>

          <div className='back-nav'>
            <span className='back' onClick={() => this.props.history.goBack()}>{'<< Back'}</span>
          </div>

        {mappedSpells}
      </div>
      
      )
    }
  }

export default SpellLevels