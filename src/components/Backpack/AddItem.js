import axios from 'axios';
import React, { Component } from 'react'

class AddItem extends Component {
  constructor (){
    super();
    this.state = {
      itemName: 'none',
      itemDesc: 'none',
      menu: false
    }
  }
   
  addItem = async () => {
    const { itemName,itemDesc } = this.state
    const char_id = parseInt(this.props.id)
    console.log(char_id,itemName,itemDesc);

    await axios.post('/api/backpack', {name:itemName,desc:itemDesc,char_id:char_id})
    .then(res=>
      alert('Item Added!'))
      this.props.getBackpack()
      this.flipMenu()
  }

  flipMenu = () => this.setState({menu:!this.state.menu})

  handleName = (val) => this.setState({itemName:val})
  handleDesc = (val) => this.setState({itemDesc:val})

  render(){

    return (
      <div>
        <div className='add-char-button text'>
          { !this.state.menu ? 
          <span className='add text' onClick={() => this.flipMenu()}>Add &#43;</span>
          : <span className='add text' onClick={() => this.flipMenu()}>Close X</span>
          }

        </div>
          <section className={ this.state.menu ? 'add-form-opened text' :
        'add-form-closed text'}>
            <section className='add-item-block'>
              <label className='header'>Item Name</label>
              <input className='add-item-input text' onChange={e=>this.handleName(e.target.value)} placeholder='add item'/>
            </section>
            <section className='add-item-block'>
              <label className='header'>Item Description</label>
              <input onChange={e=>this.handleDesc(e.target.value)} className='desc-input text'/>
            </section>

            <button className='add-item-button' onClick={() => this.addItem()}>Add Item</button>
              
          </section>

      </div>
    )
  }
}

export default AddItem