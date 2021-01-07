import React from 'react';
import { convertTitle, convertDate } from 'utils/Convert';

const EventItem = ({ eventItem }) => {
  const { id, title, description, expired_date, image_url } = eventItem;

  return (
    <div className='event-item w-full flex flex-wrap gap-3 sm:flex-nowrap'>
      <div className='w-full sm:w-1/2'>
        <a href={`events/${id}/${convertTitle(title)}`}>
          <img src={image_url} alt='' className='rounded-lg' />
        </a>
      </div>
      <div className='w-full sm:w-1/2'>
        <div className='pb-0 sm:pb-2'>
          <a
            href={`events/${id}/${convertTitle(title)}`}
            className='block text-base font-semibold sm:text-lg'
          >
            {title}
          </a>
          <small className='text-sm sm:text-base'>
            Ngày hết hạn:{' '}
            <span className='font-semibold'>{convertDate(expired_date)}</span>
          </small>
        </div>
        <p className='text-sm text-justify sm:text-base'>{description}</p>
      </div>
    </div>
  );
};

export default EventItem;
