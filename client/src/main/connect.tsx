import React, { useState, useEffect } from "react";
import axios from "axios";
import CardStack from "./cardstack";

const Connect: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("/api/advocate/get-meetings"); // Make sure the endpoint matches your backend route
        setMeetings(response.data.advo_connects);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  const handleReject = (meetingId: string) => {
    // Implement your rejection logic here
    console.log("Rejecting meeting with ID:", meetingId);
  };

  return (
    <div className='bg-gray-400'>
      <div className=''>
        <div style={{ padding: "20px", overflow: "hidden" }}>
          <section className='bg-white dark:bg-gray-900'>
            <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
              <div className='mr-auto place-self-center lg:col-span-7'>
                <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
                  Get in touch with Reputated and Verified Lawyers
                </h1>
                <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
                  From checkout to global sales tax compliance, companies around
                  the world use Flowbite to simplify their payment stack.
                </p>
                <a
                  href='#'
                  className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
                >
                  Get started
                  <svg
                    className='w-5 h-5 ml-2 -mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </a>
                <a
                  href='#'
                  className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                >
                  Speak to Sales
                </a>
              </div>
              <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
                <img
                  src='https://img.freepik.com/free-vector/legal-advisers-concept-illustration_114360-20398.jpg?w=740&t=st=1702848435~exp=1702849035~hmac=60484b86058604c595e3104e61b5bb1141c4b6a5cc36bfa5b07a61d7aefb465a'
                  alt='mockup'
                />
              </div>
            </div>
          </section>
        </div>
        <h1 className='text-3xl font-bold text-white flex justify-center'>
          Connect to Clients
        </h1>
        {meetings.length > 0 && (
          <CardStack cards={meetings} onReject={handleReject} />
        )}
      </div>
    </div>
  );
};

export default Connect;
