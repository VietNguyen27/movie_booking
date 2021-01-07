import React from 'react';
import './Form.css';

const Form = () => {
  return (
    <div className='form-container py-8'>
      <div className='clearfix bg-primary py-6 rounded-xl'>
        <h1 className='text-secondary text-xl font-bold uppercase text-center pb-4 sm:text-2xl sm:pb-8'>
          Ciname Đà Nẵng
        </h1>
        <form className='form max-w-screen-md m-auto px-4 sm:px-8'>
          <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Họ và tên:
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập họ và tên...'
            />
          </div>
          <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Email:
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập email...'
            />
          </div>
          <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Số điện thoại:
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập số điện thoại...'
            />
          </div>
          <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Địa chỉ:
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập địa chỉ...'
            />
          </div>
          <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Tiêu đề:
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập tiêu đề...'
            />
          </div>
          <div className='input-group flex flex-wrap justify-between pb-3 sm:pb-4'>
            <label className='w-full font-bold block sm:inline-block sm:w-auto'>
              Nội dung:
            </label>
            <textarea
              type='text'
              className='w-full px-3 py-2 rounded-md sm:w-2/3'
              placeholder='Nhập nội dung...'
            />
          </div>
          <button className='btn btn-primary font-semibold float-right px-3 py-2 rounded-md text-sm sm:text-base'>
            Liên hệ với chúng tôi
          </button>
          <div className='clear-both'></div>
        </form>
      </div>
    </div>
  );
};

export default Form;
