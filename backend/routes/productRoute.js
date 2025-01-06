import express from "express"
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post("/add",addProduct)
productRouter.post("/remove",removeProduct)
productRouter.get("/list",listProduct)


export default productRouter;