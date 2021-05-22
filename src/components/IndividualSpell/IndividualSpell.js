import React, { Component } from 'react'
import axios from 'axios'

class IndividualSpell extends Component {
  constructor(){
    super()
    this.state = {
      spell: {}
    }
  }

  componentDidMount = async () => {
    await axios.get(`https://www.dnd5eapi.co/api/spells/${this.props.match.params.id}/`)
    .then(res=>this.setState({spell:res.data}))
    .catch(err=>console.log(err))
  }

  render () {

    // console.log(this.state)

    return (
      <div>
        <h2>{this.state.spell.name}</h2>

        <section></section>
        

      </div>
  )
  }
}

export default IndividualSpell