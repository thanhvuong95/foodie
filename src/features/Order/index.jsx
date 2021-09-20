import React, { useContext, useEffect} from 'react'
import OrderFilter from './OrderFilter'
import { OrderContext } from '../../context/orderContext'
import OrderContent from './OrderContent/index'
import NotFound from '../../components/NotFound/NotFound'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss'
const Order = () => {
    const {error, options, type, changeType} = useContext(OrderContext)
    
    useEffect(() => {
       window.scrollTo({
           top:0,
           behavior: 'smooth',
       })
    }, [options, type])
    
    // clear query string on change route
    useEffect(() => {
        changeType('our-foods')
     }, [])

    return (
       <>
            {
                error
                ?
                <NotFound message = {error}/>
                :
                    <div className = "order">
                        <div className="container order__container">
                            <OrderFilter />
                            <OrderContent />
                        </div>
                        <ToastContainer />
                    </div>
            }
        </>
    )
}

export default Order
