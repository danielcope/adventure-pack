import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class AddChar extends Component {
  constructor (){
    super();
    this.state = {
      menu:false,
      name: '',
      armor_class:0,
      race:'',
      max_hp:0,
      char_class:'',
      max_hitdice:0,
      background: '',
      initiative:0,
      speed:0,
      passive_insight:0,
      passive_perception:0,
      inspiration:0
}
}

  flipAddMenu = () => this.setState({menu:!this.state.menu})

  handleNameChange = (val) => this.setState({name:val})
  handleAcChange = (val) => this.setState({armor_class:val})
  handleRaceChange = (val) => this.setState({race:val})
  handleMaxHpChange = (val) => this.setState({max_hp:val})
  handleClassChange = (val) => this.setState({char_class:val})
  handleMaxHitDiceChange = (val) => this.setState({max_hitdice:val})
  handleBackgroundChange = (val) => this.setState({background:val})
  handleInitiativeChange = (val) => this.setState({initiative:val})
  handleSpeedChange = (val) => this.setState({speed:val})
  handlePassiveInsightChange = (val) => this.setState({passive_insight:val})
  handlePassivePerceptionChange = (val) => this.setState({passive_perception:val})
  handleInspirationChange = (val) => this.setState({inspiration:val})

  addChar = async () => {

    const {
      name,
      race,
      char_class,
      background,
      max_hp,
      proficiency,
      passive_perception,
      passive_insight,
      inspiration,
      armor_class,
      initiative,
      speed, 
      max_hitdice
    } = this.state

    const {user_id} = this.props.userReducer.user

    await axios.post('/api/character', {user_id:user_id,name:name,race:race,char_class:char_class, background:background, max_hp:max_hp,proficiency:proficiency, passive_perception:passive_perception,passive_insight:passive_insight,inspiration:inspiration,armor_class:armor_class,initiative:initiative,speed:speed,max_hitdice:max_hitdice})
    .then(res=>
      alert('Character added!'))
      this.props.getCharacter()
  }

  render(){


    return (
      <div>
          { !this.state.menu ? 
        <span onClick={this.flipAddMenu}>Add Char &#43;</span>
        : <span onClick={this.flipAddMenu}>Close X</span>
        }

        <section className={ this.state.menu ? 'add-form-opened' : 'add-form-closed'}>
          <div>
            <label className='long-input'>Name:</label>
            <input onChange={e => this.handleNameChange(e.target.value)}/>
            <span >AC:</span>
            <input onChange={e => this.handleAcChange(e.target.value)} className='small-input'/>
          </div>
          <div>
            <span className='long-input'>Race:</span>
            <input onChange={e => this.handleRaceChange(e.target.value)}/>
            <span>Max Hp:</span>
            <input onChange={e => this.handleMaxHpChange(e.target.value)} className='small-input' />
          </div>
          <div>
            <span className='long-input'>Class:</span>
            <input onChange={e => this.handleClassChange(e.target.value)} />
            <span>Total Hit Dice:</span>
            <input onChange={e => this.handleMaxHitDiceChange(e.target.value)} className='small-input'/>
          </div>
          <div>
            <span className='long-input'>Background:</span>
            <input onChange={e => this.handleBackgroundChange(e.target.value)} />
            <span>Initiative:</span>
            <input onChange={e => this.handleInitiativeChange(e.target.value)} className='small-input'/>
          </div>
          <div>
            <span>Speed:</span>
            <input onChange={e => this.handleSpeedChange(e.target.value)} className='small-input' />
            <span>Passive Insight:</span>
            <input onChange={e=>this.handlePassiveInsightChange(e.target.value)} className='small-input'/>
          </div>
          <div>
            <span>Passive Perception:</span>
            <input onChange={e=>this.handlePassivePerceptionChange(e.target.value)} className='small-input' />
            <span>Inspiration:</span>
            <input onChange={e=>this.handleInspirationChange(e.target.value)} className='small-input' />
          </div>

          <button onClick={this.addChar}>Add Character</button>

        </section>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (AddChar)