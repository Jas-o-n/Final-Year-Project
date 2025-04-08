import React from 'react';
import './ListQuotePopup.css';
import { X } from 'lucide-react';

const ListQuotePopup = ({ quote, onClose }) => {
  if (!quote) return null;

  const renderField = (label, value) => {
    if (!value || value === "") return null;
    if (Array.isArray(value) && value.length === 0) return null;
    
    // Only format date for specific date-related fields
    if ((label.toLowerCase().includes('dob') || label.toLowerCase().includes('date')) 
        && (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value))))) {
      value = new Date(value).toISOString().split('T')[0];
    }
    if (Array.isArray(value)) {
      value = value.join(", ");
    }
    
    return (
      <div className="modal-field">
        <span className="field-label">{label}:</span>
        <span className="field-value">{value}</span>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Quote Details</h2>
          <X className="close-button" onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <h3>Basic Information</h3>
            {renderField("Service", quote.service)}
            {renderField("Name", quote.name)}
            {renderField("Email", quote.email)}
            {renderField("Phone", quote.phone)}
            {renderField("Address", quote.address)}
            {renderField("City", quote.city)}
            {renderField("Zip Code", quote.zipCode)}
            {renderField("Description", quote.description)}
          </div>

          {quote.service === "Vehicle" && (
            <div className="modal-section">
              <h3>Vehicle Details</h3>
              {renderField("Vehicle Year", quote.vehicleYear)}
              {renderField("Make", quote.vehicleMake)}
              {renderField("Model", quote.vehicleModel)}
              {renderField("VIN", quote.vehicleVIN)}
              {renderField("Driver DoB", quote.driverDOB)}
              {renderField("License Number", quote.licenseNumber)}
              {renderField("Driving History", quote.drivingHistory)}
              {renderField("Annual Miles", quote.annualMiles)}
              {renderField("Commute Distance", quote.commuteDistance)}
              {renderField("Liability Limit", quote.liabilityLimit)}
              {renderField("Deductible", quote.deductible)}
            </div>
          )}

          {quote.service === "Income/Life" && (
            <div className="modal-section">
              <h3>Life Insurance Details</h3>
              {renderField("Date of Birth", quote.dob)}
              {renderField("Gender", quote.gender)}
              {renderField("Health Status", quote.healthStatus)}
              {renderField("Smoking Status", quote.smokingStatus)}
              {renderField("Coverage Amount", quote.coverageAmount)}
              {renderField("Policy Type", quote.policyType)}
              {renderField("Annual Income", quote.annualIncome)}
              {renderField("Net Worth", quote.netWorth)}
              {renderField("Beneficiary Name", quote.beneficiaryName)}
              {renderField("Beneficiary Relation", quote.beneficiaryRelation)}
            </div>
          )}

          {quote.service === "Home" && (
            <div className="modal-section">
              <h3>Home Insurance Details</h3>
              {renderField("Year Built", quote.yearBuilt)}
              {renderField("Square Footage", quote.squareFootage)}
              {renderField("Construction Type", quote.constructionType)}
              {renderField("Roof Type", quote.roofType)}
              {renderField("Dwelling Coverage", quote.dwellingCoverage)}
              {renderField("Personal Property Coverage", quote.personalPropertyCoverage)}
              {renderField("Deductible", quote.deductible)}
              {renderField("Features", quote.features)}
              {renderField("Claims History", quote.claimsHistory)}
            </div>
          )}

          {quote.service === "Travel" && (
            <div className="modal-section">
              <h3>Travel Insurance Details</h3>
              {renderField("Destination(s)", quote.destination)}
              {renderField("Trip Cost", quote.tripCost)}
              {renderField("Trip Start Date", quote.tripStart)}
              {renderField("Trip End Date", quote.tripEnd)}
              {renderField("Coverage Types", quote.coverageTypes)}
              {renderField("Medical Conditions", quote.medicalConditions)}
            </div>
          )}

          {quote.service === "Business/Liability" && (
            <div className="modal-section">
              <h3>Business Insurance Details</h3>
              {renderField("Business Type", quote.businessType)}
              {renderField("Years in Operation", quote.yearsOperation)}
              {renderField("Annual Revenue", quote.annualRevenue)}
              {renderField("Employee Count", quote.employeeCount)}
              {renderField("Business Activities", quote.businessActivities)}
              {renderField("Coverage Types", quote.coverageTypes)}
              {renderField("Liability Limits", quote.liabilityLimits)}
            </div>
          )}

          {quote.service === "Event" && (
            <div className="modal-section">
              <h3>Event Insurance Details</h3>
              {renderField("Event Type", quote.eventType)}
              {renderField("Event Date", quote.eventDate)}
              {renderField("Attendee Count", quote.attendeeCount)}
              {renderField("Event Location", quote.eventLocation)}
              {renderField("Coverage Types", quote.coverageTypes)}
              {renderField("Vendor Details", quote.vendorDetails)}
            </div>
          )}

          {quote.service === "Animal/Pet" && (
            <div className="modal-section">
              <h3>Pet Insurance Details</h3>
              {renderField("Pet Type", quote.petType)}
              {renderField("Breed", quote.breed)}
              {renderField("Age", quote.age)}
              {renderField("Last Vaccination Date", quote.lastVaccination)}
              {renderField("Coverage Types", quote.coverageTypes)}
              {renderField("Medical History", quote.medicalHistory)}
              {renderField("Deductible", quote.deductible)}
            </div>
          )}

          {quote.service === "Aircraft/Boat" && (
            <div className="modal-section">
              <h3>Aircraft/Boat Insurance Details</h3>
              {renderField("Year", quote.vesselYear)}
              {renderField("Make", quote.vesselMake)}
              {renderField("Model", quote.vesselModel)}
              {renderField("Hull/Tail Number", quote.vesselID)}
              {renderField("Current Value", quote.vesselValue)}
              {renderField("Usage Type", quote.usage)}
              {renderField("Storage Location", quote.storage)}
              {renderField("Operator Experience", quote.operatorExperience)}
              {renderField("Coverage Types", quote.coverageTypes)}
            </div>
          )}

          {quote.service === "Sport" && (
            <div className="modal-section">
              <h3>Sport Insurance Details</h3>
              {renderField("Sport/Activity", quote.sportType)}
              {renderField("Participation Frequency", quote.frequency)}
              {renderField("Equipment Details", quote.equipmentDetails)}
              {renderField("Equipment Value", quote.equipmentValue)}
              {renderField("Coverage Types", quote.coverageTypes)}
              {renderField("Event Locations", quote.eventLocations)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListQuotePopup;