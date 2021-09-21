import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/Login/userSlice'
import cartReducer from '../features/Order/cartSlice'
import favoriteReducer from '../components/CardItem/favouriteSlice'

const store = configureStore({
    reducer: {
        user:userReducer,
        cart: cartReducer,
        favorite:favoriteReducer
    }
})
export default store