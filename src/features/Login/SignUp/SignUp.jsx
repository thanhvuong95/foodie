import React, { useCallback, useEffect, useState } from 'react'
import joinImg from '../../../assets/svg/join.svg' 
import { schemaSignUp } from '../../../utils/validation/validate'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import auth from '../../../firebase/firebaseConfig'
import '../style.scss'
const SignUp = ({onToggle, isReset}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schemaSignUp)
  });

  const resetForm = useCallback(() => {
    reset({
      email:"",
      password:"",
      confirmPassword:""
    })
  },[])

  const createAccount = ({email, password}) => {
    const createUser = async() => {
      setIsLoading(true)
      setError(null)
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        if(userCredential) {
          setIsLoading(false)
          resetForm()
        }
      }
      catch(error) {
        setIsLoading(false)
        if(error.code === 'auth/email-already-in-use') {
          setError('The email address provided is  registered.')
        }
        else {
          setError('Something went wrong.')
        }
      }
    }
    createUser()
}

  useEffect(() => {
    if(!isReset) resetForm()
      
  },[isReset, reset, resetForm])

  
    return (
      <div className="login__form__sign-up">
        <div className="login__img">
          <img src={joinImg} alt="welcome" />
        </div>
        {error && <p className = "login__message login__message--center">{error}</p>}
        <div className="login__wrapper">
          <div className="login__input">
            <i className='bx bxs-user'></i>
            <input type="text" placeholder = "Email" {...register("email")} />
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
        <div className="login__wrapper">
          <div className="login__input">
            <i className='bx bxs-lock-alt'></i>
            <input type="password" placeholder = "Confirm Password" {...register("confirmPassword")}/>
          </div>
          {errors.confirmPassword && <p  className = "login__message">{errors.confirmPassword.message}</p>}
        </div>
        <div className="login__bottom">
          <button className = 'btn btn__sign-in btn--primary btn--large btn--rounded-xl' onClick = {handleSubmit(createAccount)}>
          {
            isLoading ?<i className='bx bx-loader-circle login__spin'></i> : 'Sign up'
          } 
          </button>
          <p>Already have an account? <span onClick = {() => onToggle(false)}>Sign in here.</span></p>
        </div>
    </div>
    )
}

export default SignUp
