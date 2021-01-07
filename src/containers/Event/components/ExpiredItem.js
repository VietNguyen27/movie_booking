import React from 'react';
import './styles/Expired.css';
import { convertTitle, convertDate } from 'utils/Convert';

const ExpiredItem = ({ eventItem }) => {
  const { id, title, expired_date } = eventItem;

  return (
    <div className='expired-item bg-white px-3 py-2'>
      <a
        href={`events/${id}/${convertTitle(title)}`}
        className='inline-block text-dark-blue text-md font-semibold pb-2'
      >
        {title}
      </a>
      <p className='text-dark-blue text-sm'>
        <span>
          <i className='far fa-clock'></i>
        </span>
        {convertDate(expired_date)}
        <span>
          <i className='fas fa-map-marker-alt'></i>
        </span>
        TP. Đà Nẵng
      </p>
    </div>
  );
};

export default ExpiredItem;
