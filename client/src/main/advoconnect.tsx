import React, { useState, useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import advo1 from './advocates/advo1.jpg'
import advo2 from './advocates/advo2.jpg'
import advo3 from './advocates/advo3.jpg'
import advo4 from './advocates/advo4.jpg'
import advo5 from './advocates/advo5.jpg'
import advo6 from './advocates/advo6.jpg'
import advo7 from './advocates/advo7.jpg'
import advo8 from './advocates/advo8.jpg'
import advo9 from './advocates/advo9.jpg'
import '../index.css'

type Lawyer = {
  id: number;
  name: string;
  ratings: number;
  location: string;
  experience: string;
  practiceAreas: string[];
  image: string;
};

type LawyerCardProps = Lawyer;

let rows = 4;
let cols = 163;

const LawyerCard: React.FC<LawyerCardProps> = ({ id, name, ratings, location, experience, practiceAreas, image }) => {
  const [value, setValue] = useState(ratings);

  useEffect(() => {
    setValue(ratings);
  }, [ratings]);

  const MAX_DISPLAYED_PRACTICE_AREAS = 2;

  const displayedPracticeAreas = practiceAreas.slice(0, MAX_DISPLAYED_PRACTICE_AREAS);
  const remainingPracticeAreas = practiceAreas.slice(MAX_DISPLAYED_PRACTICE_AREAS);
  const morePracticeAreasCount = remainingPracticeAreas.length;

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const openForm = (): void => {
    setIsFormOpen(true);
  };

  const closeForm = (): void => {
    setIsFormOpen(false);
  };
  return (
    <div className=''>
      {/* <div style={{ marginRight: '20px' }}>
        <img
          src={image}
          alt={`Lawyer ${id}`}
          style={{ width: '180px', height: '150px', objectFit: 'cover' }}
        />
      </div>
      <div>
        <h3>{name}</h3>
        <Rating name="read-only" value={value} precision={0.5} readOnly />
        <p>Location: {location}</p>
        <p>Experience: {experience}</p>
        <p>
          Practice Areas: {displayedPracticeAreas.join(', ')}
          {morePracticeAreasCount > 0 && (
            <Tooltip title={remainingPracticeAreas.join(', ')} arrow>
              <span style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}>
                {`+${morePracticeAreasCount} more`}
              </span>
            </Tooltip>
          )}
        </p>
      </div> */}
      <div className="wrapper antialiased text-gray-900 w-[450px] mr-12 ml-5 mb-12">
        <div>

          <div className="relative px-4 -mt-16  ">
            <div className="bg-white p-6 rounded-lg shadow-lg items-center">

              <img src={image} alt=" random imgee" className="h-[100px] m-2 object-cover object-center shadow-md rounded-full" />

              <div className="flex items-baseline">

                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>
                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                  {location}
                </div>
              </div>

              <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{name}</h4>

              <div className="mt-1">
                Practice Areas: {displayedPracticeAreas.join(', ')}
                {morePracticeAreasCount > 0 && (
                  <Tooltip title={remainingPracticeAreas.join(', ')} arrow>
                    <span style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}>
                      {`+${morePracticeAreasCount} more`}
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="mt-4">
                <span className="text-md font-semibold">{experience}</span>
                <br />
                <span className="text-teal-600 text-md font-semibold flex flex-row items-center">Ratings : <Rating name="read-only" value={value} precision={0.5} readOnly /></span>
              </div>
              <div>
                <div className="form-popup" id={`myForm${id}`} style={{ display: isFormOpen ? 'block' : 'none' }}>
                  <form action="/action_page.php" className="form-container">
                    <h1>Connect</h1>

                    <label><b>Date : </b></label><br />
                    <input type="date" placeholder="Enter Date" name="date" required />
                    <br />

                    <label>Time:</label> <br />
                    <input type="time" placeholder="Enter Time" id="time" name="time" required /><br />

                    <label><b>Subject</b></label>
                    <input type="text" placeholder="Enter Subject" name="subject" required />

                    <label><b>Description</b></label><br />
                    <textarea id="description" name="description" rows={rows} cols={cols} className='bg-gray-100' placeholder='Enter Description'>
                    </textarea>


                    <button type="submit" className="btn">Get Connected</button>
                    <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                  </form>
                </div>
              </div>
              <a href="#" onClick={openForm} className="m-3 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-black rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Get Connected
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

type InputProps = {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ placeholder, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    style={{ padding: '5px', margin: '10px' }}
    onChange={onChange}
  />
);

const Lawyers: React.FC = () => {
  const [lawyersData, setLawyersData] = useState<Lawyer[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    setLawyersData([

      {
        id: 1,
        name: 'Advocate Sudershani Roy',
        ratings: 2.6,
        location: 'Kailash Hills, Delhi',
        experience: '16 years Experience',
        practiceAreas: [
          'Arbitration', 'Cheque Bounce', 'Child Custody', 'Court Marriage', 'Criminal',
          'Divorce', 'Documentation', 'Domestic Violence', 'Family', 'High Court',
          'Muslim Law', 'Property, Recovery'
        ],
        image: advo1
      },
      {
        id: 2,
        name: 'Advocate Rajesh Kumar',
        ratings: 3.2,
        location: 'Lajpat Nagar, Delhi',
        experience: '12 years Experience',
        practiceAreas: [
          'Arbitration', 'Cheque Bounce', 'Divorce', 'Documentation', 'Domestic Violence',
          'Family', 'High Court', 'Property, Recovery'
        ],
        image: advo2
      },
      {
        id: 3,
        name: 'Advocate Priya Sharma',
        ratings: 4.5,
        location: 'Defence Colony, Delhi',
        experience: '18 years Experience',
        practiceAreas: [
          'Arbitration', 'Child Custody', 'Court Marriage', 'Criminal', 'Divorce',
          'Documentation', 'Domestic Violence', 'Family', 'High Court', 'Muslim Law'
        ],
        image: advo3
      },
      {
        id: 4,
        name: 'Advocate Arjun Singh',
        ratings: 5.0,
        location: 'Gurgaon, Haryana',
        experience: '14 years Experience',
        practiceAreas: [
          'Arbitration', 'Cheque Bounce', 'Court Marriage', 'Criminal', 'Divorce',
          'Documentation', 'Domestic Violence', 'Family', 'High Court', 'Property, Recovery'
        ],
        image: advo4
      },
      {
        id: 5,
        name: 'Advocate Ananya Gupta',
        ratings: 2.0,
        location: 'Noida Sector 15, Uttar Pradesh',
        experience: '7 years Experience',
        practiceAreas: [
          'Real Estate Law', 'Consumer Protection', 'Immigration Law', 'Labor and Employment Law', 'Tax Law',
        ],
        image: advo5
      },
      {
        id: 6,
        name: 'Advocate Raj Gupta',
        ratings: 3.7,
        location: 'Noida Sector 62, Uttar Pradesh',
        experience: '4 years Experience',
        practiceAreas: [
          'Intellectual Property Law', 'Environmental Law', 'Bankruptcy Law', 'Healthcare Law', 'Personal Injury Law',
        ],
        image: advo6
      },
      {
        id: 7,
        name: 'Advocate Shreya Rajpurohit',
        ratings: 4.4,
        location: 'Greater Noida, Uttar Pradesh',
        experience: '5 years Experience',
        practiceAreas: [
          'Family Law', 'Estate Planning', 'Criminal Defense', 'Corporate Law', 'International Law',
        ],
        image: advo7
      },
      {
        id: 8,
        name: 'Advocate Simran Shah',
        ratings: 4.9,
        location: 'Faridabad, Haryana',
        experience: '2 years Experience',
        practiceAreas: [
          'Banking Law', 'Insurance Law', 'Securities Law', 'Sports Law', 'Antitrust Law',
        ],
        image: advo8
      },
      {
        id: 9,
        name: 'Advocate Riya Jain',
        ratings: 5.0,
        location: 'Ghaziabad, Uttar Pradesh',
        experience: '7 years Experience',
        practiceAreas: [
          'Civil Rights Law', 'Constitutional Law', 'Education Law', 'Energy Law', 'Privacy Law',
        ],
        image: advo9
      },

    ]);
  }, []);

  const getLawyersDataFromServer = async (searchValue: string) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/user/get-advocate',
        { search: searchValue }
      );
      if (!response.data.response) {
        throw new Error(`Failed to fetch data from the server`);
      }
      setFilteredLawyers(response.data); // Assuming your server returns an array of lawyers
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = lawyersData.filter((lawyer) => {
        return (
          Object.values(lawyer)
            .filter(value => Array.isArray(value) ? value.join('') : value)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      });
      setFilteredLawyers(filteredData);
    } else {
      setFilteredLawyers(lawyersData);
    }
  };

  return (
    <div className='main-new'>
      <div style={{ padding: '20px', overflow: 'hidden' }}>
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Get in touch with Reputated and Verified Lawyers</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Speak to Sales
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="https://img.freepik.com/free-vector/graduated-lawyer-concept-illustration_114360-16442.jpg?w=740&t=st=1702674285~exp=1702674885~hmac=51fdd25f219f8728bfb9dcfbd858b24c761975091032f768a5052891e6f23182" alt="mockup" />
            </div>
          </div>
        </section>
      </div>

      {/* <Input
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      /> */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white ml-6">Connect to Advocate</label>
        <button
          onClick={() => getLawyersDataFromServer(searchInput)}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Get Lawyers
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <input type="text" id="large-input" className="block ml-6 w-[95%] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder='Just Ask' />
      </div>
      <div style={{ display: 'flex', overflowX: 'auto', }}>
        {searchInput.length > 1
          ? filteredLawyers.map((lawyer) => <LawyerCard key={lawyer.id} {...lawyer} />)
          : lawyersData.map((lawyer) => <LawyerCard key={lawyer.id} {...lawyer} />)
        }
      </div>
    </div>
  );
};

export default Lawyers;
