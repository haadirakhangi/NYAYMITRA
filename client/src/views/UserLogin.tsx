// UserLogin.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user/login', credentials,
        {
          withCredentials: true,  // This is equivalent to credentials: 'include'
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
        });
      console.log('Login successful:', response.data);
      // Redirect or perform any necessary actions upon successful login
    } catch (error) {
      console.error('Login failed:');
      // Handle login error, show a message or perform any necessary actions
    }
  };

  return (
    <div style={{ background: '#ffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='w-full max-w-2xl p-12 bg-[#250E62] rounded shadow-2xl' style={{
        background: 'linear-gradient(to bottom, #f4c430, #fff, #138808)',
        color: '#250E62', // Text color
        boxShadow: '0 6px 36px rgba(0, 0, 0, 0.8)',
      }}>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <div className='mb-4'>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <input
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-[#250E62]'
              type='text'
              placeholder='Email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-[#250E62]'
              type='password'
              placeholder='Password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
            />
            <h1 className='text-right text-[#250E62]'>
              Don't have an account?{' '}
              <span className='text-[#250E62] underline underline-4'>
                <NavLink to='/user-register'>Register here</NavLink>
              </span>
            </h1>
            <button className='btn mb-[10px] mx-auto lg:mx-0 self-center mt-5' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
