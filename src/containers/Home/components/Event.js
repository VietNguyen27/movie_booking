import React, { useState, useEffect } from 'react';
import { convertTitle } from 'utils/Convert';
import axios from 'axios';

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then((res) => {
        const eventData = res.data.filter(
          (d) => new Date(d.expired_date) - new Date() > 0
        );
        setEvents(eventData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='events'>
      <div className='py-4'>
        <h2 className='text-2xl font-bold text-center uppercase pb-4'>
          Sự kiện
        </h2>
        <div
          className='grid grid-cols-2 gap-4 sm:grid-cols-3'
          style={{ gridAutoRows: '1fr' }}
        >
          {events.map((eventItem, index) => {
            const { id, title, image_url } = eventItem;
            return (
              <a
                key={index}
                href={`events/${id}/${convertTitle(title)}`}
                style={{ height: '100%' }}
              >
                <img src={image_url} alt='' style={{ minHeight: '100%' }} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Event;
