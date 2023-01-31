import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./Slice/cartSlice";
import { productSlice } from "./Slice/productSlice";
import { userSlice } from "./Slice/userSlice";

const store = configureStore({
    reducer: {
        productList: productSlice.reducer,
        cartList: cartSlice.reducer,
        userList: userSlice.reducer,
    }
})
export default store;