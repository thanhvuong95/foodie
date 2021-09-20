import React, {useEffect} from 'react'
import {TouchAppSharp, LocalShippingFilled} from '@ricons/material'
import {BowlChopsticks24Filled} from '@ricons/fluent'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './style.scss'
const HomeWork = () => {
    useEffect(() => {
        Aos.init({
            duration:1500,
            once: true
        })
    }, [])
    return (
        <div className = "home-work">
            <div className="container">
                <span data-aos = "fade-right">Work</span>
                <h2 data-aos = "fade-left">How it works</h2>
                <p data-aos = "fade-up" data-aos-delay ="500">It's through mistake that actually can grow get rid of <br /> everything that is not essential to makihave to get bad.</p>
                <div className="home-work__steps">
                    <div className="home-work__step" data-aos = "flip-left" data-aos-delay ="1000">
                        <BowlChopsticks24Filled />
                        <h4>Pick meals</h4>
                        <span>Chose your meals from our diverse weekly menu. Find gluten or dairy free, low carb & veggie options.</span>
                    </div>
                    <div className="home-work__step" data-aos = "flip-left" data-aos-delay ="1500">
                        <TouchAppSharp />
                        <h4>Chose how often</h4>
                        <span>Our team of chefs do the prep work no more chopping, measuring , or sink full off dishes!</span>
                    </div>
                    <div className="home-work__step" data-aos = "flip-left" data-aos-delay ="2000">
                        <LocalShippingFilled />
                        <h4>Fast deliveries</h4>
                        <span>Your freshly prepped 15-min dinner kits arrive on your doorstep in a refrigerated box.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWork
