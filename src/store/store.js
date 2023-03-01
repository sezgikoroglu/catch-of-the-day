import { configureStore } from "@reduxjs/toolkit";
//import listReducer from "./features/counter/counterSlice"
import orderReducer from "./order/orderSlice";
import listReducer from "./list/listSlice";



export const store = configureStore({
    reducer: {
       
        order:orderReducer,
        list :listReducer,
       
    }
})