import React from 'react'
import HomeHero from './HomeHero/HomeHero'
import HomeTimeWork from './HomeTimeWork/HomeTimeWork'
import HomeAbout from './HomeAbout/HomeAbout'
import HomeWork from './HomeWork/HomeWork'
// import HomeMenu from './HomeMenu/HomeMenu'
import HomeReview from './HomeReview/HomeReview'
import './style.scss'
const Home = () => {
    return (
        <div className = "home">
            <HomeHero />
            <HomeTimeWork />
            <HomeAbout />
            <HomeWork />
            <HomeReview />
            {/* <HomeMenu /> */}
        </div>
    )
}

export default Home
