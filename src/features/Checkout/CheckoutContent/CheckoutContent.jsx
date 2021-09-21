import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectCart} from '../../Order/cartSlice'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCheckout } from '../../../utils/validation/validate';
import checkoutImg from '../../../assets/svg/checkout.svg'
import {useHistory} from 'react-router-dom'
import { removeDataFirebaseById } from '../../../utils/firebaseStore/firebaseStore';
import {selectUser} from '../../Login/userSlice'
import Dialog from '../../../components/Dialog/Dialog';
import {removeAll} from '../../Order/cartSlice'
import '../style.scss'

const CheckoutContent = () => {
    const [showDialog, setShowDialog] = useState(false)
    const [typeDialog, setTypeDialog] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history = useHistory()


    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schemaCheckout)
      });

    const {data, totalAmount} = useSelector(selectCart)
  
    const handleCheckout = async () => {
        if(!data.length) {
            setShowDialog(true)
            setTypeDialog('empty')
        }
        else {
            await removeDataFirebaseById(user.uid)
            dispatch(removeAll())
            setTypeDialog('success')
            setShowDialog(true)
            setIsSuccess(true)
        }
    }

    return (
        <>
                 <h2>Checkout</h2>
                <ul className="checkout__steps">
                    <li className ="active">Login</li>
                    <li className = {isSuccess && 'active'}>Information</li>
                    <li className = {isSuccess && 'active'}>Payment</li>
                </ul>
                <div className="checkout__content">
                    <div className="checkout__cart">
                        <h4>Order Detail</h4>
                        <div className="checkout__cart__items">
                                {
                                    data.length
                                    ?
                                    data.map((item, index) => (
                                        <div className="checkout__cart__item" key = {index}>
                                            <div className="checkout__cart__img">
                                                <img src={item.img} alt="images" />
                                                <span>{item.quantity}</span>
                                            </div> 
                                            <div className="checkout__cart__info">
                                                <p>{item.name}</p>
                                                <span>{item.country}</span>
                                            </div>
                                             <span>${item.price}</span>   
                                        </div>
                                    ))
                                    :
                                    <img src={checkoutImg} alt="empty" className = "checkout__empty-img" />
                                }
                        </div>
                        <div className="checkout__cart__amount">
                            <span>Total Amount:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <h4>Confirm Information</h4>
                        <div className="checkout__group-input checkout__group-name">
                            <div className="checkout__group-name__wrap">
                                <label className = "checkout__input">
                                    <input type="text" required {...register("firstName")}/>
                                
                                    <span>First Name</span>
                                </label>
                                {errors.firstName && <p className = "checkout__message">{errors.firstName.message}</p>}

                            </div>
                            <div className="checkout__group-name__wrap">
                                <label className = "checkout__input">
                                    <input type="text" required {...register("lastName")}/>
                                    <span>Last Name</span>
                                </label>
                                 {errors.lastName && <p className = "checkout__message">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="checkout__group-input">
                            <label className = "checkout__input">
                                <input type="text" required {...register("address")}/>
                                <span>Address</span>
                            </label>
                        </div>
                            {errors.address && <p className = "checkout__message">{errors.address.message}</p>}
                        <div className="checkout__group-input">
                            <label className = "checkout__input">
                                <input type="text" required {...register("phone")}/>
                                <span>Phone</span>
                            </label>
                        </div>
                        {errors.phone && <p className = "checkout__message" >{errors.phone.message}</p>}
                        <div className="checkout__button">
                            <button className="btn btn--secondary btn--rounded-sm btn--large" onClick = {()=>history.push('/product')}>Return Order</button>
                            <button className="btn btn--primary btn--rounded-sm btn--large" onClick = {handleSubmit(handleCheckout)}>Checkout</button>
                        </div>
                    </div>
                    
                </div>
                <Dialog isShow = {showDialog} onShow = {setShowDialog} type = {typeDialog}/>
        </>
    )
}

export default CheckoutContent
