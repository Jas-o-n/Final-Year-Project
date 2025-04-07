import React from 'react'
import './ExploreProducts.css'
import { category_list } from '../../assets/assets'

const ExploreProducts = ({category,setCategory}) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Insurance Solutions</h1>
      <p className='explore-category-text'>Browse our range of insurance products designed to protect you, your family, and your business. Select a category below to find the right coverage for your needs.</p>
      <div className="explore-category-list">
        {category_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className="explore-category-list-item">
                    <img className={category===item.category_name?"active":""} src={item.category_img} alt="" />
                    <p>{item.category_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreProducts
