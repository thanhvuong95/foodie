import React, { useEffect } from 'react'
import {PlaceFilled} from "@ricons/material"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useSelector, useDispatch} from 'react-redux'
import { selectUser } from '../../features/Login/userSlice';
import { addToCart } from '../../features/Order/cartSlice';
import ToastMessage from '../ToastMessage/ToastMessage';
import toasts, {SUCCESS,ERROR} from '../../utils/static-data/toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {addCartLocal} from '../../utils/localStorage/cartGuest';
import ReactStars from "react-rating-stars-component"
import {Star28Filled} from '@ricons/fluent'
import './style.scss'
import { addToFirebase } from '../../utils/firebaseStore/firebaseStore';
import { toggleFavorite } from '../../utils/firebaseStore/firebaseStore';
import { addToFavorite, selectFavorite } from './favouriteSlice';
const CardItem = ({data, isFavorite}) => {
    const user = useSelector(selectUser)
    const favorite = useSelector(selectFavorite)
    const dispatch = useDispatch()
    const handleAddToCart = async(item) => {
        if(!user) {
            dispatch(addToCart(item))
            ToastMessage(toasts(SUCCESS, 'Added to cart successfully.'))
            addCartLocal(item)
        }
        else {
            try {
                
                await addToFirebase(user.uid, item)
                dispatch(addToCart(item))
                ToastMessage(toasts(SUCCESS, 'Added to cart successfully.'))
            }
            catch(e) {             
                ToastMessage(toasts(ERROR, 'Added to cart failed.'))
            }
        }
    }

    const handleAddFavorite = async(item) => {
        if(!user) {
            ToastMessage(toasts('INFORMATION', 'This feature require login.'))
        }
        else {
            try {
                const {data} = await toggleFavorite(user.uid, item)
                dispatch(addToFavorite(data))
                if(favorite.findIndex(el => el.id === item.id) === -1) {
                    ToastMessage(toasts(SUCCESS, 'Added to favorite successfully. '))
                }
                else {
                    ToastMessage(toasts(SUCCESS, 'Removed from favorite successfully. '))
                }
            }
            catch(error) {
                ToastMessage(toasts(ERROR, 'Added to favorite failed.'))
            }
        }
    }


    return (
        <div className = 'card-item'>          
            <div className="card-item__img">
                <LazyLoadImage 
                    effect="blur"
                    src={data.img} 
                    alt="hero-image"
                />
            </div>
            <div className="card-item__content">
                <div className="card-item__top">
                    <h4 className = "card-item__top__name">{data.name}</h4>
                    <span className = "card-item__top__description" >{data.dsc}</span>
                </div>
                <ReactStars
                    classNames = "cart-item__star"
                    edit = {false}
                    count={5}
                    size={24}
                    value = {data.rate}
                    activeColor="#ffd700"
                    fullIcon={<Star28Filled />}
                 />
                <div className="card-item__bottom">
                    <div className="card-item__bottom__country">
                        <PlaceFilled />
                        {data.country}
                    </div>
                    <div className = "card-item__bottom__price">${data.price}</div>
                </div>
            </div>
            <div className="card-item__actions">
                <div className={`card-item__action ${isFavorite && 'active'}`} onClick = {() => handleAddFavorite(data)} >
                    <i className='bx bx-heart'></i>
                </div>
                <div className="card-item__action" onClick = {() => handleAddToCart(data)}>
                    <i className='bx bx-cart-alt' ></i>
                </div>
            </div>
        </div>
    )
}

export default CardItem
