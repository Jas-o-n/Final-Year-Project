import mongoose from "mongoose"
import providerModel from "../models/providerModel.js"
import 'dotenv/config'

const providers = [
    // Vehicle Insurance Providers
    {
        name: "Vehicle Provider1",
        website: "www.vehicleprovider1.com",
        email: "contact@vehicleprovider1.com",
        phone: "0123456789",
        location: "Manchester",
        specialty: "Comprehensive Car Insurance",
        category: "Vehicle"
    },
    {
        name: "Vehicle Provider2",
        website: "www.vehicleprovider2.com",
        email: "contact@vehicleprovider2.com",
        phone: "0123456790",
        location: "Birmingham",
        specialty: "Commercial Vehicle Insurance",
        category: "Vehicle"
    },
    {
        name: "Vehicle Provider3",
        website: "www.vehicleprovider3.com",
        email: "contact@vehicleprovider3.com",
        phone: "0123456791",
        location: "Leeds",
        specialty: "Classic Car Insurance",
        category: "Vehicle"
    },
    {
        name: "Vehicle Provider4",
        website: "www.vehicleprovider4.com",
        email: "contact@vehicleprovider4.com",
        phone: "0123456792",
        location: "Liverpool",
        specialty: "Motorcycle Insurance",
        category: "Vehicle"
    },

    // Income/Life Insurance Providers
    {
        name: "Income Provider1",
        website: "www.incomeprovider1.com",
        email: "contact@incomeprovider1.com",
        phone: "0123456793",
        location: "London",
        specialty: "Term Life Insurance",
        category: "Income/Life"
    },
    {
        name: "Income Provider2",
        website: "www.incomeprovider2.com",
        email: "contact@incomeprovider2.com",
        phone: "0123456794",
        location: "Edinburgh",
        specialty: "Income Protection",
        category: "Income/Life"
    },
    {
        name: "Income Provider3",
        website: "www.incomeprovider3.com",
        email: "contact@incomeprovider3.com",
        phone: "0123456795",
        location: "Glasgow",
        specialty: "Whole Life Insurance",
        category: "Income/Life"
    },

    // Home Insurance Providers
    {
        name: "Home Provider1",
        website: "www.homeprovider1.com",
        email: "contact@homeprovider1.com",
        phone: "0123456796",
        location: "Bristol",
        specialty: "Buildings Insurance",
        category: "Home"
    },
    {
        name: "Home Provider2",
        website: "www.homeprovider2.com",
        email: "contact@homeprovider2.com",
        phone: "0123456797",
        location: "Cardiff",
        specialty: "Contents Insurance",
        category: "Home"
    },
    {
        name: "Home Provider3",
        website: "www.homeprovider3.com",
        email: "contact@homeprovider3.com",
        phone: "0123456798",
        location: "Newcastle",
        specialty: "Landlord Insurance",
        category: "Home"
    },
    {
        name: "Home Provider4",
        website: "www.homeprovider4.com",
        email: "contact@homeprovider4.com",
        phone: "0123456799",
        location: "Sheffield",
        specialty: "Home Emergency Cover",
        category: "Home"
    },

    // Travel Insurance Providers
    {
        name: "Travel Provider1",
        website: "www.travelprovider1.com",
        email: "contact@travelprovider1.com",
        phone: "0123456800",
        location: "Manchester",
        specialty: "Worldwide Travel Coverage",
        category: "Travel"
    },
    {
        name: "Travel Provider2",
        website: "www.travelprovider2.com",
        email: "contact@travelprovider2.com",
        phone: "0123456801",
        location: "London",
        specialty: "Business Travel Insurance",
        category: "Travel"
    },
    {
        name: "Travel Provider3",
        website: "www.travelprovider3.com",
        email: "contact@travelprovider3.com",
        phone: "0123456802",
        location: "Birmingham",
        specialty: "Family Travel Insurance",
        category: "Travel"
    },

    // Business/Liability Insurance Providers
    {
        name: "Business Provider1",
        website: "www.businessprovider1.com",
        email: "contact@businessprovider1.com",
        phone: "0123456803",
        location: "Leeds",
        specialty: "Professional Liability",
        category: "Business/Liability"
    },
    {
        name: "Business Provider2",
        website: "www.businessprovider2.com",
        email: "contact@businessprovider2.com",
        phone: "0123456804",
        location: "Liverpool",
        specialty: "Commercial Property Insurance",
        category: "Business/Liability"
    },
    {
        name: "Business Provider3",
        website: "www.businessprovider3.com",
        email: "contact@businessprovider3.com",
        phone: "0123456805",
        location: "Glasgow",
        specialty: "Business Interruption Insurance",
        category: "Business/Liability"
    },
    {
        name: "Business Provider4",
        website: "www.businessprovider4.com",
        email: "contact@businessprovider4.com",
        phone: "0123456806",
        location: "Edinburgh",
        specialty: "Public Liability Insurance",
        category: "Business/Liability"
    },

    // Event Insurance Providers
    {
        name: "Event Provider1",
        website: "www.eventprovider1.com",
        email: "contact@eventprovider1.com",
        phone: "0123456807",
        location: "Bristol",
        specialty: "Wedding Insurance",
        category: "Event"
    },
    {
        name: "Event Provider2",
        website: "www.eventprovider2.com",
        email: "contact@eventprovider2.com",
        phone: "0123456808",
        location: "Manchester",
        specialty: "Festival Insurance",
        category: "Event"
    },
    {
        name: "Event Provider3",
        website: "www.eventprovider3.com",
        email: "contact@eventprovider3.com",
        phone: "0123456809",
        location: "London",
        specialty: "Corporate Event Insurance",
        category: "Event"
    },

    // Animal/Pet Insurance Providers
    {
        name: "Animal Provider1",
        website: "www.animalprovider1.com",
        email: "contact@animalprovider1.com",
        phone: "0123456810",
        location: "Cardiff",
        specialty: "Dog and Cat Insurance",
        category: "Animal/Pet"
    },
    {
        name: "Animal Provider2",
        website: "www.animalprovider2.com",
        email: "contact@animalprovider2.com",
        phone: "0123456811",
        location: "Birmingham",
        specialty: "Veterinary Fee Coverage",
        category: "Animal/Pet"
    },
    {
        name: "Animal Provider3",
        website: "www.animalprovider3.com",
        email: "contact@animalprovider3.com",
        phone: "0123456812",
        location: "Newcastle",
        specialty: "Exotic Pet Insurance",
        category: "Animal/Pet"
    },

    // Aircraft/Boat Insurance Providers
    {
        name: "Aircraft Provider1",
        website: "www.aircraftprovider1.com",
        email: "contact@aircraftprovider1.com",
        phone: "0123456813",
        location: "Southampton",
        specialty: "Yacht Insurance",
        category: "Aircraft/Boat"
    },
    {
        name: "Aircraft Provider2",
        website: "www.aircraftprovider2.com",
        email: "contact@aircraftprovider2.com",
        phone: "0123456814",
        location: "Glasgow",
        specialty: "Private Aircraft Insurance",
        category: "Aircraft/Boat"
    },
    {
        name: "Aircraft Provider3",
        website: "www.aircraftprovider3.com",
        email: "contact@aircraftprovider3.com",
        phone: "0123456815",
        location: "Liverpool",
        specialty: "Commercial Marine Insurance",
        category: "Aircraft/Boat"
    },
    {
        name: "Aircraft Provider4",
        website: "www.aircraftprovider4.com",
        email: "contact@aircraftprovider4.com",
        phone: "0123456816",
        location: "London",
        specialty: "Aircraft Liability Insurance",
        category: "Aircraft/Boat"
    },

    // Sport Insurance Providers
    {
        name: "Sport Provider1",
        website: "www.sportprovider1.com",
        email: "contact@sportprovider1.com",
        phone: "0123456817",
        location: "Manchester",
        specialty: "Professional Sports Coverage",
        category: "Sport"
    },
    {
        name: "Sport Provider2",
        website: "www.sportprovider2.com",
        email: "contact@sportprovider2.com",
        phone: "0123456818",
        location: "Leeds",
        specialty: "Team Sports Insurance",
        category: "Sport"
    },
    {
        name: "Sport Provider3",
        website: "www.sportprovider3.com",
        email: "contact@sportprovider3.com",
        phone: "0123456819",
        location: "Edinburgh",
        specialty: "Extreme Sports Insurance",
        category: "Sport"
    },
    {
        name: "Sport Provider4",
        website: "www.sportprovider4.com",
        email: "contact@sportprovider4.com",
        phone: "0123456820",
        location: "Cardiff",
        specialty: "Amateur Sports Coverage",
        category: "Sport"
    }
]

const seedProviders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
        
        await providerModel.deleteMany({})
        console.log("Cleared existing providers")
        
        await providerModel.insertMany(providers)
        console.log("Added sample providers")
        
        await mongoose.disconnect()
        console.log("Disconnected from MongoDB")
        
        process.exit(0)
    } catch (error) {
        console.error("Error seeding data:", error)
        process.exit(1)
    }
}

seedProviders()