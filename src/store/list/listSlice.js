import fishes from "../../sample-fishes"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items:fishes,
    length:0,
    
}

export const listSlice = createSlice({
    name:"list",
    initialState,
    
    
    reducers:{
        addItemToList:(state,action)=>{
            state.items=action.payload
        }, 
       
    },
})

export const { addItemToList  } = listSlice.actions
export default listSlice.reducer