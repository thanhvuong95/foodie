import React, {useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './style.scss'
const HomeMenu = () => {
    useEffect(() => {
       Aos.init({
           duration:1500,
           once: true
       })
    }, [])
    return (
        <div className = 'home-menu'>
            <span data-aos = "fade-right">Menu</span>  
            <h2 data-aos = "fade-left">Explore our best menu</h2>
            <p data-aos = "fade-up" data-aos-delay ="500">It's through mistake that actually can grow get rid of <br /> everything that is not essential to makihave to get bad.</p>
            <div className="home-meu__list">
                
            </div>
        </div>
    )
}

export default HomeMenu
