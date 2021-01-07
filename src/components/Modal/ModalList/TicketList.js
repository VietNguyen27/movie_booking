import React from 'react';
import Tabs from 'components/Tabs/Tabs';
import TicketItem from './TicketItem';

const TicketList = ({ data }) => {
  const availableTicket = data.filter((e) => new Date(e.date) - new Date() > 0);
  const expiredTicket = data.filter((e) => new Date(e.date) - new Date() < 0);

  const getDate = () => {};

  return (
    <Tabs>
      <div label='Vé hiện có' onClick={getDate} className='movie-list'>
        {availableTicket.length === 0 ? (
          <p className='text-lg'>Không có dữ liệu</p>
        ) : (
          availableTicket.map((ticketData, index) => {
            return <TicketItem key={index} ticketData={ticketData} />;
          })
        )}
      </div>
      <div label='Vé hết hạn' onClick={getDate} className='movie-list'>
        {expiredTicket.length === 0 ? (
          <p className='text-lg'>Không có dữ liệu</p>
        ) : (
          expiredTicket.map((ticketData, index) => {
            return <TicketItem key={index} ticketData={ticketData} />;
          })
        )}
      </div>
    </Tabs>
  );
};

export default TicketList;
