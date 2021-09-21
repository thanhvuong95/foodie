import React, {useState, useRef, useEffect, useContext, useCallback} from 'react'
import sortItem from '../../../utils/static-data/sortItem'
import CardItem from '../../../components/CardItem/CardItem'
import { OrderContext } from '../../../context/orderContext'
import Loading from '../../../components/Loading/Loading'
import {useSelector} from 'react-redux'
import Slider from "react-slick"
import ReactPaginate from 'react-paginate'
import emptyImg from '../../../assets/svg/no-data.svg'
import categories from '../../../utils/static-data/categories'
import { selectFavorite } from '../../../components/CardItem/favouriteSlice'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './style.scss'
const OrderContent = () => {
    const {isLoading, totalPage, currentPage, type, changeType, changeOptions, data } = useContext(OrderContext)
    const [isSort, setIsSort] = useState(false)
    const [selected,setSelected]  = useState('Default')
    const sortRef = useRef(null)
    const inputRef = useRef(null)
    const favorite = useSelector(selectFavorite)
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll:5,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
        ]
      };

    const handleCloseSort = (e) => {
        if(!sortRef.current?.contains(e.target)) setIsSort(false)
    }

    const handleSelected = (name,value) => {
        setIsSort(!isSort)
        setSelected(name)
        changeOptions(value)
    }

    const handleChangePage = ({selected}) => {
        changeOptions({_page:selected+1})
    }

    const handleChangeType = (value) => {
        changeType(value)
    }

    const handleSearch = useCallback(() => {
        changeOptions({q:inputRef.current.value})
    },[changeOptions])

    let content
    if(isLoading) {
       content = <Loading />
    }
    else if(!data.length) {
        content =(
            <div className="order-content__empty">
                <img src={emptyImg} alt="" />
                <h3>No data result.</h3>
            </div>
        )
    } 
    else {
        content = (
            <>
            <div className="order-content__items">
            {
                data.map((item,index) => (
                    favorite.findIndex(el => el.id === item.id) === -1 
                    ?
                    <CardItem key = {index} data = {item} isFavorite = {false}/>
                    :
                    <CardItem key = {index} data = {item} isFavorite = {true} />
                )
                )
            }
            </div> 
            {totalPage > 1 && <ReactPaginate
                previousLabel={<i className='bx bxs-chevron-left'></i>}
                nextLabel={<i className='bx bxs-chevron-right'></i>}
                breakLabel={'...'}
                pageCount={totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handleChangePage}
                containerClassName={'order-content__pagination'}
                activeClassName={'active'}
                forcePage = {currentPage}
            />}
            
          </>
        )
    }

    useEffect (()=> {
        setSelected('Default')
    },[type])

    useEffect(() => {
        window.addEventListener('click', handleCloseSort)
        return () => window.removeEventListener('click', handleCloseSort )
    },[])

    useEffect(() => {
        inputRef.current.addEventListener('keyup', (e) => {
            if(e.key === 'Enter' || e.keyCode === 13) {
                handleSearch()
            }
        })
    }, [handleSearch])

    return (
        <div className = 'order-content'>
            <div className="order-content__top">
                <h2>Featured Products / {type === 'our-foods' ? 'All Products' : type}</h2>
               
                <div className="order-content__wrapper">
                    {/* search input on mobile & tablet */}
                    <div className="order-content__search">
                        <input type="text" placeholder = "Search..." ref = {inputRef} />
                        <i className='bx bx-search' onClick = {handleSearch}></i>
                    </div>
                    {/* end search input on mobile & tablet*/}
                    <div className="order-content__sort" ref = {sortRef}>
                        <div className="order-content__sort__box" onClick = {() => setIsSort(!isSort)}>
                            <span>{selected}</span>
                            {isSort ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i> }
                        </div>
                        <ul className={`order-content__sort__item ${isSort ? 'active' : ''}`}>
                            {
                                sortItem.map((item, index) => (
                                    <li
                                        key = {index}
                                        onClick = {() => handleSelected(item.display, item.value)}
                                    >
                                            {item.display}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>                 
            </div>

            {/* slider menu on tablet & mobile */}
            <div className="order-content__slider">
                <Slider {...settings}>
                    {
                        categories.map((item, index) => (
                            <div 
                                className={`order-content__slider__item ${item.value === type && 'active'}`}
                                key = {index}
                                onClick = {() => handleChangeType(item.value)}
                            >
                                {item.name}
                            </div>
                        ))
                    }
                </Slider>
            </div>        
               {/* grid item & pagination */}
            <div className="order-content__body">
                {
                    content
                }    
            </div>
        
        </div>
    )
}

export default OrderContent
