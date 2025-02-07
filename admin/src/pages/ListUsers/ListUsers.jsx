import React, { useEffect, useState } from 'react'
import './ListUsers.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Users } from 'lucide-react';

function useUsers(url) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { list, fetchList };
}

const ListUsers = ({url}) => {
  const { list, fetchList } = useUsers(url);

  const handlePrivilegeUpdate = async (userID, action) => {
    const response = await axios.post(`${url}/api/user/${action}`, { id: userID });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error("Error updating privileges");
    }
  };

  const handleRemoveUser = async (userID) => {
    const response = await axios.post(`${url}/api/user/remove`, { id: userID });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error("Error removing user");
    }
  };

  return (
    <div className='list add flex-col'>
      <div className='list-title'>
        <p>All Users</p>
        <div className='list-title-right' onClick={fetchList}>
          <p>Refresh</p>
          <Users />
        </div>
      </div>
      <div className="list-table">
        <div className="list-users-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Admin Privileges</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-users-table-format'>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.isAdmin ? 'True' : 'False'}</p>
            <div className="user-actions">
              <p onClick={() => handlePrivilegeUpdate(item._id, 'upgrade')} className='cursor upgrade'>↑</p>
              <p onClick={() => handlePrivilegeUpdate(item._id, 'downgrade')} className='cursor downgrade'>↓</p>
              <p onClick={() => handleRemoveUser(item._id)} className='cursor remove'>X</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListUsers;
