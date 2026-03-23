import { createSlice } from "@reduxjs/toolkit";
import { json } from "express";

const initialState = localStorage.getItem("cart") ?
 JSON.parse(localStorage.getItem("cart")) : { cartItems: [] }

 const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
 }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const itemExists = state.cartItems.find((x) => x._id === item._id)

            if(itemExists) {
                state.cartItems = state.cartItems.map((x) => {
                    x._id === itemExists._id ? item : x
                })
            } else {
                state.cartItems = [...state.cartItems, item ]
            }

            // reduce(callBackFn, initialValue)
            // Calculate item price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => { acc + item.price * item.qty }, 0))

            // Calculate shipping price(For itemsPrice over $100 -> free shipping, else $10 )
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // Calculate tax price (15% tax)
            state.taxPrice = addDecimals(Number( (0.15 * state.itemsPrice).toFixed(2) ))

            // Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) + 
                Number(state.taxPrice)
            ).toFixed(2)

            localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer


// cartItems = ["pn", "scale", "eraser", "ball"]
//  item => "ball"