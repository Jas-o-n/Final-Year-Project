import React from 'react'
import './ProductItem.css'

const ProductItem = ({id,name}) => {
  return (
    <div className='product-item'>
        <div className="product-item-info">
            <div className="product-item-name">
                <p>{name}</p>
            </div>
        </div>
      
    </div>
  )
}

export default ProductItem
