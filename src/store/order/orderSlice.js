import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items:[],
    length:0,
    
}

export const orderSlice = createSlice({
    name:"order",
    initialState,
    
    
    reducers:{
        addItemToOrder:(state,action)=>{
            state.items=action.payload
        }, 
        setLength:(state,action)=>{
            state.length=action.payload
        }
    },
})

export const { addItemToOrder , setLength } = orderSlice.actions
export default orderSlice.reducer