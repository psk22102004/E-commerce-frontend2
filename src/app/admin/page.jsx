'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [role, setRole] = useState('');
  const router = useRouter();

  const verifyUser = async () => {
    try {
      const { data } = await axios.get('https://e-commerce-backend-gper.onrender.com/api/auth/verify', { withCredentials: true });
      console.log(data);
      if (data.role !== 'admin') {
        console.log('Not admin');
        router.push('/login');
      } else {
        setRole(data.role);
      }
    } catch (error) {
      console.error('Not authorized', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    verifyUser();
  }, []); // Removed `router` dependency to avoid unnecessary re-renders.

  const handleLogOut = async () => {
    try {
      await axios.post('https://e-commerce-backend-gper.onrender.com/api/auth/logout', null, { withCredentials: true });
      router.push('/login'); // Redirect after logout instead of calling `verifyUser`.
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      {role === 'admin' ? <h1>Welcome Admin</h1> : null}
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}
