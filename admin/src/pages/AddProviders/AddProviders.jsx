import React, { useState } from 'react'
import './AddProviders.css'
import axios from "axios"
import { toast } from 'react-toastify';

const AddProviders = ({url}) => {
    const [data,setData] = useState({
      name: "",
      website: "",
      email: "",
      phone: "",
      location: "",
      specialty: "",
      category: "Vehicle"
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      const response = await axios.post(`${url}/api/provider/add`, data);
      if (response.data.success) {
        setData({
          name: "",
          website: "",
          email: "",
          phone: "",
          location: "",
          specialty: "",
          category: "Vehicle"
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
          {['name', 'website', 'email', 'phone', 'location', 'specialty'].map((field) => (
            <div key={field} className="add-provider-field flex-col">
              <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
              <input 
                onChange={onChangeHandler} 
                value={data[field]} 
                type="text" 
                name={field} 
                placeholder='Type here'
              />
            </div>
          ))}
          <div className="add-provider-category flex-col">
            <p>Category</p>
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
          <button type='submit' className='add-button'>Add Provider</button>
        </form>
      </div>
    </div>
  )
}

export default AddProviders
