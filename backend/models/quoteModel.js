import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema({
    // Basic Information
    service: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    description: { type: String },

    // Vehicle Insurance Fields
    vehicleYear: String,
    vehicleMake: String,
    vehicleModel: String,
    vehicleVIN: String,
    driverDOB: Date,
    licenseNumber: String,
    drivingHistory: String,
    annualMiles: Number,
    commuteDistance: Number,
    liabilityLimit: String,
    deductible: Number,

    // Life Insurance Fields
    dob: Date,
    gender: String,
    healthStatus: String,
    smokingStatus: String,
    coverageAmount: Number,
    policyType: String,
    annualIncome: Number,
    netWorth: Number,
    beneficiaryName: String,
    beneficiaryRelation: String,

    // Home Insurance Fields
    yearBuilt: Number,
    squareFootage: Number,
    constructionType: String,
    roofType: String,
    dwellingCoverage: Number,
    personalPropertyCoverage: Number,
    features: [String],
    claimsHistory: String,

    // Travel Insurance Fields
    destination: String,
    tripCost: Number,
    tripStart: Date,
    tripEnd: Date,
    coverageTypes: [String],
    medicalConditions: String,

    // Business Insurance Fields
    businessType: String,
    yearsOperation: Number,
    annualRevenue: Number,
    employeeCount: Number,
    businessActivities: String,

    // Event Insurance Fields
    eventType: String,
    eventDate: Date,
    attendeeCount: Number,
    eventLocation: String,
    vendorDetails: String,

    // Pet Insurance Fields
    petType: String,
    breed: String,
    age: Number,
    lastVaccination: Date,
    medicalHistory: String,

    // Aircraft/Boat Insurance Fields
    vesselYear: String,
    vesselMake: String,
    vesselModel: String,
    vesselID: String,
    vesselValue: Number,
    usage: String,
    storage: String,
    operatorExperience: String,

    // Sport Insurance Fields
    sportType: String,
    frequency: String,
    equipmentDetails: String,
    equipmentValue: Number,
    eventLocations: String
}, {
    timestamps: true
})

const quoteModel = mongoose.models.quote || mongoose.model('quote', quoteSchema);

export default quoteModel;