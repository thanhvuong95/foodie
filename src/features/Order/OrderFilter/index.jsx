import React, {useContext, useState, useEffect, useRef} from 'react'
import categories from '../../../utils/static-data/categories'
import InputRange from 'react-input-range'
import StarRatings from 'react-star-ratings'
// import {Star28Filled, Star28Regular} from '@ricons/fluent'
import { OrderContext } from '../../../context/orderContext'
import "react-input-range/lib/css/index.css"
import './style.scss'
const OrderFilter = () => {
    const {changeOptions, changeType, type} = useContext(OrderContext)
    const [rate, setRate] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const [price, setPrice] = useState({
        data: {
            min: 0,
            max: 500,
        },
    })
    const searchRef = useRef(null)


    const handleChangeRating = (value) => {
        setRate(value)
        changeOptions({rate_like:value})
    }

    const handleChangePrice = value => {
        setPrice({data:value}) 
    } 

    const handleSearch = () => {
        changeOptions({q:searchRef.current.value})
    }

    const handleChangeType = (value) => {
        setRate(0)
        setPrice({
            data: {
                min: 0,
                max: 500,
            },
        })
        changeType(value)
    }

    useEffect(() => {
        // Delay update state sort (0.5s) when change range price
        if(price.data.min !== 0 || price.data.max !== 500) {
            const timer = setTimeout(() => changeOptions({price_gte:price.data.min, price_lte:price.data.max}), 500);
            return () => clearTimeout(timer);
        }
        else {
            changeOptions({price_gte:null, price_lte:null})
        }
    },[price, changeOptions])

    return (
        <div className = 'order-filter'>
                <div className="order-filter__item order-filter__search">
                    <h3>Search</h3>
                    <input type="text" placeholder = "Search products..." ref = {searchRef}/>
                    <button className="btn btn__search btn--primary btn--large btn--rounded-xl" onClick = {handleSearch}>Search</button>
                </div>

                <div className="order-filter__item order-filter__categories">
                    <h3>Categories</h3>
                    <ul className = {`${showMore && 'active'}`}>
                        {
                            categories.map((item, index) => (
                                <li 
                                    key = {index} 
                                    onClick = {() => handleChangeType(item.value) }
                                    className  = {`${item.value === type && 'active'}`}
                                >
                                        {item.name}
                                </li>
                            ))
                        }
                        <li onClick = {() => setShowMore(!showMore)}>{showMore ? '-' : '+'}</li>
                    </ul>
                </div>

                <div className="order-filter__item order-filter__price">
                    <h3>Price</h3>
                    <InputRange
                        maxValue={500}
                        minValue={0}
                        step = {100}
                        onChange={handleChangePrice}
                        value={price.data} 
                    />
                </div>

                <div className="order-filter__item order-filter__rating">
                    <h3>Rating</h3>
                    <StarRatings
                        rating={rate}
                        starRatedColor="#ffd700"
                        starHoverColor = "#ffd700"
                        starDimension = "20px"
                        starSpacing = "4px"
                        changeRating={handleChangeRating}
                        numberOfStars={5}
                        name='rating'
                    />                
                </div>
        </div>
    )
}

export default OrderFilter
