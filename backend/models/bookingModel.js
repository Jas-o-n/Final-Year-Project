import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
})

const bookingModel = mongoose.models.booking || mongoose.model('booking',bookingSchema);

export default bookingModel;