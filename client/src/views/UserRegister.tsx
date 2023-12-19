import React, { useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Avatar,
  FormControl,
  Input,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Snackbar,
  createTheme,
  IconButton,
  ThemeProvider,
  FormHelperText,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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
      .post('/api/user/register', formattedData,
        {
          withCredentials: true,  // This is equivalent to credentials: 'include'
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
        }
      )
      .then((response) => {
        console.log('Data sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };
  const isStepDisabled = () => {
    switch (step) {
      case 1:
        return !formData.fullName || !formData.phoneNo || !formData.email || !formData.birthdate || !formData.gender;
      case 2:
        return !formData.address || !formData.city || !formData.pincode || !formData.state;
      case 3:
        return !formData.password || !formData.confirmPassword;
      default:
        return false;
    }
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

            <button type='button' onClick={() => setStep(step + 1)}
              disabled={isStepDisabled()}  // Disable the button if any field is empty
              style={{
                marginTop: '20px',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '10px',
                paddingBottom: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
              }} >
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
              <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
              <option value='Assam'>Assam</option>
              <option value='Bihar'>Bihar</option>
              <option value='Chhattisgarh'>Chhattisgarh</option>
              <option value='Goa'>Goa</option>
              <option value='Gujarat'>Gujarat</option>
              <option value='Haryana'>Haryana</option>
              <option value='Himachal Pradesh'>Himachal Pradesh</option>
              <option value='Jharkhand'>Jharkhand</option>
              <option value='Karnataka'>Karnataka</option>
              <option value='Kerala'>Kerala</option>
              <option value='Madhya Pradesh'>Madhya Pradesh</option>
              <option value='Maharashtra'>Maharashtra</option>
              <option value='Manipur'>Manipur</option>
              <option value='Meghalaya'>Meghalaya</option>
              <option value='Mizoram'>Mizoram</option>
              <option value='Nagaland'>Nagaland</option>
              <option value='Odisha'>Odisha</option>
              <option value='Punjab'>Punjab</option>
              <option value='Rajasthan'>Rajasthan</option>
              <option value='Sikkim'>Sikkim</option>
              <option value='Tamil Nadu'>Tamil Nadu</option>
              <option value='Telangana'>Telangana</option>
              <option value='Tripura'>Tripura</option>
              <option value='Uttar Pradesh'>Uttar Pradesh</option>
              <option value='Uttarakhand'>Uttarakhand</option>
              <option value='West Bengal'>West Bengal</option>
            </select>
            <div className='flex justify-between'>
              <button onClick={handleBack} style={{ marginTop: "20px", paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: "black", color: "white" }}>Back</button>
              <button type='button' onClick={() => setStep(step + 1)}
                disabled={isStepDisabled()}  // Disable the button if any field is empty
                style={{
                  marginTop: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                }}>
                Next
              </button>
            </div>
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
            <div className='flex justify-between'>
              <button onClick={handleBack} style={{ marginTop: "20px", paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: "black", color: "white" }}>Back</button>
              <button type='button'
                disabled={isStepDisabled()}  // Disable the button if any field is empty
                style={{
                  marginTop: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                }}>
                Submit
              </button>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ background: '#ffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#26c6da', padding: '25px' }}>
        <div className='w-full max-w-2xl p-12  rounded ' style={{
          background: '#ffff',
          color: '#250E62', // Text color
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
            <Avatar style={{ fontSize: "20px", backgroundColor: "#2196F3" }} sx={{ width: 50, height: 50 }}>
              <PeopleAltIcon />
            </Avatar>
            <div style={{ marginLeft: "10px", fontSize: "20px" }}>User Registration</div>
          </div>
          <div className='mt-4'>{renderFormStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
