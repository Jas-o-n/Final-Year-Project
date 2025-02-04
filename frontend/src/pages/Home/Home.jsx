import React, { useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'
import BookAppointment from '../../components/BookAppointment/BookAppointment'

const Home = ({setShowBooking}) => {

  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreProducts category={category} setCategory={setCategory}/>
      <ProductDisplay category={category}/>
      <BookAppointment setShowBooking={setShowBooking} />
    </div>
  )
}

export default Home
