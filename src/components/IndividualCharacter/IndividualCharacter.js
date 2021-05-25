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

  editName = async () => {
    const { char_id } = this.state.charInfo
    const { newName } = this.state

    await axios.put(`/api/changename/${char_id}`, {newName:newName})
    .then(res=>{
      const arr = this.state.charInfo
      arr.name = newName
      this.setState({charInfo:arr})
      this.flipName()
    })
    .catch(err=>console.log(err))
  }

  editRace = async () => {
    const { char_id } = this.state.charInfo
    const { newRace } = this.state

    await axios.put(`/api/changerace/${char_id}`, {newRace:newRace})
    .then(res=>{
      const arr = this.state.charInfo
      arr.race = newRace
      this.setState({ charInfo:arr })
      this.flipRace()
    })
    .catch(err=>console.log(err))
  }

  editClass = async () => {
    const { char_id } = this.state.charInfo
    const { newClass } = this.state

    await axios.put(`/api/changeclass/${char_id}`, {newClass:newClass})
    .then( async (res) => {
      const arr = this.state.charInfo
      arr.char_class = newClass
      await this.setState({ charInfo:arr })
      this.flipClass()
    })
    .catch(err=>console.log(err))
  }

  editBackground = async () => {
    const { char_id }= this.state.charInfo
    const { newBackground } = this.state

    await axios.put(`/api/changebackground/${char_id}`, {newBackground:newBackground})
    .then(res=>{
      const arr = this.state.charInfo
      arr.background = newBackground
      this.setState({ charInfo:arr })
      this.flipBackground()
    })
    .catch(err=>console.log(err))
  }

  editAC = async () => {
    const { char_id } = this.state.charInfo
    const { newAC } = this.state

    await axios.put(`/api/changeac/${char_id}`, {newAC:newAC})
    .then(res=>{
      const arr = this.state.charInfo
      arr.armor_class = newAC
      this.setState({ charInfo:arr })
      this.flipAc()
    })
    .catch(err=>console.log(err))
  }
  
  editSpeed = async () => {
    const { char_id } =this.state.charInfo
    const { newSpeed } = this.state
  
    await axios.put(`/api/changespeed/${char_id}`, {newSpeed:newSpeed})
    .then(res=>{
      const arr = this.state.charInfo
      arr.speed = newSpeed
      this.setState({ charInfo:arr })
      this.flipSpeed()
    })
    .catch(err=>console.log(err))
  }
  
  editInitiative = async () => {
    const { char_id } =this.state.charInfo
    const { newInitiative } = this.state
  
    await axios.put(`/api/changeinitiative/${char_id}`, {newInitiative:newInitiative})
    .then(res=>{
      const arr = this.state.charInfo
      arr.initiative = newInitiative
      this.setState({ charInfo:arr })
      this.flipInitiative()
    })
    .catch(err=>console.log(err))
  }

  editProficiency = async () => {
    const { char_id } =this.state.charInfo
    const { newProficiency } = this.state
  
    await axios.put(`/api/changeproficiency/${char_id}`, {newProficiency:newProficiency})
    .then(res=>{
      const arr = this.state.charInfo
      arr.proficiency = newProficiency
      this.setState({ charInfo:arr })
      this.flipProficiency()
    })
    .catch(err=>console.log(err))
  }

  editMaxHP = async () => {
    const { char_id } =this.state.charInfo
    const { newMaxHP } = this.state
  
    await axios.put(`/api/changemaxhp/${char_id}`, {newMaxHP:newMaxHP})
    .then(res=>{
      const arr = this.state.charInfo
      arr.max_hp = newMaxHP
      this.setState({ charInfo:arr })
      this.flipMaxHP()
    })
    .catch(err=>console.log(err))
  }

  editInspiration = async () => {
    const { char_id } =this.state.charInfo
    const { newInspiration } = this.state
  
    await axios.put(`/api/changeinspiration/${char_id}`, {newInspiration:newInspiration})
    .then(res=>{
      const arr = this.state.charInfo
      arr.inspiration = newInspiration
      this.setState({ charInfo:arr })
      this.flipInspiration()
    })
    .catch(err=>console.log(err))
  }

  editPP = async () => {
    const { char_id } =this.state.charInfo
    const { newPP } = this.state
  
    await axios.put(`/api/changepp/${char_id}`, {newPP:newPP})
    .then(res=>{
      const arr = this.state.charInfo
      arr.passive_perception = newPP
      this.setState({ charInfo:arr })
      this.flipPp()
    })
    .catch(err=>console.log(err))
  }

  editMaxHD = async () => {
    const { char_id } =this.state.charInfo
    const { newMaxHD } = this.state
  
    await axios.put(`/api/changemaxhd/${char_id}`, {newHD:newMaxHD})
    .then(res=>{
      const arr = this.state.charInfo
      arr.max_hitdice = newMaxHD
      this.setState({ charInfo:arr })
      this.flipMaxHD()
    })
    .catch(err=>console.log(err))
  }

  editPI = async () => {
    const { char_id } =this.state.charInfo
    const { newPI } = this.state
  
    await axios.put(`/api/changepi/${char_id}`, {newPI:newPI})
    .then(res=>{
      const arr = this.state.charInfo
      arr.passive_insight = newPI
      this.setState({ charInfo:arr })
      this.flipPi()
    })
    .catch(err=>console.log(err))
  }

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
                <input className='input-field text' placeholder={name} onChange={e => this.handleNameChange(e.target.value)} />
                <button className='edit-button-save text' onClick={()=>this.editName()}>Save</button>
                <button className='edit-button-cancel text' onClick={()=>this.flipName()}>Cancel</button>
              </div>
            : 
             <span className='name text' onClick={()=>this.flipName()}>{name}</span>
            }
          </div>

        <section className='char-info-container' >

            <div className='char-info-block'>
              <h4 className='text'>Race:</h4> 
              { this.state.raceEdit ? 
              <div className='stat-edit-input'>
                <input className='stat-input-field text' placeholder={race} onChange={e => this.handleRaceChange(e.target.value)} />
                <button className='edit-button-save text' onClick={()=>this.editRace()} >Save</button>
                <button className='edit-button-cancel text' onClick={()=>this.flipRace()}>Cancel</button>
              </div>
              :
              <span className='info-text text' onClick={()=>this.flipRace()}>{race}</span>
              }
            </div>

            <div className='char-info-block'>
              <h4 className='text'>Class:</h4>
              
              { this.state.classEdit ? 
                <div className='stat-edit-input'>
                  <input className='stat-input-field text' placeholder={char_class} onChange={e => this.handleClassChange(e.target.value)} />
                  <button className='edit-button-save text' onClick={()=>this.editClass()} >Save</button>
                  <button className='edit-button-cancel text' onClick={()=>this.flipClass()}>Cancel</button>
                </div>
                :
                <span className='info-text text' onClick={()=>this.flipClass()}>{char_class}</span>
              }
            </div>
            
            <div className='char-info-block'>
              <h4 className='text'>Background:</h4> 
              { this.state.backgroundEdit ? 
                <div className='stat-edit-input'>
                  <input className='stat-input-field text' placeholder={background} onChange={e => this.handleBackgroundChange(e.target.value)} />
                  <button className='edit-button-save text' onClick={()=>this.editBackground()}>Save</button>
                  <button className='edit-button-cancel text' onClick={()=>this.flipBackground()}>Cancel</button>
                </div>
                :
              <span className='info-text text' onClick={()=>this.flipBackground()}>{background}</span>
              }
            </div>

          </section>

          <section className='combat-stats' >

            <section className='hp-ac-speed'>
              

              <section className='char-info-stats'>
                <h4 className='text'><div className='shield'></div> AC: </h4>

                { this.state.acEdit ? 
                  <div className='combat-edit'>
                    <input className='stat-input-field text' placeholder={armor_class} onChange={e => this.handleACChange(e.target.value)} />
                    <div className='button-box'>
                      <button className='edit-button-save text' onClick={()=>this.editAC()}>Save</button>
                      <button className='edit-button-cancel text' onClick={()=>this.flipAc()}>Cancel</button>
                    </div>
                  </div>
                  :
                  <span className='info-text text' onClick={()=>this.flipAc()}>{armor_class}</span>
                }
              </section>

              <section className='char-info-stats'>
                <h4 className='text'>Speed</h4>

                { this.state.speedEdit ? 
                  <div className='combat-edit'>
                    <input className='stat-input-field text' placeholder={speed} onChange={e => this.handleSpeedChange(e.target.value)} />
                    <div className='button-box'>
                      <button className='edit-button-save text' onClick={()=>this.editSpeed()}>Save</button>
                      <button className='edit-button-cancel text' onClick={()=>this.flipSpeed()}>Cancel</button>
                    </div>
                  </div>
                  :
                  <span className='info-text text' onClick={()=>this.flipSpeed()}> {speed} </span>
                }

                </section>

              <section className='char-info-stats'>
                <h4 className='text'>Initiative</h4>
                
                { this.state.initiativeEdit ? 
                  <div className='combat-edit'>
                    <input className='stat-input-field text' placeholder={initiative} onChange={e => this.handleInitiativeChange(e.target.value)} />
                    <div className='button-box'>
                      <button className='edit-button-save text' onClick={()=>this.editInitiative()}>Save</button>
                      <button className='edit-button-cancel text' onClick={()=>this.flipInitiative()}>Cancel</button>
                    </div>
                  </div>
                  :
                  <span className='info-text text' onClick={()=>this.flipInitiative()}> {initiative}</span>
                }
              </section>



            </section>

              <section className='health-container'>
                <section>
                  <h4 className='text'>&#x2764; Health: </h4> 
                  <div className='current-max'>
                    <span className='info-text text'> {current_hp}/</span>
                  { this.state.maxHealthEdit ? 
                    <div className='stat-edit-input text'>
                      <input className='stat-input-field-hp text' placeholder={initiative} onChange={e => this.handleMaxHealthChange(e.target.value)} />
                        <button className='edit-button-save text' onClick={()=>this.editMaxHP()}>Save</button>
                        <button className='edit-button-cancel text' onClick={()=>this.flipMaxHP()}>Cancel</button>
                      </div>
                    :
                    <span className='info-text text' onClick={()=>this.flipMaxHP()}>{max_hp}</span>
                  }
                  </div>

                </section>

                <section className='health-change'>

                  <div>
                    <input onChange={e=>this.handleHealthAddSubChange(e.target.value)} className='number text' placeholder={0}/>              
                  </div>

                  <div className='health-button-container'>
                    
                    <button onClick={() => this.addHealth(char_id,current_hp)} className='health-button text'>Add</button>
                    <button onClick={() => this.subHealth(char_id,current_hp)} className='health-button text'>Subtract</button>
                    <button onClick={() => this.fullHeal()} className='health-button text'>Full Heal</button>
                  </div>
                </section>
              </section>
          </section>

          <section className='extra-stats'>
            
              <section className='extra-info'>
                <h4 className='text'> Proficiency: </h4> 

                { this.state.proficiencyEdit ? 
                  <div className='stat-edit-input'>
                    <input className='stat-input-field text' placeholder={proficiency} onChange={e => this.handleProficiencyChange(e.target.value)} />
                    <button className='edit-button-save text' onClick={()=>this.editProficiency()}>Save</button>
                    <button className='edit-button-cancel text' onClick={()=>this.flipProficiency()}>Cancel</button>
                  </div>
                  :

                  <span className='info-text text' onClick={()=>this.flipProficiency()}>{proficiency}</span>
                }
              </section>
              
              <section className='extra-info'>
                <h4 className='text'>Inspiration: </h4> 
                { this.state.inspirationEdit ? 
                  <div className='stat-edit-input'>
                    <input className='stat-input-field text' placeholder={inspiration} onChange={e => this.handleInspirationChange(e.target.value)} />
                    <button className='edit-button-save text' onClick={()=>this.editInspiration()}>Save</button>
                    <button className='edit-button-cancel text' onClick={()=>this.flipInspiration()}>Cancel</button>
                  </div>
                  :
                <span className='info-text text' onClick={()=>this.flipInspiration()}>{inspiration}
                </span>
                }
              </section>

              <section className='extra-info'>
                <h4 className='text'>Passive Perception: </h4> 

                { this.state.ppEdit ? 
                  <div className='stat-edit-input'>
                    <input className='stat-input-field text' placeholder={passive_perception} onChange={e => this.handlePPChange(e.target.value)} />
                    <button className='edit-button-save text' onClick={()=>this.editPP()}>Save</button>
                    <button className='edit-button-cancel text' onClick={()=>this.flipPp()}>Cancel</button>
                  </div>
                  :
                  <span className='info-text text' onClick={()=>this.flipPp()}>{passive_perception}
                  </span>
                }
              </section>

              <section className='extra-info'>
                <h4 className='text'>Passive Insight: </h4> 
                { this.state.piEdit ? 
                  <div className='stat-edit-input'>
                    <input className='stat-input-field text' placeholder={passive_insight} onChange={e => this.handlePIChange(e.target.value)} />
                    <button className='edit-button-save text' onClick={()=>this.editPI()}>Save</button>
                    <button className='edit-button-cancel text' onClick={()=>this.flipPi()}>Cancel</button>
                  </div>
                  :
                <span className='info-text text' onClick={()=>this.flipPi()}>{passive_insight}
                </span>}
              </section>
              
              <section className='extra-info'>
                <h4 className='text'>Current Hit Dice: </h4> 
                <span className='info-text text'>{current_hitdice}
                <button className='dice-button text' onClick={() => this.addDice()}>+</button>
                <button className='dice-button text' onClick={() => this.subDice()}>-</button>
                </span>
              </section>

              <section className='extra-info'>
                <h4 className='text'>Max Hit Dice: </h4> 
                { this.state.maxHitDiceEdit ? 
                  <div className='stat-edit-input'>
                    <input className='stat-input-field text' placeholder={max_hitdice} onChange={e => this.handleMaxHDChange(e.target.value)} />
                    <button className='edit-button-save text' onClick={()=>this.editMaxHD()} >Save</button>
                    <button className='edit-button-cancel text' onClick={()=>this.flipMaxHD()}>Cancel</button>
                  </div>
                  :
                <span className='info-text text' onClick={()=>this.flipMaxHD()}>{max_hitdice}
                </span>}
              </section>
          </section>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (IndividualCharacter)