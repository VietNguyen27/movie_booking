import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from 'components/Modal/useOnClickOutside';

const AddUser = ({ isShowing, toggle, addUser }) => {
  const initialDefaultValue = {
    name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    image_url: 'https://static.thenounproject.com/png/363640-200.png',
    address: '',
    position: '',
  };
  const modalRef = useRef();
  const [user, setUser] = useState(initialDefaultValue);
  const [error, setError] = useState('');

  useOnClickOutside(modalRef, () => {
    setError('');
    toggle();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkProperties(user))
      return setError('Vui lòng nhập đầy đủ thông tin');
    if (user.password !== user.confirm_password)
      return setError('Mật khẩu xác nhận không đúng');
    addUser(user);
    setUser(initialDefaultValue);
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
    setUser({ ...user, [name]: value });
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
                Thêm người dùng
              </h1>
              <form
                className='form m-auto px-4 pt-6 sm:px-8'
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Tên người dùng:
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={user.name}
                    placeholder='Nhập tên người dùng...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Email:
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={user.email}
                    placeholder='Nhập email...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Mật khẩu:
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={user.password}
                    placeholder='Nhập mật khẩu...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Nhập lại mật khẩu:
                  </label>
                  <input
                    type='password'
                    name='confirm_password'
                    value={user.confirm_password}
                    placeholder='Nhập mật khẩu xác thực...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Chức năng:
                  </label>
                  <select
                    className='w-full px-2 py-2 rounded-md sm:w-2/3'
                    name='position'
                    defaultValue={user.position}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value='' disabled hidden>
                      Chọn chức năng
                    </option>
                    <option value='admin'>Nhà quản trị</option>
                    <option value='user'>Người dùng</option>
                  </select>
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Số điện thoại:
                  </label>
                  <input
                    type='text'
                    name='phone_number'
                    value={user.phone_number}
                    placeholder='Nhập số điện thoại...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Địa chỉ:
                  </label>
                  <textarea
                    type='text'
                    name='address'
                    value={user.address}
                    placeholder='Nhập địa chỉ...'
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

export default AddUser;
