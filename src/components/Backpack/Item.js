import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackpackNav from './BackpackNav';

class Item extends Component {
  constructor (){
    super();
    this.state = {
      item: [],
      editName: false,
      editDesc: false,
      newName: 'none',
      newDesc: 'none'
    }
  }

  componentDidMount = () => {
    this.storeItem()
  }

  storeItem = () => {
    for (let i = 0; i < this.props.backpackReducer.backpack.length; i ++){
      if(parseInt(this.props.backpackReducer.backpack[i].item_id) === parseInt(this.props.match.params.id)) {
        this.setState({item:this.props.backpackReducer.backpack[i]})
      }
    }
  }

  flipName = () => this.setState({editName:!this.state.editName})
  flipDesc = () => this.setState({editDesc:!this.state.editDesc})
  
  handleNameInput = (val) => this.setState({newName:val})
  handleDescInput = (val) => this.setState({newDesc:val})

  editName = async () => {
    const { item_id } = this.state.item
    const { newName } = this.state

    await axios.put(`/api/backpack/${item_id}`, {name: newName})
    .then(res=> {
      const arr = this.state.item
      arr.item_name = newName
      this.setState({item: arr})
      this.flipName()
    })
    .catch(err=>console.log(err))
  }
  
  editDesc = async () => {
    const { item_id } = this.state.item
    const { newDesc } = this.state
  
    await axios.put(`/api/backpackdesc/${item_id}`, {desc: newDesc})
    .then(res=> {
      const arr = this.state.item
      arr.item_desc = newDesc
      this.setState({item: arr})
      this.flipDesc()
    })
    .catch(err=>console.log(err))
  }

  render(){
   
    

    return (
      <div >
        <BackpackNav />

        <div className='container-item'>
          { this.state.editName ?
          <div className='input-block'>
            <input onChange={e=>this.handleNameInput(e.target.value)} className='new-name-input' placeholder={this.state.item.item_name} />
            <button className='save-button' onClick={() => this.editName()}>Save</button>
            <button className='cancel-button' onClick={() => this.flipName()}>Cancel</button>
          </div>
          :
          <div className='name-item'>
            <span  onClick={() => this.flipName()}>{this.state.item.item_name}</span>
          </div>
          }

          { this.state.editDesc ? 
          <div className='desc-input-block'>
            <div className='desc-button'>
              <button className='save-button' onClick={()=>this.editDesc()}>Save</button>
              <button className='cancel-button' onClick={() => this.flipDesc()}>Cancel</button>
            </div>
            <input className='desc-input' placeholder={this.state.item.item_desc} onChange={e=>this.handleDescInput(e.target.value)} />
          </div>
          :

          <p onClick={()=>this.flipDesc()}>{this.state.item.item_desc}</p>
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (Item)