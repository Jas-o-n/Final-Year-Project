import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userID:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true}
})

const bookingModel = mongoose.models.booking || mongoose.model('booking',bookingSchema);

export default bookingModel;