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
      const response = await axios.post('http://127.0.0.1:5000/user/login', credentials);
      console.log('Login successful:', response.data);
      // Redirect or perform any necessary actions upon successful login
    } catch (error) {
      console.error('Login failed:');
      // Handle login error, show a message or perform any necessary actions
    }
  };

  return (
    <div className='max-w-xl mx-auto p-12 bg-[#d2b7b7] mt-24 rounded shadow-2xl'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
      <div className='mb-4'>
        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
          <input
            className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
            type='text'
            placeholder='Email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
            type='password'
            placeholder='Password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <h1 className='text-right'>
            Don't have an account?{' '}
            <span className='text-black underline underline-4'>
              <NavLink to='/user-register'>Register Now</NavLink>
            </span>
          </h1>
          <button className='btn mb-[10px] bg-black px-5 py-3 text-white mx-autp lg:mx-0 self-center mt-5' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
