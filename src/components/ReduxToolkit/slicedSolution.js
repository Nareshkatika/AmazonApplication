
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    AllItems: JSON.parse(localStorage.getItem('allItems'))|| [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice'))|| 0
}

const slicedSolution=createSlice({
    name:'shopping',
    initialState,
    reducers:{
        AddCart:(state,action)=>{
            state.AllItems.push(action.payload)
            state.totalPrice=state.AllItems.reduce((amount,item)=>amount+item.price * item.quantity,0)
            localStorage.setItem('allItems',JSON.stringify(state.AllItems))
            localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
        },
        RemoveCart:(state,action)=>{
            state.AllItems=state.AllItems.filter(each=>each.id!==action.payload)
            state.totalPrice=state.AllItems.reduce((amount,item)=>amount+item.price * item.quantity,0)
            localStorage.setItem('allItems',JSON.stringify(state.AllItems))
            localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
        },
        updateQuantity:(state,action)=>{
            const inCart=state.AllItems.find(each=>each.id===action.payload.id)
            if(inCart){
                inCart.quantity=action.payload.quantity
            }
            state.totalPrice=state.AllItems.reduce((amount,item)=>amount+item.price * item.quantity,0)
            localStorage.setItem('allItems',JSON.stringify(state.AllItems))
            localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice))
        }
    }
})

export const{AddCart,RemoveCart,updateQuantity}=slicedSolution.actions
export default slicedSolution.reducer