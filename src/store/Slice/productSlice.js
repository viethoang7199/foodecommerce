import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        GET_PRODUCTS: (state, action) => {
            return { ...state, products: action.payload }
        },
        FILTER_PRODUCTS: (state, action) => {
            state.products.filter = action.payload
        },
        GET_PRODUCT_DETAILS: (state, action) => {
            const pDetail = action.payload;
            const productDetail = state.products.find((item) => item.id === pDetail.id);
            console.log(productDetail);
        }
    }
});
