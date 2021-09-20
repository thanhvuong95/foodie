import React from 'react'
import loginImg from '../../../assets/svg/login.svg'
import {useHistory} from 'react-router-dom'
import '../style.scss'
const CheckoutLogin = () => {
    const history = useHistory()
    return (
        <div className = 'checkout__login'>
            <img src={loginImg} alt="login" />
            <p>You are not logged in. Please login & try again.</p>
            <button className="btn btn--large btn--primary btn--rounded-xl" onClick = {() => history.push('/login')}>Go to Login Page</button>
        </div>
    )
}

export default CheckoutLogin
