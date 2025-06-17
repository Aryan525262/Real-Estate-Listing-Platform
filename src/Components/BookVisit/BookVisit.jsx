import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookVisit.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookVisit = () => {
  const location = useLocation();
  const propertyId = location.state?.propertyId;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visitDate, setVisitDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/visit/book', {
        name,
        email,
        date: visitDate.toISOString().split('T')[0], // formatted as YYYY-MM-DD
        time,
        propertyId,
      });
      alert('Visit booked successfully!');
    } catch (error) {
      alert('Error booking visit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Visit</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <DatePicker
        selected={visitDate}
        onChange={(date) => setVisitDate(date)}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">Book Visit</button>
    </form>
  );
};

export default BookVisit;
