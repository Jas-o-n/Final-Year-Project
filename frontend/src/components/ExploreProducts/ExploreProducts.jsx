import React from 'react'
import './ExploreProducts.css'
import { category_list } from '../../assets/assets'

const ExploreProducts = ({category,setCategory}) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Explore our products</h1>
      <p className='explore-category-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident a ipsa repudiandae similique ratione blanditiis temporibus eius, deleniti odit explicabo maiores eveniet est tenetur esse repellat quisquam aut. Fuga, nihil.</p>
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
