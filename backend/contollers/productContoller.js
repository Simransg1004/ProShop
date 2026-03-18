import Product from "../models/productModel.js"
import asyncHandler from "../middleware/asyncHandler.js"

// desc         Get all products
// route        GET api/products
// access       Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}) 
    res.json(products)
})

// desc         Get single product
// route        GET api/products/:id
// access       Public
const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        return res.json(product)  
    }

    res.status(404).json({
        message: "Resource not found"
    })
})

export { getProducts, getProductByID }