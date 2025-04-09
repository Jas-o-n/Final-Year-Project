import mongoose from "mongoose"

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    specialty: { type: String, required: true },
    category: { type: String, required: true }
})

const providerModel = mongoose.models.provider || mongoose.model('provider', providerSchema);

export default providerModel;