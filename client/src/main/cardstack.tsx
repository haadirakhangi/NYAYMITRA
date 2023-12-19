import React, { useState } from "react";

interface CardProps {
  id: string;
  date: string;
  time: string;
  subject: string;
  description: string;
  onReject: (cardId: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  date,
  time,
  subject,
  description,
  onReject,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const closeForm = (): void => {
    setIsFormOpen(false);
  };
  const openForm = (): void => {
    setIsFormOpen(true);
  };
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  return (
    <div className='m-3'>
      <div className='bg-white shadow-md p-4 mb-4'>
        <div className='mb-2'>
          <strong>Date:</strong> {date}
        </div>
        <div className='mb-2'>
          <strong>Time:</strong> {time}
        </div>
        <div className='mb-2'>
          <strong>Subject:</strong> {subject}
        </div>
        <div className='mb-4'>
          <strong>Description:</strong> {description}
        </div>
        <div className='flex space-x-4'>
          <button className='bg-green-500 text-white px-4 py-2 rounded'>
            Accept
          </button>

          <button
            onClick={openForm}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Reschedule
          </button>
          <button
            onClick={() => onReject(id)}
            className='bg-red-500 text-white px-4 py-2 rounded'
          >
            Reject
          </button>
        </div>
      </div>
      <div>
        <div
          className='form-popup'
          id={`myForm${id}`}
          style={{ display: isFormOpen ? "block" : "none" }}
        >
          <form action='/action_page.php' className='form-container'>
            <h1>Reschudule</h1>
            <label>
              <b>Date : </b>
            </label>
            <br />
            <input type='date' placeholder='Enter Date' name='date' required />
            <br />
            <label>Time:</label> <br />
            <input
              type='time'
              placeholder='Enter Time'
              id='time'
              name='time'
              required
            />
            <br />
            <button type='submit' className='btn'>
              Reschudule
            </button>
            <button type='button' className='btn cancel' onClick={closeForm}>
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface CardStackProps {
  cards: CardProps[];
  onReject: (cardId: string) => void;
}

const CardStack: React.FC<CardStackProps> = ({ cards, onReject }) => {
  return (
    <div className='space-y-4'>
      {cards.map((card) => (
        <Card key={card.id} {...card} onReject={onReject} />
      ))}
    </div>
  );
};

export default CardStack;
