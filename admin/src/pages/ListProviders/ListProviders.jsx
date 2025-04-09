import React, { useEffect, useState } from 'react'
import './ListProviders.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const ListProviders = ({url}) => {
    const [list,setList] = useState([]);

    const fetchList = async () => {
      const response = await axios.get(`${url}/api/provider/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    }

    const removeProvider = async(providerID) => {
      const response = await axios.post(`${url}/api/provider/remove`,{id:providerID});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      } else{
        toast.error("Error");
      }
    }

    useEffect(()=>{
      fetchList();      
    },[])

  return (
    <div className='list add flex-col'>
      <p>All Providers List</p>
      <div className="list-table">
        <div className="list-providers-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Location</b>
          <b>Category</b>
          <b></b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-providers-table-format'>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.location}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeProvider(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProviders
