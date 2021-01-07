import React from 'react';
import { convertDate, convertList, formatMoney } from 'utils/Convert';

const Checkout = ({
  props,
  seatSelected,
  serviceSelected,
  handleEmptySeat,
  handlePayment,
}) => {
  const { movie, price, cinema, date, timeSelect } = props.ticketInfo;

  const handleTotal = () => {
    if (serviceSelected && serviceSelected.length !== 0) {
      const sumServicePrice = serviceSelected.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);

      return price * seatSelected.length + sumServicePrice;
    }
    return price * seatSelected.length;
  };

  return movie ? (
    <div className='checkout w-full md:w-1/3'>
      <div className='movie-info'>
        <p className='text-sm sm:text-base'>
          Phim: <span className='font-medium'>{movie.title}</span>
        </p>
        <p className='text-sm sm:text-base'>
          Rạp: <span className='font-medium'>{cinema.cinema_name}</span>
        </p>
        <p className='text-sm sm:text-base'>
          Giá vé: <span className='font-medium'>{formatMoney(price)} đ</span>
        </p>
        <p className='text-sm sm:text-base'>
          Suất chiếu: <span className='font-medium'>{timeSelect}</span> /{' '}
          <span className='font-medium'>{convertDate(date)}</span>
        </p>
        <p className='text-sm sm:text-base'>
          Ghế: <span className='font-medium'>{convertList(seatSelected)}</span>
        </p>
      </div>
      <div className='total-container'>
        <p className='text-sm sm:text-base'>Tổng thanh toán:</p>
        <p className='text-base'>
          <span className='text-xl font-medium'>
            {formatMoney(handleTotal() * 1.1)}
          </span>{' '}
          đ
        </p>
      </div>
      <button
        className='btn btn-secondary block w-full text-center rounded-lg py-1 sm:py-2'
        onClick={
          props.isFirst()
            ? handleEmptySeat
            : props.isLast()
            ? handlePayment
            : props.next
        }
      >
        {props.isLast() ? 'Thanh toán' : 'Tiếp theo'}
      </button>
      {props.isFirst() ? null : (
        <button
          className='btn btn-secondary block w-full text-center rounded-lg py-1 sm:py-2'
          onClick={props.prev}
        >
          Quay lại
        </button>
      )}
    </div>
  ) : null;
};

export default Checkout;
