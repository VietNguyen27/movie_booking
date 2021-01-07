import React from 'react';
import { convertDate, convertList, formatTime } from 'utils/Convert';

const TicketItem = ({ ticketData }) => {
  const { date, price, seats, timeSelect, cinema, movie } = ticketData;

  return (
    <div className='list-item flex justify-between p-3'>
      <div className='item-left flex flex-col'>
        <div>
          <p className='text-gray text-base sm:text-lg'>
            Phim:{' '}
            <span className='text-dark-blue text-base font-medium sm:text-lg'>
              {movie.title}
            </span>
          </p>
        </div>
        <div>
          <p className='text-gray text-base sm:text-lg'>
            Rạp:{' '}
            <span className='text-dark-blue text-base font-medium sm:text-lg'>
              {cinema.cinema_name}
            </span>
          </p>
        </div>
        <div>
          <p className='text-gray text-base sm:text-lg'>Thời gian:</p>
          <div className='flex justify-between'>
            <h2 className='text-base font-medium sm:text-lg'>
              {convertDate(date)}
            </h2>
            <h2 className='text-base font-medium sm:text-lg'>
              {formatTime(timeSelect)}
            </h2>
          </div>
        </div>
      </div>
      <div className='item-right flex flex-col'>
        <div>
          <p className='text-gray text-base sm:text-lg'>Giá vé:</p>
          <p className='text-dark-blue text-base font-medium sm:text-lg'>
            {price}
          </p>
        </div>
        <div>
          <p className='text-gray text-base sm:text-lg'>Ghế:</p>
          <h2 className='text-base font-medium sm:text-lg'>
            {convertList(seats)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
