import express from "express"
import { addQuote, listQuote, removeQuote } from "../controllers/quoteController.js"

const quoteRouter = express.Router()

quoteRouter.post("/add", addQuote)
quoteRouter.post("/remove", removeQuote)
quoteRouter.get("/list", listQuote)

export default quoteRouter;