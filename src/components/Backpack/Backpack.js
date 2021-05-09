import React, { useEffect } from 'react'
import BackpackNav from './BackpackNav';
import { connect } from 'react-redux';

const Backpack = (props) => {
  
    useEffect(() => {
      console.log(props)
    })

    const char = {}
    

    return (
      <div>
        <BackpackNav id={props.match.params.id} />

        <h1>{props.charReducer}</h1>


      </div>
    )
  }
  
  const mapStateToProps = state => {
    return {
      charReducer: state.charReducer,
      userReducer: state.userReducer
    }

  }

export default connect(mapStateToProps) (Backpack)