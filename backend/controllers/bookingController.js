import bookingModel from "../models/bookingModel.js"

// add booking
const addBooking = async (req,res) => {
    try {
        const booking = new bookingModel({
            userID: req.body.userID,
            date: new Date(req.body.date),
            time: req.body.time
        });
        await booking.save();
        res.json({success: true, message: "Booking Added"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// remove booking
const removeBooking = async (req,res) => {
    try {
        const booking = await bookingModel.findById(req.body.id);
        await bookingModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Booking Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// list all bookings
const listBooking = async (req,res) => {
    try {
        const bookings = await bookingModel.find({});
        res.json({success:true,data:bookings})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addBooking,listBooking,removeBooking}