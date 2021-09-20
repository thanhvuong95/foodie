import React, {Suspense, useCallback, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../routes/Routes'
import Loading from '../../components/Loading/Loading'
import OrderContextProvider from '../../context/orderContext'
import { onAuthStateChanged } from '@firebase/auth'
import auth from '../../firebase/firebaseConfig'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../Login/userSlice'
import { updateCart } from '../Order/cartSlice'
import {selectUser} from '../../features/Login/userSlice'
import { getDataFromFirebase, updateFirebaseWithDataLocal } from '../../utils/firebaseStore/firebaseStore'
const Layout = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const getCart = useCallback(() => {
        const oldCart = localStorage.getItem('cart')
        if(!user) {
            if(oldCart)
                dispatch(updateCart(JSON.parse(oldCart)))
            else {
                dispatch(updateCart({data:[], totalQty:0, totalAmount:0}))
            }
        }
    },[user, dispatch])

   

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                const {uid, email, photoURL, displayName} = userAuth
                dispatch(login({uid, email, photoURL, displayName}))
            }
        })    
    },[dispatch])
    
    useEffect(() => {
        window.addEventListener('load', getCart)
        return () => window.removeEventListener('load', getCart)
    }, [getCart])

    useEffect(() => {
        if(user) {
            // get item from firebase database
            const updateCartData = async () => {
                const localData = JSON.parse(localStorage.getItem('cart'))
                if(localData) {
                        const data = await updateFirebaseWithDataLocal(user.uid, localData)
                        dispatch(updateCart(data))
                        localStorage.removeItem('cart')
                }
                else {
                    const data = await getDataFromFirebase(user.uid)
                    if(data) {
                        dispatch(updateCart(data))
                    }
                    else {
                        dispatch(updateCart({data:[], totalQty:0, totalAmount:0}))
                    }
                }
            }
            updateCartData()
        }
        else {
            getCart()
        }
    }, [user, getCart, dispatch])
    return (
        <BrowserRouter>
            <Suspense fallback = {<Loading />}>
                <OrderContextProvider>
                    <section className = "food-app">
                        <Routes />
                    </section>
                </OrderContextProvider>
            </Suspense>
        </BrowserRouter>
    )
}

export default Layout
