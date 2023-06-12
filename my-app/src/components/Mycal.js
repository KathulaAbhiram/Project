import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Mycal.css';

function Mycal() {

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className='mycal-container'>
      <div className='datepicker-container'>
      {/*Value of the selectedDate passed as selected prop*/}
      <DatePicker selected={selectedDate} onChange={date=>setSelectedDate(date)} />
      </div>
    </div>
  )
}

export default Mycal;