import React, { useState, useEffect } from 'react';
import './styles/EventList.css';
import EventItem from './EventItem';
import axios from 'axios';

const EventList = () => {
  const [availableEvents, setAvailableEvents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/events')
        .then((res) => {
          const eventData = res.data.filter(
            (d) => new Date(d.expired_date) - new Date() > 0
          );
          setAvailableEvents(eventData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='event-list w-full flex order-2 flex-col gap-8 md:w-2/3 md:order-1 sm:gap-4'>
      {availableEvents.map((eventItem, index) => (
        <EventItem key={index} eventItem={eventItem} />
      ))}
    </div>
  );
};

export default EventList;
