import React from 'react'
import errorImg from '../../assets/svg/404.svg'
import './style.scss'
import {useHistory} from 'react-router-dom'
const NotFound = ({message}) => {
    const history = useHistory ()
    const handleGoBack = () => {
        history.push('/')
    }
    return (
        <div className = "not-found">
            <img src={errorImg} alt="" />
            <h3>Page not found</h3>
            <p>{message}</p>
            <button className="btn btn__back btn--primary btn--large btn--rounded-xl" onClick = {handleGoBack}>
                <i className='bx bx-arrow-back'></i>
                back to home page
            </button>
        </div>
    )
}

export default NotFound
