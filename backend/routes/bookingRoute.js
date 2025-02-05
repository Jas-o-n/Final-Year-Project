import express from "express"
import { addBooking, listBooking, removeBooking } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/add",addBooking)
bookingRouter.post("/remove",removeBooking)
bookingRouter.get("/list",listBooking)


export default bookingRouter;