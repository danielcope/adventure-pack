import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import './IndividualCharacter.js'
import IndividualCharNav from './IndividualCharNav.js'


class IndividualCharacter extends Component {
  constructor () {
    super() 
    this.state = {
      charInfo: {},
      healthAddSub: 0,
      newName: '',
      newRace: '',
      newClass: '',
      newBackground: '',
      newAC: 0,
      newSpeed: 0,
      newInitiative: 0,
      newProficiency: 0,
      newInspiration: 0,
      newPP:0,
      newPI:0,
      newMaxHP: 0,
      newMaxHD: 0,
      nameEdit: false,
      raceEdit: false,
      classEdit: false,
      backgroundEdit: false,
      acEdit: false,
      speedEdit: false,
      maxHealthEdit: false,
      initiativeEdit: false,
      proficiencyEdit: false,
      inspirationEdit: false,
      ppEdit: false,
      piEdit: false,
      maxHitDiceEdit: false
    }
  }

  componentDidMount () {
    this.storeChar()
  }

  storeChar = () => {
    for (let i = 0; i < this.props.charReducer.character.length; i++) {
      if (parseInt(this.props.charReducer.character[i].char_id) === parseInt(this.props.match.params.id)) {
        this.setState({charInfo:this.props.charReducer.character[i]})
      }
    }
  }

  handleHealthAddSubChange = (val) => {
    this.setState({healthAddSub:val})
  }

  addHealth = async (char_id,current_hp) => {

    const { healthAddSub } = this.state
    const new_hp = parseInt(current_hp) + parseInt(healthAddSub);
    await axios.put(`/api/addhealth/${char_id}`,{new_hp:new_hp})
    .then(res=>{
      const arr = this.state.charInfo
      arr.current_hp = new_hp
      this.setState({ charInfo:arr })      
    })
    .catch(err=>console.log(err))
  }

  subHealth = async (char_id,current_hp) => {
    const {healthAddSub} = this.state;
    const new_hp = parseInt(current_hp) - parseInt(healthAddSub);

    await axios.put(`/api/subhealth/${char_id}`, {new_hp:new_hp})
    .then(res=>{
      const arr = this.state.charInfo
      arr.current_hp = new_hp
      this.setState({ charInfo:arr })    
    })
    .catch(err => console.log(err))      
  }

  fullHeal = async () => {
    const { char_id,max_hp } = this.state.charInfo
    
    await axios.put(`/api/fullheal/${char_id}`, {max_hp:max_hp})
    .then(res=>{
      const arr = this.state.charInfo
      arr.current_hp = max_hp
      this.setState({ charInfo:arr }) 
    })
    .catch(err=>console.log(err))
  }

  addDice = async () => {
    const { char_id } = this.state.charInfo
    const arr = this.state.charInfo
    arr.current_hitdice ++

    await this.setState({ charInfo:arr })

    await axios.put(`/api/changedice/${char_id}`, {new_hd:arr.current_hitdice})
    .then(res=>
      console.log('hit'))
    .catch(err=>console.log(err))
  } 
  
  subDice = async () => {
    const { char_id } = this.state.charInfo
    const arr = this.state.charInfo
    arr.current_hitdice -- 
  
    await this.setState({ charInfo:arr })
  
    await axios.put(`/api/changedice/${char_id}`, {new_hd:arr.current_hitdice})
    .then(res=>
      console.log('hit'))
    .catch(err=>console.log(err))
  }

  flipName = () => this.setState({nameEdit:!this.state.nameEdit})
  flipRace = () => this.setState({raceEdit:!this.state.raceEdit})
  flipClass = () => this.setState({classEdit:!this.state.classEdit})
  flipBackground = () => this.setState({backgroundEdit:!this.state.backgroundEdit})
  flipAc = () => this.setState({acEdit:!this.state.acEdit})
  flipSpeed = () => this.setState({speedEdit:!this.state.speedEdit})
  flipInitiative = () => this.setState({initiativeEdit:!this.state.initiativeEdit})
  flipProficiency = () => this.setState({proficiencyEdit:!this.state.proficiencyEdit})
  flipInspiration = () => this.setState({inspirationEdit:!this.state.inspirationEdit})
  flipPp = () => this.setState({ppEdit:!this.state.ppEdit})
  flipPi = () => this.setState({piEdit:!this.state.piEdit})
  flipMaxHD = () => this.setState({maxHitDiceEdit:!this.state.maxHitDiceEdit})
  flipMaxHP = () => this.setState({maxHealthEdit:!this.state.maxHealthEdit})

  handleNameChange = (val) => this.setState({newName:val})
  handleRaceChange = (val) => this.setState({newRace:val})
  handleClassChange = (val) => this.setState({newClass:val})
  handleBackgroundChange = (val) => this.setState({newBackground:val})
  handleACChange = (val) => this.setState({newAC:val})
  handleSpeedChange = (val) => this.setState({newSpeed:val})
  handleInitiativeChange = (val) => this.setState({newInitiative:val})
  handleMaxHealthChange = (val) => this.setState({newMaxHP:val})
  handleProficiencyChange = (val) => this.setState({newProficiency:val})
  handleInspirationChange = (val) => this.setState({newInspiration:val})
  handlePPChange = (val) => this.setState({newPP:val})
  handlePIChange = (val) => this.setState({newPI:val})
  handleMaxHDChange = (val) => this.setState({newMaxHD:val})


  
  render () {

    const {
      char_id,
      name,
      race,
      char_class,
      background,
      max_hp,
      current_hp,
      proficiency,
      passive_perception,
      passive_insight,
      inspiration,
      armor_class,
      initiative,
      speed,
      max_hitdice,
      current_hitdice
    } = this.state.charInfo

    return (
      <div>
        <IndividualCharNav id={this.props.match.params.id} />
        <div className='char-stats-container'>
          
          
          <div className='name-bar'>
            { this.state.nameEdit ? 
              <div className='edit-input'>
                <input placeholder={name} onChange={e => this.handleNameChange(e.target.value)} />
                <button>Save</button>
                <button onClick={()=>this.flipName()}>Cancel</button>
              </div>
            : 
             <span className='name'>{name}
              <div className='edit-pencil' onClick={()=>this.flipName()}>&#x270E;</div>
            </span>
            }
          </div>

        <section className='char-info-container' >
            <div className='char-info-block'>
              <h4>Race:</h4> 
              <span className='info-text'>{race}
                <div className='edit-pencil'>&#x270E;</div>
              </span>
            </div>

            <div className='char-info-block'>
              <h4>Class:</h4>
              <span className='info-text'>{char_class}
                <div className='edit-pencil'>&#x270E;</div>
              </span>
            </div>
            
            <div className='char-info-block'>
              <h4>Background:</h4> 
              <span className='info-text'>{background}
                <div className='edit-pencil'>&#x270E;</div>
              </span>
            </div>

          </section>

          <section className='combat-stats' >

            <section className='hp-ac-speed'>
              

              <section className='char-info-stats'>
                <h4><div className='shield'></div> AC: </h4> 
                <span className='info-text'>{armor_class}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>

              <section className='char-info-stats'>
                <h4>Speed</h4>
                <span className='info-text'> {speed} 
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>

              <section className='char-info-stats'>
                <h4>Initiative</h4>
                <span className='info-text'> {initiative} 
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>



            </section>

              <section className='health-container'>
                <section>
                  <h4>&#x2764; Health: </h4> 
                  <div className='current-max'>
                    <span className='info-text'> {current_hp} / {max_hp} </span>
                    <div className='edit-pencil'>&#x270E;</div>
                  </div>

                </section>

                <section className='health-change'>

                  <div>
                    <input onChange={e=>this.handleHealthAddSubChange(e.target.value)} className='number' placeholder={0}/>              
                  </div>

                  <div className='health-button-container'>
                    
                    <button onClick={() => this.addHealth(char_id,current_hp)} className='health-button'>Add</button>
                    <button onClick={() => this.subHealth(char_id,current_hp)} className='health-button'>Subtract</button>
                    <button onClick={() => this.fullHeal()} className='health-button'>Full Heal</button>
                  </div>
                </section>
              </section>
          </section>

          <section className='extra-stats'>
            
              <section className='extra-info'>
                <h4> Proficiency: </h4> 
                <span className='info-text'>{proficiency}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>
              
              <section className='extra-info'>
                <h4>Inspiration: </h4> 
                <span className='info-text'>{inspiration}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>

              <section className='extra-info'>
                <h4>Passive Perception: </h4> 
                <span className='info-text'>{passive_perception}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>

              <section className='extra-info'>
                <h4>Passive Insight: </h4> 
                <span className='info-text'>{passive_insight}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>
              
              <section className='extra-info'>
                <h4>Current Hit Dice: </h4> 
                <span className='info-text'>{current_hitdice}
                <button className='dice-button' onClick={() => this.addDice()}>+</button>
                <button className='dice-button' onClick={() => this.subDice()}>-</button>
                </span>
              </section>

              <section className='extra-info'>
                <h4>Max Hit Dice: </h4> 
                <span className='info-text'>{max_hitdice}
                  <div className='edit-pencil'>&#x270E;</div>
                </span>
              </section>
          </section>


        </div>


      </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualCharacter)