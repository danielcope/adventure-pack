import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class AddChar extends Component {
  constructor (){
    super();
    this.state = {
      menu:false,
      name: 'none',
      armor_class:0,
      race:'none',
      max_hp:0,
      char_class:'none',
      max_hitdice:0,
      background: 'none',
      initiative:0,
      speed:0,
      passive_insight:0,
      passive_perception:0,
      inspiration:0,
      proficiency: 0
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
  handleProficiencyChange = (val) => this.setState({proficiency:val})

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
      this.flipAddMenu()
  }

  render(){


    return (
      <div className='add-char' >
        <div className='add-char-button'>
          { !this.state.menu ? 
          <span className='add text' onClick={this.flipAddMenu}>Add New Char &#43;</span>
          : <span className='add text' onClick={this.flipAddMenu}>Close X</span>
          }
        </div>

        <section className={ this.state.menu ? 'add-form-opened' : 'add-form-closed'}>
          <section className='form-container'>
          <div className='form-column'>
            <span className='add-char-name text'>Name:</span>
            <span className='add-char-race text'>Race:</span>
            <span className='add-char-class-span text'>Class:</span>
            <span className='add-char-background text'>Background:</span>
            <span className='add-char-ac text'>AC:</span>
            <span className='add-char-max-hp text'>Max Hp:</span>
            <span className='add-char-hit text'>Total Hit Dice:</span>
            <span className='add-char-init text'>Initiative:</span>
            <span className='add-char-speed text'>Speed:</span>
            <span className='add-char-pi text'>Passive Insight:</span>
            <span className='add-char-pp text'>Passive Perception:</span>
            <span className='add-char-insp text'>Inspiration:</span>
            <span className='add-char-prof text'>Proficiency:</span>
          </div>
          <div className='form-column'>
            <input className='long-input text' onChange={e => this.handleNameChange(e.target.value)}/>
            <input className='long-input text' onChange={e => this.handleRaceChange(e.target.value)}/>
            <input className='long-input text' onChange={e => this.handleClassChange(e.target.value)} />
            <input className='long-input text' onChange={e => this.handleBackgroundChange(e.target.value)} />
            <input onChange={e => this.handleAcChange(e.target.value)} className='small-input'/>
            <input onChange={e => this.handleMaxHpChange(e.target.value)} className='small-input' />
            <input onChange={e => this.handleMaxHitDiceChange(e.target.value)} className='small-input'/>
            <input onChange={e => this.handleInitiativeChange(e.target.value)} className='small-input'/>
            <input onChange={e => this.handleSpeedChange(e.target.value)} className='small-input' />
            <input onChange={e=>this.handlePassiveInsightChange(e.target.value)} className='small-input'/>
            <input onChange={e=>this.handlePassivePerceptionChange(e.target.value)} className='small-input' />
            <input onChange={e=>this.handleInspirationChange(e.target.value)} className='small-input' />
            <input onChange={e=>this.handleProficiencyChange(e.target.value)} className='small-input' />
          </div>
          


          </section>
          <button onClick={this.addChar} className='text'>Add Character</button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (AddChar)