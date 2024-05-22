import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-lg font-bold mb-4">Users List</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.uid} className="mb-2">
            <strong>{user.displayName || user.email}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
