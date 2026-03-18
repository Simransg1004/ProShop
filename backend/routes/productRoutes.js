import express from "express"
import { getProducts, getProductByID } from "../contollers/productContoller.js"

const router = express.Router()

router.get("/", getProducts)

router.get("/:id", getProductByID)


export default router