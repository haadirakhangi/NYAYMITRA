import React, { useState } from 'react';
import axios from 'axios';

interface FormDataStep1 {
  fullName: string;
  phoneNo: string;
  email: string;
  birthdate: string;
  gender: string;
}

interface FormDataStep2 {
  address: string;
  city: string;
  pincode: string;
  state: string;
}

interface FormDataStep3 {
  password: string;
  confirmPassword: string;
}

const UserRegister: React.FC = () => {
  const [formData, setFormData] = useState<FormDataStep1 & FormDataStep2 & FormDataStep3>({
    fullName: '',
    phoneNo: '',
    email: '',
    birthdate: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState<number>(1);

  const handleChange = (name: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData: any = {
      ...formData,
      birthdate: new Date(formData.birthdate).toLocaleDateString(),
    };
    console.log("Password send", formData)
    axios
      .post('http://127.0.0.1:5000/user/register', formattedData)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (

          <div>
            <h1 className='text-xl'>Personal Information</h1>
            <div className='flex gap-x-10'>
              <input
                onChange={handleChange('fullName')}
                className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                type='text'
                placeholder='Your full name'
                id='name'
                required
              />
              <input
                onChange={handleChange('phoneNo')}
                className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                type='text'
                placeholder='Your phone no.'
                id='phone'
                required
              />
            </div>
            <input
              onChange={handleChange('email')}
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
              type='email'
              placeholder='your email'
              id='email'
              required
            />
            <label className='pl-1'>Birth date</label>
            <input
              onChange={handleChange('birthdate')}
              className='outline-none border-b border-b-primary h-[30px] bg-transparent font-secondary w-full placeholder:text-[#757879]'
              id='birthdate'
              type='date'
              placeholder='birthdate'
              required
            />
            <label htmlFor='gender'>Gender:</label>
            <select
              value={formData.gender}
              onChange={handleChange('gender')}
              id='gender'
              name='gender'
              className='outline-none border-b border-b-primary h-[30px] bg-transparent font-secondary w-full placeholder:text-[#757879]'
              required
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='other'>Other</option>
            </select>

            <button type='button' onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h1 className='text-lg'>Contact Information</h1>
            <input
              onChange={handleChange('address')}
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
              type='textarea'
              placeholder='Address'
              required
            />
            <div className='flex gap-x-10'>
              <input
                onChange={handleChange('city')}
                className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                type='text'
                id='city'
                placeholder='City'
                required
              />
              <input
                onChange={handleChange('pincode')}
                className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                type='text'
                id='pincode'
                placeholder='Pincode'
                required
              />
            </div>
            <label htmlFor='state'>State:</label>
            <select
              value={formData.state}
              onChange={handleChange('state')}
              id='state'
              name='state'
              className='outline-none border-b border-b-primary h-[30px] bg-transparent font-secondary w-full  placeholder:text-[#757879]'
              required
            >
              <option value=''>Select State</option>
              <option value='Andhra Pradesh'>Andhra Pradesh</option>
            </select>

            <button onClick={handleBack}>Back</button>
            <button type='button' onClick={() => setStep(3)}>
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className='text-lg font-bold mb-4'>Review Information</h2>
            <input
              onChange={handleChange('password')}
              value={formData.password}
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
              type='password'
              placeholder='Password'
              id='password'
              required
            />
            <input
              onChange={handleChange('confirmPassword')}
              value={formData.confirmPassword}
              className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
              type='password'
              placeholder='Confirm Password'
              required
            />
            <button onClick={handleBack}>Back</button>
            <button type='submit' onClick={handleSubmit}>
              Submit
            </button>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ background: '#ffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='w-full max-w-2xl p-12 bg-[#250E62] rounded shadow-2xl' style={{
        background: 'linear-gradient(to bottom, #f4c430, #fff, #138808)',
        color: '#250E62', // Text color
        boxShadow: '0 6px 36px rgba(0, 0, 0, 0.8)'
      }}>
        <h1 className='flex justify-center items-center text-xl'>
          <strong>Registration Form</strong>
        </h1>
        <div className='mt-4'>{renderFormStep()}</div>
      </div>
    </div>
  );
};

export default UserRegister;
