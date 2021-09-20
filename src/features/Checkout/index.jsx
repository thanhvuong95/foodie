import React from 'react'
import CheckoutContent from './CheckoutContent/CheckoutContent'
import CheckoutLogin from './CheckoutLogin/CheckoutLogin'
import {useSelector} from 'react-redux'
import {selectUser} from '../Login/userSlice'
import './style.scss'

const Checkout = () => {
    const user = useSelector(selectUser)
    return (
        <div className = 'checkout'>
            <div className="container">
                {
                    user ? <CheckoutContent /> : <CheckoutLogin />
                }
            </div>
        </div>
    )
}

export default Checkout
