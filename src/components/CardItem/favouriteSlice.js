import { createSlice } from "@reduxjs/toolkit";
const favoriteSlice = createSlice({
    name:'favorite',
    initialState:[],
    reducers: {
        addToFavorite: (state, action) => {
            return action.payload
        }
    }
})
export const selectFavorite = state => state.favorite
export const {addToFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer