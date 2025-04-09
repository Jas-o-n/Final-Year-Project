import React from 'react';
import './ProductProviderPopup.css';
import { X } from 'lucide-react';

const ProductProviderPopup = ({ providers, productName, onClose }) => {
  if (!providers) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{productName} Providers</h2>
          <X className="close-button" onClick={onClose} />
        </div>
        <div className="providers-grid">
          {providers.map((provider, index) => (
            <div key={index} className="provider-card">
              <h3>{provider.name}</h3>
              <div className="provider-info-grid">
                <div className="provider-column">
                  <p><strong>Website:</strong> <a href={provider.website} target="_blank" rel="noopener noreferrer">{provider.website}</a></p>
                  <p><strong>Email:</strong> {provider.email}</p>
                  <p><strong>Phone:</strong> {provider.phone}</p>
                </div>
                <div className="provider-column">
                  <p><strong>Location:</strong> {provider.location}</p>
                  <p><strong>Specialty:</strong> {provider.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductProviderPopup;
