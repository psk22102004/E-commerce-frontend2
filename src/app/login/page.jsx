'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error message
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://e-commerce-backend-gper.onrender.com/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.error) {
        setIsLoading(false);
        setError(response.data.error);
        return;
      }
      setIsLoading(false);
      console.log(response.data); //{"message": "Logged in successfully","role": "admin"}
      if (response.data.role == 'admin') {
        router.push('/admin');
      }
      else {
        router.push('/home')
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        // If the backend returns an error message
        setError(error.response.data.message || 'Login failed.');
        router.push('/signup')

      } else {
        setError('An unexpected error occurred.');
      }
    }
  };


  return (
    <div className="bg-[#F4F4F9] min-h-screen flex justify-center items-center relative">


      {/* Loader */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center z-20">
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#4A90E2] border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Login Form */}
      <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg shadow-gray-400 z-10 m-4">
        {/* Left Box (Form) */}
        <div className="leftBox w-full md:w-1/2 bg-[#EAEAEA] flex flex-col p-6 space-y-4 text-black">
          <h1 className="text-2xl font-semibold text-center m-2">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col w-full space-y-1">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-md p-2 bg-[#F7F7F7] border border-gray-300 focus:ring-2 focus:ring-[#4A90E2]"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md p-2 bg-[#F7F7F7] border border-gray-300 focus:ring-2 focus:ring-[#4A90E2]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-btnClr text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
            >
              Login
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>} {/* Display error message */}
          </form>
          <h1 className="text-sm text-center text-gray-600 mt-4">
            {"Don't"} have an account?{" "}
            <Link
              href="/signup"
              className="text-sm text-[#4A90E2] font-semibold cursor-pointer hover:underline"
            >
              Signup
            </Link>
          </h1>

        </div>

        {/* Right Box (Info Section) */}
        <div className="rightBox hidden md:flex flex-col bg-[#FDFDFD] w-full md:w-1/2 p-6 items-center">
          <h1 className="text-3xl">NexCart</h1>
          <h1 className="text-4xl text-black font-bold text-center flex-1 flex items-center justify-center">
            Discover the best deals and shop with ease!
          </h1>
        </div>
      </div>
    </div>
  );

}
