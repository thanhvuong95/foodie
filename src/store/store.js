import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/Login/userSlice'
import cartReducer from '../features/Order/cartSlice'
const store = configureStore({
    reducer: {
        user:userReducer,
        cart: cartReducer
    }
})
export default store