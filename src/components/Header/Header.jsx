import React, { useEffect, useRef, useState } from 'react'
import {Food20Regular, Cart16Regular} from '@ricons/fluent'
import {MenuOutlined, CloseRound} from '@ricons/material'
import {useLocation, useHistory} from 'react-router-dom'
import {selectUser} from '../../features/Login/userSlice'
import {useSelector, useDispatch} from 'react-redux'
import Cart from '../Cart/Cart'
import {signOut} from 'firebase/auth'
import {logout} from '../../features/Login/userSlice'
import auth from '../../firebase/firebaseConfig'
import {selectCart} from '../../features/Order/cartSlice'
import userImg from '../../assets/svg/user.svg'
import './style.scss'
const navLinks = [
    {
        path:"/",
        display:"Home"
    },
    {
        path:"/product",
        display:"Order"
    },
    {
        path:"/about",
        display:"About us"
    },
    {
        path:"/contact",
        display:"Contact us"
    }
]
const Header = () => {
    const user = useSelector(selectUser)
    const headerRef = useRef()
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const [show, setShow] = useState(false)
    const {pathname} = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const {totalQty} = useSelector(selectCart)

    const handleClickMenu = () => {
        setIsActiveMenu(!isActiveMenu)
    }

    const shrinkHeader = () => {
        if(document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            headerRef?.current?.classList.add('shrink')
        }
        else {
            headerRef?.current?.classList.remove('shrink')
        }
    }

    const handleChangeRoute = (path) => {
        setIsActiveMenu(false)
        history.push(path)
    }

    const showCart = () => {
        setShow(!show)
    }

    const handleLogin = () => {
        history.push('/login')
    }
    
    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(logout())
          }).catch((error) => {
            // An error happened.
          });
    }

    useEffect(() => {
       window.addEventListener('scroll', shrinkHeader) 
       return () => window.removeEventListener('scroll', shrinkHeader)
    },[])
    return (
        <header className = "header" ref = {headerRef}>
            <div className="container header__container">
                {/* menu icon */}
                <div className="header__menu" onClick = {handleClickMenu}>
                    <MenuOutlined />
                </div>  
                {/* end menu icon */}
                {/* overlay */}
                <div className={`header__overlay ${isActiveMenu ? 'active' : ''}`} onClick = {handleClickMenu}></div>
                {/* end overlay */}
                {/* Logo */}
                <div className="header__logo" onClick = {() => history.push('/')}>
                    <Food20Regular />
                    <span>Foodie</span>
                </div>
                {/* end logo */}
                {/* navbar */}
                <div className={`header__nav ${isActiveMenu ? 'active' : ''}`}>
                     {/* close button */}
                    <div className="header__nav__close" onClick = {handleClickMenu}>
                        <CloseRound />
                    </div>
                    {/* end close button */}
                    <ul className = "header__nav__list">
                        <li className="header__nav__item header__nav__item--mobile">
                            {
                                 user
                                 ?
                                 <> 
                                    <img src={user?.photoURL || userImg} alt="avatar" /> 
                                    <p>{user?.displayName || user?.email}</p>
                                    <span onClick = {handleLogout}>Logout</span>
                                 </>
                                 : 
                                 <>
                                    <i className='bx bx-user'></i>
                                    <span onClick = {() => history.push('/login')}>Login</span>
                                 </>

                            }
                        </li>
                        {
                            navLinks.map((item, index) => (
                                <li key = {index} className={`header__nav__item ${item.path === pathname ? 'active' : ''}`}>
                                     <span onClick = {() => handleChangeRoute(item.path)}>{item.display}</span>
                                </li>
                            ))
                        }
                      
                    </ul>
                </div>
                {/* end navbar */}
                {/* action  */}
                <div className="header__action">
                    <div className="header__action__bag" onClick = {showCart}>
                        <Cart16Regular/>
                        <span className="header__action__number">{totalQty}</span>
                    </div>
                    <Cart onClose = {setShow} onShow = {show} />
                    {
                        user
                        ? 
                            <div className="header__action__user">
                                <div className="header__action__img">
                                    {
                                        user?.photoURL
                                        ? 
                                        <img src={user?.photoURL} alt="avatar" /> 
                                        : 
                                        <i className='bx bx-user'></i>
                                    }
                                    
                                </div>
                                <div className="header__action__arrow"></div>
                                <ul className="header__action__menu">
                                    <li>
                                        <i className='bx bx-info-circle'></i>
                                        Manage Account
                                    </li>
                                    <li>
                                        <i className='bx bxs-bookmark-heart'></i>
                                        My Favorite
                                    </li>
                                    <li>
                                        <i className='bx bxs-news'></i>
                                        My Orders
                                    </li>
                                    <li onClick = {handleLogout}>
                                        <i className='bx bx-exit' ></i>
                                        Logout
                                    </li>
                                    
                                </ul>
                            </div>
                        :
                            <button className="btn btn--primary btn--large btn--rounded-xl btn__sign" onClick = {handleLogin}>
                                Sign In
                            </button>
                    }
                </div>
                {/* end action  */}       
            </div>
            
        </header>
    )
}

export default Header
