import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';


export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            const purchases = action.payload
            return purchases
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)))
}


export const { } = purchasesSlice.actions;

export default purchasesSlice.reducer;