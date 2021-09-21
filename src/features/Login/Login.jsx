import React, { useState, useEffect} from 'react'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import { selectUser } from './userSlice'
import { useHistory } from 'react-router'
import {useSelector} from 'react-redux'
import './style.scss'
const Login = () => {
  const [toggle, setToggle] = useState(false)
  const history = useHistory()
  const user = useSelector(selectUser)

  useEffect(() => {
    if(user) history.push('/')
  },[user, history])
  
  return (
    <div className="login">
      <div className= "login__container">
        <div className="login__button">
          <div className={`login__button__bg ${toggle && 'active'}`}></div>
          <button onClick = {() => setToggle(false)}>Login</button>
          <button onClick = {() => setToggle(true)}>Register</button>
        </div>
        <div className={`login__form ${toggle && 'active'}`}>
          <SignIn onToggle = {setToggle} isReset = {toggle}/>
          <SignUp onToggle = {setToggle} isReset = {toggle}/>
        </div>
      </div>
    </div>
    

  )
}
export default Login
