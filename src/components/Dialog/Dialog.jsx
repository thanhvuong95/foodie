import React from 'react'
import { useHistory } from 'react-router'
import './style.scss'
const dialogType = {
    login: {
        title:'Join with us',
        desc:'You are not logged in. Please login & try again.'
    },
    empty: {
        title:'Order us services',
        desc:'Your cart is empty. Please order & try again.'
    },
    success: {
        title:'Order Successfully Places',
        desc:'Thank you for ordering. We received your order & will begin processing it soon.'
    }
}
const Dialog = (props) => {
    const {isShow, onShow, type} = props
    const history= useHistory()

    const handleLogin = () => {
        onShow(!isShow)
        if(type === 'login') {
            history.push('/login')
        }
        else {
            history.push('/product')
        }
    }
   
    return (
        <>
        <div className = {`dialog ${isShow && 'active'}`}>
            <h3>
                <i className='bx bxs-info-circle'></i>
                {dialogType[type]?.title}
            </h3>
            <span>{dialogType[type]?.desc}</span>
            <div className="dialog__button">
                <button className="btn btn__close btn--small btn--rounded-sm btn--secondary" onClick = {() => onShow(!isShow)}>
                    Close
                </button>
                <button className="btn btn--primary btn--rounded-sm btn--small btn__login " onClick = {handleLogin}>
                   {type === 'login' ? 'Login' : type === 'success' ? 'Continue Order' : 'Order now'}
                </button>
            </div>
        </div>
        <div className={`dialog__overlay ${isShow && 'active'}`}></div>
        </>
    )
}

export default Dialog
