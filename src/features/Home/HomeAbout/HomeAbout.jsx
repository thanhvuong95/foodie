import React, {useEffect} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Aos from 'aos'
import 'aos/dist/aos.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import './style.scss'
import bgImg from '../../../assets/images/hero.png'
const HomeAbout = () => {
    useEffect(() => {
        Aos.init({
            duration:1500,
            once: true
        })
    }, [])
    return (
        <div className = "home-about">
            <div className="container">
                <div className="home-about__container">
                    <div className="home-about__img" data-aos = "fade-right">
                        <LazyLoadImage
                                effect="blur"
                                src={bgImg}
                                alt="about-image"
                            />
                    </div>
                    <div className="home-about__content">
                        <span className = "home-about__content__text" data-aos = "fade-right" data-aos-delay="500" data-aos-easing="ease-out">About</span>
                        <h2 data-aos = "fade-left" data-aos-delay="500" data-aos-easing="ease-out">Food is  an important part  of a balanced diet</h2>
                        <span data-aos = "fade-up" data-aos-delay="700">They actually assured me over and over that take little time off and come back and work. Fast forward tow weeks after we are going for a new project.
                        <br/>
                         I wrote to let them  know ready to come back they kicked me of their team slack all of us are make company email.
                        </span>
                        <div className="home-about__button">
                            <button className="btn btn--large btn--primary btn--rounded-xl" data-aos = "fade-up" data-aos-delay="800">Learn more</button>
                            <a href = 'https://www.youtube.com/watch?v=f5hbmw7Ba7c' target ='_blank' rel="noreferrer" className="btn__watch" data-aos = "fade-up" data-aos-delay="800">
                                <span>
                                    <i className='bx bx-play'></i>
                                </span>
                                Watch now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAbout
