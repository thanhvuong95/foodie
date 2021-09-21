import React, {useEffect} from 'react'
import Aos from 'aos'
import Slider from "react-slick"
import ReactStars from "react-rating-stars-component"
import {Star28Filled} from '@ricons/fluent'
import image from '../../../assets/images/review1.jpg'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'aos/dist/aos.css'
import './style.scss'
const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
const HomeReview = () => {
    useEffect(() => {
        Aos.init({
            duration:1500,
            once: true
        })
    }, [])
    return (
        <div className = "home-review">
            <div className="container">
                <span data-aos = "fade-right">Testimonial</span>
                <h2 data-aos = "fade-left">What they are saying</h2>
                <p data-aos = "fade-up" data-aos-delay ="500">It's through mistake that actually can grow get rid of <br /> everything that is not essential to make have to get bad.</p>
                <div className="home-review__slider" data-aos="zoom-in" data-aos-delay ="700">
                    <Slider {...settings}>
                        <div className="home-review__item">
                            <div className="home-review__content">
                                <div className="home-review__avatar">
                                    <img src={image} alt="reviewer" />
                                </div>
                                <span>Kim Yoo Jung</span>
                                <p>They are engaged communicators and dedicated problem-solvers regards less of time constraints. The team manageprojet them.</p>
                                <ReactStars
                                    classNames = "home-review__star"
                                    edit = {false}
                                    count={5}
                                    size={24}
                                    value = {5}
                                    activeColor="#ffd700"
                                    fullIcon={<Star28Filled />}
                                />
                            </div>
                        </div>
                        <div className="home-review__item">
                            <div className="home-review__content">
                                <div className="home-review__avatar">
                                    <img src={image} alt="reviewer" />
                                </div>
                                <span>Kim Yoo Jung</span>
                                <p>They are engaged communicators and dedicated problem-solvers regards less of time constraints. The team manage project them.</p>
                                <ReactStars
                                    classNames = "home-review__star"
                                    edit = {false}
                                    count={5}
                                    size={24}
                                    value = {5}
                                    activeColor="#ffd700"
                                    fullIcon={<Star28Filled />}
                                />
                            </div>
                        </div>
                        <div className="home-review__item">
                            <div className="home-review__content">
                                <div className="home-review__avatar">
                                    <img src={image} alt="reviewer" />
                                </div>
                                <span>Kim Yoo Jung</span>
                                <p>They are engaged communicators and dedicated problem-solvers regards less of time constraints. The team manageprojet them.</p>
                                <ReactStars
                                    classNames = "home-review__star"
                                    edit = {false}
                                    count={5}
                                    size={24}
                                    value = {5}
                                    activeColor="#ffd700"
                                    fullIcon={<Star28Filled />}
                                />
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default HomeReview
