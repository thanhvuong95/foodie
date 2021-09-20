import React from 'react'
import {Food20Regular} from '@ricons/fluent'
import './style.scss'
const Footer = () => {
    return (
        <footer className = "footer">
            <div className="container footer__container"> 
                <div className="footer__left">
                    <div className="footer__logo">
                        <Food20Regular />
                        <span>Foodie</span>
                    </div>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At iusto accusamus molestias saepe tempore, voluptatem nisi? Natus sapiente perspiciatis laudantium totam consectetur. Quibusdam, dolorem itaque. Accusantium tempora dolor facilis dignissimos.</span>
                    <div className="footer__socials">
                        <i className='bx bxl-facebook-square facebook'></i>
                        <i className='bx bxl-instagram-alt instagram' ></i>
                        <i className='bx bxl-twitter twitter' ></i>
                        <i className='bx bxl-youtube youtube' ></i>
                    </div>
                </div>
                <div className="footer__right">
                    <div className="footer__item">
                        <span>Support</span>
                        <ul>
                            <li>Account</li>
                            <li>Support Center</li>
                            <li>Feedback</li>
                            <li>Accebility</li>
                        </ul>
                    </div>
                    <div className="footer__item">
                        <span>Our Menu</span>
                        <ul>
                            <li>Special</li>
                            <li>Popular</li>
                            <li>Categories</li>
                        </ul>
                    </div>
                    <div className="footer__item">
                        <span>Usefool Liks</span>
                        <ul>
                            <li>Payment & Tax</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                            <li>About us</li>
                        </ul>
                    </div>
                    <div className="footer__item">
                        <span>Get In Touch</span>
                        <ul>
                            <li>foodie@gmail.com</li>
                            <li>+84 123 456 789</li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
