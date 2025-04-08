import React, { useContext, useState } from 'react'
import './QuotePopup.css'
import { CircleX } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { category_list } from '../../assets/assets'
import useClickOutside from '../../hooks/useClickOutside'

const QuotePopup = ({setShowQuote}) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const {url} = useContext(StoreContext)
    const token = localStorage.getItem("token")
    
    const popupRef = useClickOutside(() => {
        setShowQuote(false)
    })

    const renderSpecificFields = () => {
        switch(selectedCategory) {
            case 'Vehicle':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Vehicle Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="vehicleYear" placeholder="Vehicle Year" required />
                                <input type="text" name="vehicleMake" placeholder="Make" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="vehicleModel" placeholder="Model" required />
                                <input type="text" name="vehicleVIN" placeholder="VIN" required />
                            </div>
                        </div>

                        <h3 className="section-title">Driver Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="date" name="driverDOB" placeholder="Date of Birth" required />
                                <input type="text" name="licenseNumber" placeholder="License Number" required />
                            </div>
                        </div>
                        <textarea name="drivingHistory" placeholder="Driving History (accidents, violations)" rows="2"></textarea>

                        <h3 className="section-title">Usage & Coverage</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="number" name="annualMiles" placeholder="Annual Miles Driven" required />
                                <input type="number" name="commuteDistance" placeholder="Daily Commute Distance (miles)" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="liabilityLimit" placeholder="Desired Liability Limit" required />
                                <input type="number" name="deductible" placeholder="Preferred Deductible" required />
                            </div>
                        </div>
                    </div>
                );

            case 'Income/Life':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="date" name="dob" placeholder="Date of Birth" required />
                                <select name="gender" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="healthStatus" required>
                                    <option value="">Health Status</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                </select>
                                <select name="smokingStatus" required>
                                    <option value="">Smoking Status</option>
                                    <option value="non-smoker">Non-Smoker</option>
                                    <option value="smoker">Smoker</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="section-title">Coverage Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="number" name="coverageAmount" placeholder="Desired Coverage Amount" required />
                                <select name="policyType" required>
                                    <option value="">Select Policy Type</option>
                                    <option value="term">Term Life</option>
                                    <option value="whole">Whole Life</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="section-title">Financial & Beneficiary Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="number" name="annualIncome" placeholder="Annual Income" required />
                                <input type="number" name="netWorth" placeholder="Net Worth" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="beneficiaryName" placeholder="Beneficiary Name" required />
                                <input type="text" name="beneficiaryRelation" placeholder="Relationship to Beneficiary" required />
                            </div>
                        </div>
                    </div>
                );

            case 'Home':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Property Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="number" name="yearBuilt" placeholder="Year Built" required />
                                <input type="number" name="squareFootage" placeholder="Square Footage" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="constructionType" placeholder="Construction Type" required />
                                <input type="text" name="roofType" placeholder="Roof Type" required />
                            </div>
                        </div>

                        <h3 className="section-title">Coverage Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="number" name="dwellingCoverage" placeholder="Desired Dwelling Coverage" required />
                                <input type="number" name="personalPropertyCoverage" placeholder="Personal Property Coverage" required />
                            </div>
                            <div className="form-group">
                                <input type="number" name="deductible" placeholder="Preferred Deductible" required />
                            </div>
                        </div>

                        <h3 className="section-title">Property Features</h3>
                        <div className="form-group">
                            <select name="features" multiple>
                                <option value="security">Security System</option>
                                <option value="pool">Swimming Pool</option>
                                <option value="fireplace">Fireplace</option>
                                <option value="renovated">Recent Renovations</option>
                            </select>
                        </div>
                        <textarea name="claimsHistory" placeholder="Previous Claims History" rows="2"></textarea>
                    </div>
                );

            case 'Travel':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Trip Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="destination" placeholder="Destination(s)" required />
                                <input type="number" name="tripCost" placeholder="Total Trip Cost" required />
                            </div>
                            <div className="form-group">
                                <input type="date" name="tripStart" placeholder="Trip Start Date" required />
                                <input type="date" name="tripEnd" placeholder="Trip End Date" required />
                            </div>
                        </div>

                        <h3 className="section-title">Coverage Preferences</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="cancellation">Trip Cancellation</option>
                                <option value="medical">Medical Coverage</option>
                                <option value="baggage">Baggage Protection</option>
                                <option value="delay">Trip Delay</option>
                            </select>
                        </div>
                        <textarea name="medicalConditions" placeholder="Pre-existing Medical Conditions" rows="2"></textarea>
                    </div>
                );

            case 'Business/Liability':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Business Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="businessType" placeholder="Type of Business" required />
                                <input type="number" name="yearsOperation" placeholder="Years in Operation" required />
                            </div>
                            <div className="form-group">
                                <input type="number" name="annualRevenue" placeholder="Annual Revenue" required />
                                <input type="number" name="employeeCount" placeholder="Number of Employees" required />
                            </div>
                        </div>
                        <textarea name="businessActivities" placeholder="Description of Business Activities" rows="2" required></textarea>

                        <h3 className="section-title">Coverage Needs</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="general">General Liability</option>
                                <option value="professional">Professional Liability</option>
                                <option value="workers">Workers' Compensation</option>
                                <option value="cyber">Cyber Liability</option>
                                <option value="property">Property Insurance</option>
                            </select>
                        </div>
                        <input type="text" name="liabilityLimits" placeholder="Desired Liability Limits" required />
                    </div>
                );

            case 'Event':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Event Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <select name="eventType" required>
                                    <option value="">Select Event Type</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="concert">Concert</option>
                                    <option value="party">Party</option>
                                    <option value="conference">Conference</option>
                                    <option value="other">Other</option>
                                </select>
                                <input type="date" name="eventDate" placeholder="Event Date" required />
                            </div>
                            <div className="form-group">
                                <input type="number" name="attendeeCount" placeholder="Expected Attendees" required />
                                <input type="text" name="eventLocation" placeholder="Event Location" required />
                            </div>
                        </div>

                        <h3 className="section-title">Coverage Details</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="liability">Liability Coverage</option>
                                <option value="cancellation">Cancellation Coverage</option>
                                <option value="property">Property Damage</option>
                                <option value="liquor">Liquor Liability</option>
                            </select>
                        </div>
                        <textarea name="vendorDetails" placeholder="List of Vendors and their Insurance Status" rows="2"></textarea>
                    </div>
                );

            case 'Animal/Pet':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Pet Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <select name="petType" required>
                                    <option value="">Select Pet Type</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="other">Other</option>
                                </select>
                                <input type="text" name="breed" placeholder="Breed" required />
                            </div>
                            <div className="form-group">
                                <input type="number" name="age" placeholder="Pet Age" required />
                                <input type="date" name="lastVaccination" placeholder="Last Vaccination Date" required />
                            </div>
                        </div>

                        <h3 className="section-title">Coverage Preferences</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="accident">Accident Coverage</option>
                                <option value="illness">Illness Coverage</option>
                                <option value="wellness">Wellness/Preventive Care</option>
                            </select>
                        </div>
                        <textarea name="medicalHistory" placeholder="Pre-existing Conditions & Medical History" rows="2"></textarea>
                        <input type="number" name="deductible" placeholder="Preferred Deductible" required />
                    </div>
                );

            case 'Aircraft/Boat':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Vessel/Aircraft Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="vesselYear" placeholder="Year" required />
                                <input type="text" name="vesselMake" placeholder="Make" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="vesselModel" placeholder="Model" required />
                                <input type="text" name="vesselID" placeholder="Hull/Tail Number" required />
                            </div>
                        </div>
                        <input type="number" name="vesselValue" placeholder="Current Value" required />

                        <h3 className="section-title">Usage & Operation</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <select name="usage" required>
                                    <option value="">Select Usage Type</option>
                                    <option value="pleasure">Pleasure</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="charter">Charter</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" name="storage" placeholder="Storage Location" required />
                            </div>
                        </div>
                        <textarea name="operatorExperience" placeholder="Operator Experience & Certifications" rows="2" required></textarea>

                        <h3 className="section-title">Coverage Details</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="liability">Liability Coverage</option>
                                <option value="hull">Hull Coverage</option>
                                <option value="medical">Medical Payments</option>
                                <option value="passenger">Passenger Liability</option>
                            </select>
                        </div>
                    </div>
                );

            case 'Sport':
                return (
                    <div className="form-section">
                        <h3 className="section-title">Sport Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="sportType" placeholder="Specific Sport/Activity" required />
                                <select name="frequency" required>
                                    <option value="">Participation Frequency</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="occasionally">Occasionally</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="section-title">Equipment Information</h3>
                        <textarea name="equipmentDetails" placeholder="Description of Equipment to be Insured" rows="2" required></textarea>
                        <input type="number" name="equipmentValue" placeholder="Total Equipment Value" required />

                        <h3 className="section-title">Coverage Preferences</h3>
                        <div className="form-group">
                            <select name="coverageTypes" multiple required>
                                <option value="equipment">Equipment Coverage</option>
                                <option value="liability">Personal Liability</option>
                                <option value="medical">Medical Payments</option>
                                <option value="travel">Travel Protection</option>
                            </select>
                        </div>
                        <input type="text" name="eventLocations" placeholder="Common Locations/Venues" required />
                    </div>
                );

            default:
                return null;
        }
    };

    const onRequest = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            service: formData.get('service'),
            description: formData.get('description'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
            ...Object.fromEntries(formData)
        }
        
        try {
            const response = await axios.post(`${url}/api/quote/add`, data)
            if (response.data.success) {
                toast.success("Thank you! We'll review your quote request and contact you shortly")
                setShowQuote(false)
            }
        } catch (error) {
            toast.error("Failed to submit quote request");
        }
    }

    return (
        <div className='quote-popup'>
            <div className="quote-popup-container" ref={popupRef}>
                <div className="quote-popup-title">
                    <h2>Request a Quote</h2>
                    <span onClick={() => setShowQuote(false)} className='quote-popup-title-icon'>
                        <CircleX color='red' size={24} />
                    </span>
                </div>
                <form onSubmit={onRequest} className="quote-popup-form">
                    <div className="form-section">
                        <h3 className="section-title">Insurance Category</h3>
                        <select 
                            name="service" 
                            required
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select Insurance Type</option>
                            {category_list.map((category, index) => (
                                <option key={index} value={category.category_name}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {renderSpecificFields()}

                    <div className="form-section">
                        <h3 className="section-title">Contact Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Full Name" required />
                                <input type="tel" name="phone" placeholder="Phone Number" required />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email Address" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Location</h3>
                        <input type="text" name="address" placeholder="Address" required />
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="city" placeholder="City" required />
                            </div>
                            <div className="form-group">
                                <input type="text" name="zipCode" placeholder="Zip Code" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Additional Information</h3>
                        <textarea 
                            name="description" 
                            placeholder="Please provide any additional details or specific requirements"
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit">Request Quote</button>
                </form>
              </div>
        </div>
    )
}

export default QuotePopup