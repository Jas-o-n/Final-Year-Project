import React, { useEffect, useState } from 'react'
import './ExploreProducts.css'
import { category_list } from '../../assets/assets'

const ExploreProducts = ({category,setCategory}) => {
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    const categoryList = document.querySelector('.explore-category-list');
    if (categoryList) {
      const handleScroll = () => {
        const isAtStart = categoryList.scrollLeft === 0;
        const isAtEnd = categoryList.scrollLeft + categoryList.clientWidth >= categoryList.scrollWidth - 1;
        setShowLeftArrow(!isAtStart);
        setShowRightArrow(!isAtEnd);
      };

      categoryList.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          categoryList.scrollLeft += e.deltaY;
        }
      }, { passive: false });

      categoryList.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      
      return () => {
        categoryList.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleArrowClick = (direction) => {
    const categoryList = document.querySelector('.explore-category-list');
    if (categoryList) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categoryList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='explore-category' id='explore-category'>
      <h1>Insurance Solutions</h1>
      <p className='explore-category-text'>Browse our range of insurance products designed to protect you, your family, and your business. Select a category below to find the right coverage for your needs.</p>
      <div className="explore-category-container">
        {showLeftArrow && <div className="scroll-arrow left-arrow" onClick={() => handleArrowClick('left')}/>}
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
        {showRightArrow && <div className="scroll-arrow right-arrow" onClick={() => handleArrowClick('right')}/>}
      </div>
      <hr />
    </div>
  )
}

export default ExploreProducts
