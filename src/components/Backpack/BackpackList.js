import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class BackpackList extends Component {
  constructor (){
    super();
    this.state = {
      
    }
  }

  delete = async (item_id) => {
    
    await axios.delete(`/api/backpack/${item_id}`)
    .then(res=>{
      this.props.getBackpack()
    })
    .catch(err=>console.log(err))
  }

  render(){

    const mappedBackpack = this.props.backpackReducer.backpack.map((ele,i)=>(
      <section key={ele.item_id} className='item-container'>
        <button className='delete-item text' onClick={() => this.delete(ele.item_id)}>X</button>
        <span className='item-name text'>{ele.item_name}</span>
        <Link className='view text' to={`/item/${ele.item_id}`}>View</Link>
      </section>
    ))


    return (
      <div className='mapped-items'>{mappedBackpack}</div>
    )
  }
}

const mapStateToProps = state => state

export default connect (mapStateToProps) (BackpackList)
