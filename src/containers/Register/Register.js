import React, { useState, useEffect } from 'react';
import './Register.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const initialDefaultUser = {
    name: {
      value: '',
      isInputValid: null,
      errorMessage: '',
    },
    phone_number: {
      value: '',
      isInputValid: null,
      errorMessage: '',
    },
    email: {
      value: '',
      isInputValid: null,
      errorMessage: '',
    },
    password: {
      value: '',
      isInputValid: null,
      errorMessage: '',
    },
    confirm_password: {
      value: '',
      isInputValid: null,
      errorMessage: '',
    },
  };

  const [user, setUser] = useState(initialDefaultUser);
  const [allUser, setAllUser] = useState();
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/users')
        .then((res) => {
          const userData = res.data;
          setAllUser(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setNotif(null);
    }, 4000);

    if (!validateForm()) {
      setNotif('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    axios
      .post('http://localhost:5000/users', {
        id: uuidv4(),
        name: user.name.value,
        phone_number: user.phone_number.value,
        email: user.email.value,
        password: user.password.value,
        address: '',
        image_url: 'https://static.thenounproject.com/png/363640-200.png',
        isAdmin: false,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    setUser(initialDefaultUser);
    setNotif('Đăng ký thành công!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...user[name] };
    newState.value = value;
    setUser({ ...user, [name]: newState });
  };

  const validateInput = (type, checkingText) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
    );

    switch (type) {
      case 'name':
        if (checkingText.length < 8) {
          return {
            isInputValid: false,
            errorMessage: 'Tên phải chứa hơn 8 kí tự',
          };
        } else {
          return { isInputValid: true, errorMessage: '' };
        }

      case 'phone_number':
        if (!checkingText.match(/\d{9}/)) {
          return {
            isInputValid: false,
            errorMessage: 'Số điện thoại không hợp lệ',
          };
        } else {
          return { isInputValid: true, errorMessage: '' };
        }

      case 'email':
        for (let user of allUser) {
          if (user.email === checkingText) {
            return {
              isInputValid: false,
              errorMessage: 'Email đã được sử dụng',
            };
          }
        }
        if (!validEmailRegex.test(checkingText)) {
          return {
            isInputValid: false,
            errorMessage: 'Email không hợp lệ',
          };
        } else {
          return { isInputValid: true, errorMessage: '' };
        }

      case 'password':
        if (checkingText.length < 8) {
          return {
            isInputValid: false,
            errorMessage: 'Mật khẩu phải chứa hơn 8 kí tự',
          };
        } else {
          return { isInputValid: true, errorMessage: '' };
        }

      case 'confirm_password':
        if (checkingText === user.password.value && checkingText !== '') {
          return { isInputValid: true, errorMessage: '' };
        } else {
          return {
            isInputValid: false,
            errorMessage: 'Mật khẩu xác thực không chính xác',
          };
        }
      default:
        break;
    }
  };

  const handleInputValidation = (e) => {
    let { name, style } = e.target;
    const { isInputValid, errorMessage } = validateInput(
      name,
      user[name].value
    );
    const newState = { ...user[name] };

    isInputValid
      ? (style.border = '1px solid transparent')
      : (style.border = '1px solid var(--red-color)');

    newState.isInputValid = isInputValid;
    newState.errorMessage = errorMessage;
    setUser({ ...user, [name]: newState });
  };

  const validateForm = () => {
    let formValid = false;
    for (let name in user) {
      if (!user[name].isInputValid) {
        return (formValid = false);
      } else formValid = true;
    }
    return formValid;
  };

  return (
    <div className='register'>
      <h1 className='text-center text-xl font-semibold uppercase tracking-wider sm:text-2xl'>
        Đăng ký
      </h1>
      <form
        className='w-full m-auto py-2 sm:w-2/3 sm:py-6'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>Email:</label>
        <div className='input-group'>
          <input
            type='email'
            name='email'
            value={user.email.value}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleInputValidation(e)}
            className='w-full'
            style={{ border: '1px solid transparent' }}
            autoComplete='off'
            placeholder='Nhập email...'
          />
          {user.email.errorMessage.length > 0 && (
            <span className='error'>{user.email.errorMessage}</span>
          )}
        </div>

        <label>Họ và tên:</label>
        <div className='input-group'>
          <input
            type='text'
            name='name'
            value={user.name.value}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleInputValidation(e)}
            className='w-full'
            style={{ border: '1px solid transparent' }}
            autoComplete='off'
            placeholder='Họ và tên...'
          />
          {user.name.errorMessage.length > 0 && (
            <span className='error'>{user.name.errorMessage}</span>
          )}
        </div>

        <label>Số điện thoại:</label>
        <div className='input-group'>
          <input
            type='text'
            name='phone_number'
            value={user.phone_number.value}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleInputValidation(e)}
            className='w-full'
            style={{ border: '1px solid transparent' }}
            autoComplete='off'
            placeholder='Số điện thoại...'
          />
          {user.phone_number.errorMessage.length > 0 && (
            <span className='error'>{user.phone_number.errorMessage}</span>
          )}
        </div>

        <label>Mật khẩu:</label>
        <div className='input-group'>
          <input
            type='password'
            name='password'
            value={user.password.value}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleInputValidation(e)}
            className='w-full'
            style={{ border: '1px solid transparent' }}
            autoComplete='off'
            placeholder='Mật khẩu...'
          />
          {user.password.errorMessage.length > 0 && (
            <span className='error'>{user.password.errorMessage}</span>
          )}
        </div>

        <label>Nhập lại mật khẩu:</label>
        <div className='input-group'>
          <input
            type='password'
            name='confirm_password'
            value={user.confirm_password.value}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleInputValidation(e)}
            className='w-full'
            style={{ border: '1px solid transparent' }}
            autoComplete='off'
            placeholder='Nhập lại mật khẩu...'
          />
          {user.confirm_password.errorMessage.length > 0 && (
            <span className='error'>{user.confirm_password.errorMessage}</span>
          )}
        </div>

        <button type='submit' className='btn btn-secondary w-full'>
          Đăng ký
        </button>
        {notif && (
          <p className='bg-dark-blue text-white text-center mt-4 py-2'>
            {notif}
          </p>
        )}
      </form>
      <p className='text-center pt-4'>
        Đã có tài khoản?{' '}
        <NavLink to='/login' className='text-dark-blue font-bold'>
          Đăng nhập
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
