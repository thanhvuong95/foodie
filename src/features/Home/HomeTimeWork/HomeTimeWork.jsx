import React, {useEffect} from 'react'
import {AccessTimeFilledRound, PlaceRound, HeadphonesRound} from '@ricons/material'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './style.scss'
const HomeTimeWork = () => {
    useEffect(() => {
        Aos.init({
            duration:1500,
            once: true
        })
    }, [])
    return (
        <div className = "home-time">
            <div className="container">
                <div className="home-time__container">
                    <div className="home-time__item" data-aos = "flip-up">
                        <div className="home-time__icon">
                            <AccessTimeFilledRound />
                        </div>
                        <div className="home-time__text">
                            <h4>Time 10:00 am - 7:00 pm</h4>
                            <span>Working hour</span>
                        </div>
                    </div>
                    <div className="home-time__item" data-aos = "zoom-in" data-aos-delay= "500">
                        <div className="home-time__icon">
                            <PlaceRound />
                        </div>
                        <div className="home-time__text">
                            <h4>Bien Hoa- Dong Nai</h4>
                            <span>Get Directions</span>
                        </div>
                    </div>
                    <div className="home-time__item" data-aos = "flip-down" data-aos-delay=     "1000">
                        <div className="home-time__icon">
                            <HeadphonesRound />
                        </div>
                        <div className="home-time__text">
                            <h4>+84 (012)345 6789</h4>
                            <span>Call Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTimeWork
