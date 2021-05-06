import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Character from './components/Character/Character'
import IndividualCharacter from './components/IndividualCharacter/IndividualCharacter'
import AllSpells from './components/AllSpells/AllSpells'
import IndividualSpell from './components/IndividualSpell/IndividualSpell'
import Backpack from './components/Backpack/Backpack'
import Journal from './components/Journal/Journal'
import SpellBook from './components/SpellBook/SpellBook'


export default (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route path='/allcharacters' component={Character} />
    <Route path='/individualcharacter/:id' component={IndividualCharacter} />

    <Route path='/allspells' component={AllSpells}/>
    <Route path='/individualspell/:id' component={IndividualSpell} />

    <Route path='/backpack/:id' component={Backpack} />

    <Route path='/journal/:id' component={Journal} />

    <Route path='/spellbook/:id' component={SpellBook} />

  </Switch>
)