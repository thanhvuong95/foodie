import React, { useState, useEffect, useCallback} from 'react'
import productApi from "../api/productApi"
import {useHistory, useLocation}  from 'react-router-dom'
import queryString from 'query-string'
export const OrderContext = React.createContext()
const OrderContextProvider = (props) => {
    const [type, setType] = useState('our-foods')
    const [options, setOptions] = useState({})
    const [data, setData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()
    const {pathname} = useLocation()
    
    // set pagination = 1 when change type otherwise if not change type pagination = page -1
    // start index pagination = 0
    let currentPage = options?._page - 1 || 0

    const changeOptions = useCallback((value)=> {
        setOptions(prevState => {
            return {...prevState, ...value}
        })
    },[])

    const changeType = (value) => {
        setType(value)
        setOptions({})
    }

    const initialContext = {
        type,
        options,
        data,
        changeOptions,
        changeType,
        isLoading,
        error,
        totalPage,
        currentPage
    }
    
    useEffect(() => {
        if(pathname === '/product') {
        const fetchProducts = async() => {
            const filterOptions = {...options}
            // set default page = 1 first load
            if(!filterOptions.hasOwnProperty('_page')) filterOptions['_page'] = 1
            // delete params with value = null (price) 
            // sort by price use input range -> clear default params
            Object.keys(filterOptions).forEach((key) => 
            !filterOptions[key]  && delete filterOptions[key]
            )
            const params = {
               ...filterOptions,
                _limit:24
            }
            const paramsGetTotalRows = {
                ...filterOptions,
                _page:null
             }
            setIsLoading(true)
            setError(null)
            try {
                const products = await productApi.getAll(type, params)
                const totalProducts = await productApi.getAll(type, paramsGetTotalRows)
                const pageNumber = Math.ceil(totalProducts.length / 24)
                setData(products)
                setIsLoading(false)
                setTotalPage(pageNumber)
                const queryStringUrl = {...params, name:type}
                history.push({
                    search:queryString.stringify(queryStringUrl)
                }) 
            }
            catch (e) {
                setIsLoading(false)
                setError(e.message)
            }
             
        }
        fetchProducts()
    }
    },[options, type, history, pathname])

    return (
        <OrderContext.Provider value = {initialContext}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
