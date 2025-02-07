import React, { useEffect, useState } from 'react'
import './ListUsers.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const ListUsers = ({url}) => {

    const [list,setList] = useState([]);

    const fetchList = async () => {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    }

    const removeUser = async(userID) => {
      const response = await axios.post(`${url}/api/user/remove`,{id:userID});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      } else{
        toast.error("Error");
      }
    }

    const upgradeUserPriv = async(userID) => {
      const response = await axios.post(`${url}/api/user/upgrade`,{id:userID});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      } else{
        toast.error("Error");
      }
    }

    const downgradeUserPriv = async(userID) => {
      const response = await axios.post(`${url}/api/user/downgrade`,{id:userID});
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
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-user-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Admin Privileges</b>
          <b>Upgrade</b>
          <b>Downgrade</b>
          <b></b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-user-table-format'>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.isAdmin?<>True</>:<>False</>}</p>
              <p onClick={()=>upgradeUserPriv(item._id)} className='cursor'>↑</p>
              <p onClick={()=>downgradeUserPriv(item._id)} className='cursor'>↓</p>
              <p onClick={()=>removeUser(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListUsers
