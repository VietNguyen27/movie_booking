import React from 'react';
import './styles/Process.css';

const Process = ({ current }) => {
  return (
    <div className='process w-full flex'>
      <div
        className='process-item'
        style={current === 1 ? { opacity: '1' } : { opacity: '0.4' }}
      >
        <span className='text-base md:text-2xl sm:text-xl'>
          <i className='fas fa-th-large'></i>
        </span>
        <span className='text-sm sm:text-lg'>Chọn ghế</span>
      </div>
      <div
        className='process-item'
        style={current === 2 ? { opacity: '1' } : { opacity: '0.4' }}
      >
        <span className='text-base md:text-2xl sm:text-xl'>
          <i className='fas fa-shopping-bag'></i>
        </span>
        <span className='text-sm sm:text-lg'>Dịch vụ</span>
      </div>
      <div
        className='process-item'
        style={current === 3 ? { opacity: '1' } : { opacity: '0.4' }}
      >
        <span className='text-base md:text-2xl sm:text-xl'>
          <i className='fas fa-info-circle'></i>
        </span>
        <span className='text-sm sm:text-lg'>Thông tin</span>
      </div>
      <div
        className='process-item'
        style={current === 4 ? { opacity: '1' } : { opacity: '0.4' }}
      >
        <span className='text-base md:text-2xl sm:text-xl'>
          <i className='far fa-credit-card'></i>
        </span>
        <span className='text-sm sm:text-lg'>Thanh toán</span>
      </div>
    </div>
  );
};

export default Process;
