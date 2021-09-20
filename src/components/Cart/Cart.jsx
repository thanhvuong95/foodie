import React, { useState } from 'react'
import emptyImg from '../../assets/svg/empty-cart.svg'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { decreaseQty, selectCart , increaseQty, removeById} from '../../features/Order/cartSlice'
import {selectUser} from '../../features/Login/userSlice'
import './style.scss'
import { updateCartLocal, removeCartLocalById } from '../../utils/localStorage/cartGuest'
import { updateDataFirebase } from '../../utils/firebaseStore/firebaseStore'
import Dialog from '../Dialog/Dialog'
const Cart = ({onShow, onClose}) => {
    const user = useSelector(selectUser)
    const cart = useSelector(selectCart)
    const {data, totalAmount} = useSelector(selectCart)
    const history = useHistory()
    const isDisable = cart.data.length ? false : true
    const [showDialog, setShowDialog] = useState(false)
    const handleBuyMore = () => {
        history.push('/product')
        onClose(false)
    }
    const handleCheckout = () => {
       if(!user) {
            onClose(false)
           setShowDialog(true)
       }
       else {
            onClose(false)
           history.push('/checkout')
       }
    }
    return (
        <>
            <div className={`cart__overlay ${onShow && 'active'}`} onClick= {() => onClose(false)}></div>
            <div className = {`cart ${onShow && 'active'}`}>
                <div className="cart__content">
                    <div className="cart__top">
                        <h2>my cart</h2>
                        <i className='bx bx-right-arrow-alt' onClick= {() => onClose(false)}></i>
                    </div>
                    <div className="cart__body">
                        {
                            data.length
                            ?
                            <CartData data = {data}/>
                            :
                            <CartEmpty />
                            
                        }
                    </div>
                    <div className="cart__bottom">
                        <div className="cart__total">
                            <h2>Total:</h2>
                            <span>${totalAmount ? totalAmount.toFixed(2) : 0}</span>
                        </div>
                        <div className="cart__button">
                            <button className="btn btn--secondary btn--large  btn--rounded-sm" onClick = {handleBuyMore}>Buy More</button>
                            <button className="btn btn__checkout btn--primary btn--large btn--rounded-sm" onClick = {handleCheckout} disabled = {isDisable}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog onShow = {setShowDialog} isShow = {showDialog} type = 'login'/> 
        </>
    
    )
}
const CartEmpty = () => {
    return (
        <div className="cart__empty">
            <img src={emptyImg} alt="images" />
            <span>No item in your cart.</span>
        </div>
    )
}
const CartData = ({data}) => {
    const user = useSelector(selectUser)
   

    const dispatch = useDispatch()

    const handleDecreQty = async(id) => {
        if(!user) {
            dispatch(decreaseQty(id))
            updateCartLocal(id, 'DECREASE')
        }
        else {
            updateDataFirebase(user.uid, id, 'DECREASE')
            dispatch(decreaseQty(id))
        }
    }
    const handleIncreQty = async(id) => {
        if(!user) {
            dispatch(increaseQty(id))
            updateCartLocal(id, 'INCREASE')
        }
        else {
            updateDataFirebase(user.uid, id, 'INCREASE')
            dispatch(increaseQty(id))
        }
    }
    
    const handleDelete = async(id) => {
        if(!user) {
            dispatch(removeById(id))
            removeCartLocalById(id)
        }
        else {
            updateDataFirebase(user.uid, id, 'DELETE')
            dispatch(removeById(id))
        }
    }
    return(
        <>
        {
            data.map((item, index) => (
                <div className="cart__data" key = {index}>
                    <img src = {item.img} alt='images' className="cart__data__img" />
                    <div className="cart__data__info">
                        <p>{item.name}</p>
                        <span>${item.price}</span>
                    </div>
                    <div className="cart__data__qty">
                        <button disabled = {Boolean(Number(`${item.quantity === 1 ? 1 : 0}`))} onClick = {() =>handleDecreQty(item.id)}> - </button>
                        <span>{item.quantity}</span>
                        <button onClick = {() => handleIncreQty(item.id)}> + </button>
                    </div>
                    <div className="cart__data__delete" onClick = {() =>handleDelete(item.id)}>
                        <i className='bx bx-trash-alt'></i>
                    </div>
                </div>
            ))
        }
            
        
        </>
    )
}
export default Cart
