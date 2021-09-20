import React, {useEffect, useRef} from 'react'
import './style.scss'
const ScrollTop = () => {
    const scrollRef = useRef(null)
    
    const handleScroll = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    const scrollListener = () => {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            scrollRef?.current?.classList.add('active')
        } else {
            scrollRef?.current?.classList.remove('active')
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollListener)
        return () => window.removeEventListener('scroll', scrollListener)
    }, [])
    return (
        <div className = 'scroll-top' ref = {scrollRef} onClick = {handleScroll}>
            <i className='bx bx-up-arrow-alt' ></i>
        </div>
    )
}

export default ScrollTop
