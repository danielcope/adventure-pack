import React, { Component } from 'react'
import BackpackNav from './BackpackNav';
import { connect } from 'react-redux';
import { getItemArr } from '../../redux/backpackReducer'
import axios from 'axios';
import BackpackList from './BackpackList';
import AddItem from './AddItem';

import './Backpack.css'

class Backpack extends Component {
  constructor () {
    super()
    this.state = {
      charInfo: {}
    }
  }

  componentDidMount = async () => {
    this.getBackpack()
    this.storeChar()
  }

  storeChar = () => {
    for (let i = 0; i < this.props.charReducer.character.length; i++) {
      if (parseInt(this.props.charReducer.character[i].char_id) === parseInt(this.props.match.params.id)) {
        this.setState({charInfo:this.props.charReducer.character[i]})
      }
    }
  }
  
  getBackpack = async () => {
    const id = parseInt(this.props.match.params.id)

    await axios.get(`/api/backpack/${id}`)
    .then(res=>{
      this.props.getItemArr(res.data)
    })
    .catch(err=>console.log(err))
  }

    
  render () {
    return (
      <section>
        <BackpackNav id={this.props.match.params.id} />
        <AddItem id={this.props.match.params.id} getBackpack={this.getBackpack}/>
        <h1 className='backpack-owner text'>{this.state.charInfo.name}'s Backpack</h1>

        <BackpackList getBackpack={this.getBackpack} />
      </section>
    )
  }
}
  
const mapStateToProps = state => state

export default connect(mapStateToProps, {getItemArr}) (Backpack)