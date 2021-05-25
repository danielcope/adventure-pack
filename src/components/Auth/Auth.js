import axios from 'axios';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { updateUser } from '../../redux/userReducer'

import './Auth.css'

class Auth extends Component {
  constructor (props){
    super(props);
    this.state = {
      username:'',
      password:'',
      email:'',
      errorMsg:''
    }
  }

  handleUsernameChange (val) {
    this.setState({ username:val })
  }
  
  handlePasswordChange (val) {
    this.setState({ password:val })
  }

  handleEmailChange (val) {
    this.setState({ email:val })
  }

  register = async () => {
    const {username,password,email} = this.state;

    await axios.post('/auth/register', {username:username,password:password,email:email})

    .then( async (res) => {
      axios.post('/auth/emailthanks',{email:email})
        .then(async (res)=>{
          console.log('Email sent');
        })
        .catch(err=>{
          console.log(err)
          this.setState({errorMsg:'Incorrect email'})
        })
        
      await this.props.updateUser(res.data)
      alert('User Registered!')
      await this.props.history.push(`/allcharacters`)
    })
    
    .catch(err => {
      console.log(err)
      this.setState({errorMsg:'Username or email taken!'})
    })
  }
  
  login = async () => {
    const {username,password} = this.state;
    
    await axios.post('/auth/login', {username:username,password:password})

    .then(res => {
      this.props.updateUser(res.data)
      this.props.history.push('/allcharacters')
    })

    .catch(err => {
      console.log(err)
      this.setState({errorMsg: 'Please enter a valid username and password'})
    })
  }

  closeErrorMsg = () => {
    this.setState({
      errorMsg: false,
      username: '',
      password:'',
      email:''
    })
  }

  render(){

    return (
      <div className='auth'>
        <section className='auth-container'>
          
            <div className='auth-box'>
              <input className='auth-input-box text' value={this.state.username} placeholder='username' required onChange={e => this.handleUsernameChange(e.target.value)} />
            </div>
            <div className='auth-box'>
              <input className='auth-input-box text' value={this.state.email} placeholder='email' onChange={e => this.handleEmailChange(e.target.value)} />
            </div>
            <div className='auth-box'>
              <input className='auth-input-box text' value={this.state.password} type='password' placeholder='password' required onChange={e => this.handlePasswordChange(e.target.value)} />
            </div>
            <section className='auth-button-container'>
              <button className='login-button text' onClick={this.login}>Login</button>
              <button className='register-button text' onClick={this.register}>Register</button>
            </section>
        </section>
        {this.state.errorMsg && <h3 className='auth-error-msg text'>
          {this.state.errorMsg} <span className='close-err text' onClick={this.closeErrorMsg}>X</span></h3>}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect (mapStateToProps,{updateUser}) (Auth)