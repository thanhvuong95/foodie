import {createSlice} from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name:'cart',
    initialState:{data:[], totalQty:0, totalAmount:0},
    reducers: {
        addToCart:(state, action) => {
            const addedItem = action.payload
            const index = state.data.findIndex(item => item.id === addedItem.id)
            if(index === -1) {
                state.data.push({...addedItem, quantity:1})
            }
            else {
                state.data[index].quantity ++
            }
            state.totalQty++
            state.totalAmount+=addedItem.price
            return state
        },
        removeById:(state, action) => {
            const id = action.payload
            const index = state.data.findIndex(item => item.id === id)
            state.totalQty -= state.data[index].quantity
            state.totalAmount -= state.data[index].quantity*state.data[index].price
            state.data.splice(index, 1)
            return state
        },
        removeAll:(state) => {
            state.data = []
            state.totalQty = 0
            state.totalAmount = 0
            return state
        },
        updateCart: (state, action) => {
            state = action.payload
            return state
        },
        decreaseQty: (state, action) => {
            const id = action.payload
            const index = state.data.findIndex(item => item.id === id)
            state.data[index].quantity--
            state.totalQty--
            state.totalAmount -= state.data[index].price
            return state
        },
        increaseQty: (state, action) => {
            const id = action.payload
            const index = state.data.findIndex(item => item.id === id)
            state.data[index].quantity++
            state.totalQty++
            state.totalAmount += state.data[index].price
            return state
        }
    }
})
export const selectCart = state => state.cart
export const {addToCart, removeById, removeAll, updateCart, increaseQty, decreaseQty} = cartSlice.actions
export default cartSlice.reducer