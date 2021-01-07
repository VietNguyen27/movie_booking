import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { setUserSession } from 'utils/Common';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [type, setType] = useState('password');

  const handleLogin = () => {
    setError(null);
    axios
      .post('http://localhost:4000/users/signin', {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        props.history.push(
          props.location.state ? props.location.state.from.pathname : '/'
        );
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Vui lòng điền email hoặc mật khẩu.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const handleClick = () => setType(type === 'text' ? 'password' : 'text');

  return (
    <div className='login'>
      <h1 className='text-center text-xl font-semibold uppercase tracking-wider sm:text-2xl'>
        Đăng Nhập
      </h1>
      <form
        className='w-full m-auto py-2 sm:w-2/3 sm:py-6'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>Email:</label>
        <div className='input-group'>
          <input
            type='text'
            className='w-full'
            {...email}
            placeholder='Tên tài khoản...'
          />
        </div>
        <p className='flex justify-between'>
          <label>Mật khẩu:</label>
          <a href='/#'>Quên mật khẩu?</a>
        </p>
        <div className='input-group'>
          <input
            type={type}
            className='w-full'
            {...password}
            placeholder='Mật khẩu...'
          />
          <span className='show-password' onClick={() => handleClick()}>
            <i
              className={`fas ${type === 'text' ? 'fa-eye-slash' : 'fa-eye'}`}
            ></i>
          </span>
        </div>
        <label className='inline-block mb-2'>
          <input type='checkbox' className='align-middle mr-1' />{' '}
          <span className='align-middle'>Lưu mật khẩu</span>
        </label>
        <button
          className='btn btn-secondary w-full'
          onClick={() => handleLogin()}
        >
          Đăng nhập
        </button>
        {error && (
          <p className='bg-dark-blue text-white text-center mt-4 py-2'>
            {error}
          </p>
        )}
      </form>
      <p className='text-center pt-4'>
        Chưa có tài khoản?{' '}
        <NavLink to='/register' className='text-dark-blue font-bold'>
          Đăng ký ngay
        </NavLink>
      </p>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
