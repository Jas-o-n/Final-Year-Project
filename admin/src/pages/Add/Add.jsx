import React, { useState } from 'react'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {

    const [data,setData] = useState({
      name:"",
      category:"Vehicle",
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("name",data.name);
      formData.append("category",data.category);
      const jsonData = {}
      formData.forEach((value, key) => jsonData[key] = value);
      const response = await axios.post(`${url}/api/product/add`,jsonData);
      if (response.data.success) {
        setData({
          name:"",
          category:"vehicle",
        })
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }

  return (
    <div>
      <div className="add">
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
          </div>
          <div className="add-product-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Vehicle">Vehicle</option>
              <option value="Income/Life">Income/Life</option>
              <option value="Home">Home</option>
              <option value="Travel">Travel</option>
              <option value="Business/Liability">Business/Liability</option>
              <option value="Event">Event</option>
              <option value="Animal/Pet">Animal/Pet</option>
              <option value="Aircraft/Boat">Aircraft/Boat</option>
              <option value="Sport">Sport</option>
            </select>
          </div>
          <button type='submit' className='add-button'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Add
