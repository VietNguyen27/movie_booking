import React, { Fragment, useState } from 'react';
import './styles/Payment.css';
import Process from './Process';
import Checkout from './Checkout';
import { convertList, convertDate } from 'utils/Convert';
import { getUser } from 'utils/Common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Payment = (props) => {
  const { ticketInfo, seatSelected, serviceSelected } = props;
  const { id, name, email, phone_number } = getUser();
  const { cinema_name, date, movie, price, timeSelect } = ticketInfo;
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    const service = serviceSelected.map((serviceItem) => {
      return {
        id: serviceItem.id,
        price: serviceItem.price,
        quantity: serviceItem.quantity,
      };
    });

    axios.post('http://localhost:5000/tickets', {
      id: uuidv4(),
      seats: seatSelected,
      userId: id,
      cinemaId: ticketInfo.cinemaId,
      date: ticketInfo.date,
      movieId: ticketInfo.movieId,
      price: ticketInfo.price,
      timeSelect: ticketInfo.timeSelect,
      orders: service,
    });
    return setIsPaid(true);
  };

  return isPaid ? (
    <div className='payment text-center'>
      <span className='text-9xl text-green'>
        <i className='far fa-check-circle'></i>
      </span>
      <h2 className='text-xl font-medium py-2'>Thanh toán thành công!</h2>
      <p className='text-base'>
        Quý khách vui lòng kiểm tra lại thông tin vé. Nếu có sai sót vui lòng
        liên hệ với Hotline: 012345678.
      </p>
      <h2 className='text-xl uppercase font-medium py-4'>Thông tin vé</h2>
      <table className='ticket-info'>
        <tbody>
          <tr>
            <td className='text-right font-medium' style={{ width: '40%' }}>
              Rạp:
            </td>
            <td className='text-left px-4' style={{ width: '60%' }}>
              {cinema_name}
            </td>
          </tr>
          <tr>
            <td className='text-right font-medium' style={{ width: '40%' }}>
              Phim:
            </td>
            <td className='text-left px-4' style={{ width: '60%' }}>
              {movie.title}
            </td>
          </tr>
          <tr>
            <td className='text-right font-medium' style={{ width: '40%' }}>
              Thời gian:
            </td>
            <td className='text-left px-4' style={{ width: '60%' }}>
              {timeSelect} ngày {convertDate(date)}
            </td>
          </tr>
          <tr>
            <td className='text-right font-medium' style={{ width: '40%' }}>
              Ghế:
            </td>
            <td className='text-left px-4' style={{ width: '60%' }}>
              {convertList(seatSelected)}
            </td>
          </tr>
          <tr>
            <td className='text-right font-medium' style={{ width: '30%' }}>
              Dịch vụ kèm theo:
            </td>
            <td className='text-left px-4'>
              {serviceSelected.length === 0
                ? 'Không'
                : convertList(
                    serviceSelected.map((service) => service.service)
                  )}
            </td>
          </tr>
        </tbody>
      </table>
      <a
        href='/'
        className='btn btn-secondary inline-block rounded-md mt-4 px-4 py-1'
      >
        Quay về trang chủ
      </a>
    </div>
  ) : (
    <Fragment>
      <Process current={props.order} />
      <div className='flex flex-wrap gap-5 py-4 md:flex-nowrap'>
        <div className='payment w-full md:w-2/3'>
          <div className='section'>
            <h2 className='bg-light-blue text-sm sm:text-base'>
              Thông tin cá nhân
            </h2>
            <div className='payment-content text-sm sm:text-base'>
              <p>Họ và tên: {name}</p>
              <p>Email: {email}</p>
              <p>Số điện thoại: {phone_number}</p>
            </div>
            <h2 className='bg-light-blue text-sm sm:text-base'>
              Chọn hình thức thanh toán
            </h2>
            <form className='payment-content text-sm sm:text-base'>
              <label>
                <input type='radio' name='payment' />
                <span className='ml-1'>Thanh toán qua Paypal</span>
              </label>
              <br />
              <label className='mr-2'>
                <input type='radio' name='payment' />
                <span className='ml-1'>Thanh toán tại quầy</span>
              </label>
            </form>
          </div>
        </div>
        <Checkout
          props={props}
          seatSelected={seatSelected}
          serviceSelected={serviceSelected}
          handlePayment={handlePayment}
        />
      </div>
    </Fragment>
  );
};

export default Payment;
