import React, { useEffect, useState } from 'react'
import './ListProducts.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const ListProducts = ({url}) => {

    const [list,setList] = useState([]);

    const fetchList = async () => {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    }

    const removeProduct = async(productID) => {
      const response = await axios.post(`${url}/api/product/remove`,{id:productID});
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
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-products-table-format title">
          <b>Name</b>
          <b>Category</b>
          <b></b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-products-table-format'>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProducts
