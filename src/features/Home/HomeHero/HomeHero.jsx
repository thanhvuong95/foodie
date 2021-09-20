import React, { useEffect } from 'react'
import {ArrowRight16Regular} from "@ricons/fluent"
import Aos from 'aos'
import bgHero from '../../../assets/images/hero.jpg'
import 'aos/dist/aos.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import './style.scss'
const HomeHero = () => { 
    useEffect(() => {
        Aos.init({
            duration:1500,
            offset: 80,
            once: true
        })
    }, [])
    return (
        <div className = "home-hero" 
        style = {{
            backgroundImage:`url(${bgHero})`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }}
        >
            <div className="home-hero__content">
                <div className="container">
                    <div className="home-hero__content__wrapper">
                        <h1 data-aos="fade-right" className="home-hero__heading">Your favourite food delivered hot &  fresh</h1>
                        <span data-aos="fade-left" data-aos-delay="500"  className="home-hero__description">Healthy switcher chef do all the prep work, like peeding, chopping & marinating, so you can cook a fresh food </span>
                        <button data-aos="fade-up" data-aos-delay="1000" className="btn btn__order btn--primary btn--large btn--rounded-xl">
                            <span>Order now</span>
                            <ArrowRight16Regular />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHero
