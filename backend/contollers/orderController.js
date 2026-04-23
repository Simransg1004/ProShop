import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"

// desc         Create new order
// route        POST api/orders
// access       Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.json("Add Order Items")
})

// desc         Get logged in users orders
// route        GET api/orders/myorders
// access       Private
const getMyOrders = asyncHandler(async (req, res) => {
    res.json("Get logged in users orders ")
})

// desc         Get order by Id
// route        GET api/orders/:id
// access       Private
const getOrderById = asyncHandler(async (req, res) => {
    res.json("Get order by Id")
})

// desc         Update order to paid
// route        PUT api/orders/:id/pay
// access       Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.json("Update order to paid")
})

// desc         Update order to delivered
// route        PUT api/orders/:id/deliver
// access       Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.json("Update order to delivered")
})

// desc         Get all orders
// route        GET api/orders
// access       Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.json("Get all orders")
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}