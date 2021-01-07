import React, { useState, useEffect } from 'react';
import ExpiredItem from './ExpiredItem';
import axios from 'axios';

const Expired = () => {
  const [expiredEvents, setExpiredEvents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/events')
        .then((res) => {
          const eventData = res.data.filter(
            (d) => new Date(d.expired_date) - new Date() < 0
          );
          setExpiredEvents(eventData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='expired w-full order-1 rounded-lg overflow-hidden md:w-1/3 md:order-2'>
      <h2 className='bg-primary text-secondary text-lg font-semibold px-3 py-2'>
        Đã kết thúc
      </h2>
      {expiredEvents.map((eventItem, index) => {
        return <ExpiredItem key={index} eventItem={eventItem} />;
      })}
    </div>
  );
};

export default Expired;
