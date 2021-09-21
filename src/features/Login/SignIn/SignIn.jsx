import React, {useEffect, useState} from  'react'
import welcomeImg from '../../../assets/svg/welcome.svg' 
import {useHistory} from 'react-router-dom'
import { schemaSignIn } from '../../../utils/validation/validate'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import auth, {googleProvider, facebookProvider} from '../../../firebase/firebaseConfig'
import { signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth'
import {useSelector, useDispatch} from 'react-redux'
import { selectUser, login } from '../userSlice'

import '../style.scss'

const SignIn = ({onToggle, isReset}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const history = useHistory()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schemaSignIn)
  });

  const handleLoginWithEmail =  ({email:emailAuth, password}) => { //same email name
    const authUser = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, emailAuth, password)
        const {uid, displayName, email, photoURL} = userCredential.user
        dispatch(login({uid, displayName, email, photoURL}))
        history.push('/')
      }
      catch(error){
        setIsLoading(false)
        if(error.code === 'auth/user-not-found') {
          setError("The email address provided is not registered.")
        }
        else {
          setError("Email or password invalid.")
        }
      }
    }
    authUser()
  }

  const handleLoginSocial = (provider) => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const {uid, displayName, email, photoURL} = result.user;
        dispatch(login({uid, displayName, email, photoURL}))
        history.push('/')
      }).catch((error) => {

      });
  }
// reset value & error when switch form
  useEffect(() => { 
    if(!isReset) {
      reset({
        email:"",
        password:"",
      })
      setError(null)
    }
  },[isReset, reset])
  
    return (
        <div className="login__form__sign-in">
            <div className="login__img">
              <img src={welcomeImg} alt="welcome" />
            </div>
            {error && <p className = "login__message login__message--center">{error}</p>}
            <div className="login__wrapper">
              <div className="login__input">
                <i className='bx bxs-user'></i>
                <input type="text" placeholder = "Email" {...register("email")}/>
              </div>
              {errors.email && <p className = "login__message">{errors.email.message}</p>}
            </div>
            <div className="login__wrapper">
              <div className="login__input">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder = "Password" {...register("password")}/>
              </div>
              {errors.password && <p className = "login__message">{errors.password.message}</p>}
            </div>
              <div className="login__bottom">
                <button className = 'btn btn__sign-in btn--primary btn--large btn--rounded-xl' onClick = {handleSubmit(handleLoginWithEmail)}
                >
                  {
                    isLoading ?<i className='bx bx-loader-circle login__spin'></i> : 'Sign in'
                  }
                </button>
                <button  className = 'btn btn--large btn--rounded-xl btn__sign-in btn__google' onClick = {() => handleLoginSocial(googleProvider)}>Sign in with google</button>
                <button  className = 'btn btn--large btn--rounded-xl btn__sign-in btn__facebook' onClick = {() => handleLoginSocial(facebookProvider)}>Sign in with facebook</button>
                <p>Don't have an account? <span onClick = {() => onToggle(true)}>Sign up here.</span></p>
              </div>
          </div>
    )
}

export default SignIn
