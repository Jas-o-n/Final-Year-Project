import express from "express"
import { addBooking, listBooking, removeBooking, updateBookingStatus, getBookingsByUserID } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/add", addBooking)
bookingRouter.get("/list", listBooking)
bookingRouter.post("/remove", removeBooking)
bookingRouter.post("/updateStatus", updateBookingStatus)
bookingRouter.get('/:userID', getBookingsByUserID)

export default bookingRouter;