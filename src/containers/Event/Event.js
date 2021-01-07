import React from 'react';
import Title from 'components/PageTitle/Title';
import EventList from './components/EventList';
import ExpiredList from './components/ExpiredList';

const Event = () => {
  return (
    <div>
      <Title title='Khuyến mãi - Sự kiện' />
      <div className='w-full flex items-start flex-wrap gap-5 py-8 md:flex-nowrap'>
        <EventList />
        <ExpiredList />
      </div>
    </div>
  );
};

export default Event;
