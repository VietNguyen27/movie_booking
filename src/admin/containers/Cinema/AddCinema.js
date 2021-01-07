import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/AddCinema.css';
import useOnClickOutside from 'components/Modal/useOnClickOutside';

const AddCinema = ({ isShowing, toggle, addCinema }) => {
  const initialDefaultValue = {
    cinema_name: '',
    address: '',
    email: '',
    hotline: '',
    image_url: '',
    seats: {},
  };
  const modalRef = useRef();
  const [cinema, setCinema] = useState(initialDefaultValue);
  const [error, setError] = useState('');

  useOnClickOutside(modalRef, () => {
    setError('');
    toggle();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkProperties(cinema))
      return setError('Vui lòng nhập đầy đủ thông tin');
    addCinema(cinema);
    setCinema(initialDefaultValue);
    toggle();
  };

  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] === null || obj[key] === '') return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCinema({ ...cinema, [name]: value, seats: createSeat(8, 12) });
  };

  const createSeat = (rowNum, colNum) => {
    const row = [...'abcdefghijklmnopqrstuvwxyz'].splice(0, rowNum);
    const col = [];
    const seats = {};

    for (let i = 0; i < colNum; i++) {
      col.push(i + 1);
    }

    for (let i = 0; i < row.length; i++) {
      seats[row[i].toUpperCase()] = col;
    }

    return seats;
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal modal-add'>
          <div className='modal-content' ref={modalRef}>
            <div className='modal-inner'>
              <span className='btn btn-close'>
                <i className='fas fa-times' onClick={() => toggle()}></i>
              </span>
              <h1 className='text-2xl text-center tracking-wide uppercase font-medium'>
                Thêm rạp mới
              </h1>
              <form
                className='form m-auto px-4 pt-6 sm:px-8'
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Tên rạp:
                  </label>
                  <input
                    type='text'
                    name='cinema_name'
                    value={cinema.cinema_name}
                    placeholder='Nhập tên rạp...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Email:
                  </label>
                  <input
                    type='text'
                    name='email'
                    value={cinema.email}
                    placeholder='Nhập email...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Hotline:
                  </label>
                  <input
                    type='text'
                    name='hotline'
                    value={cinema.hotline}
                    placeholder='Nhập hotline...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Địa chỉ:
                  </label>
                  <textarea
                    name='address'
                    value={cinema.address}
                    placeholder='Nhập địa chỉ...'
                    onChange={(e) => handleChange(e)}
                    className='w-full px-2 py-1 rounded-md resize-none sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Ảnh URL:
                  </label>
                  <input
                    type='text'
                    name='image_url'
                    value={cinema.image_url}
                    placeholder='Nhập URL...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='flex justify-between'>
                  <p className='text-red text-lg'>{error}</p>
                  <button
                    type='submit'
                    className='btn btn-dark rounded px-3 py-1'
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddCinema;
