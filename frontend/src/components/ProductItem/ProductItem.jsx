import React, { useState, useContext } from 'react'
import './ProductItem.css'
import ProductProviderPopup from '../ProductProviderPopup/ProductProviderPopup'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({id, name, category}) => {
  const [showPopup, setShowPopup] = useState(false);
  const { providers } = useContext(StoreContext);

  const matchingProviders = providers.filter(provider => provider.category === category);

  return (
    <>
      <div className='product-item' onClick={() => setShowPopup(true)}>
        <div className="product-item-info">
            <div className="product-item-name">
                <p>{name}</p>
            </div>
            <span className="product-category">{category}</span>
        </div>
      </div>
      {showPopup && (
        <ProductProviderPopup 
          providers={matchingProviders} 
          productName={name}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export default ProductItem
